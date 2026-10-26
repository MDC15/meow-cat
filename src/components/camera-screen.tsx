import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Aperture, Cat, ImagePlus, SwitchCamera } from "lucide-react";
import { buildCatCard, sampleCatPhoto, type CardFacts } from "@/lib/cat-api.functions";
import { useAlbum, type SavedCard } from "@/lib/album-store";
import { analyzeCanvas, canvasFromDataUrl, drawContain, loadModel, suggestName, type VisionResult } from "@/lib/vision";
import { CatCard } from "@/components/cat-card";
import { ScratchCardReveal } from "@/components/scratch-card-reveal";

type Phase = "idle" | "loading" | "reject" | "reveal";

const STEPS = ["Đang soi bộ lông…", "Hỏi catfact.ninja…", "Tra Wikipedia tiếng Việt…", "Ghim OpenStreetMap…"];

function locate() {
  return new Promise<{ lat: number; lng: number } | null>((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => resolve({ lat: position.coords.latitude, lng: position.coords.longitude }),
      () => resolve(null),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 120000 },
    );
  });
}

export function CameraScreen({ onOpenAlbum }: { onOpenAlbum: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [facing, setFacing] = useState<"environment" | "user">("environment");
  const [camOn, setCamOn] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [vision, setVision] = useState<VisionResult | null>(null);
  const [draft, setDraft] = useState<SavedCard | null>(null);
  const [name, setName] = useState("");
  const addCard = useAlbum((state) => state.add);
  const quota = useAlbum((state) => state.quota);
  const build = useServerFn(buildCatCard);
  const sample = useServerFn(sampleCatPhoto);

  useEffect(() => {
    // Warm the vision model only after the app has settled: tfjs + mobilenet
    // are ~300 KB gzipped plus model weights, and pulling them on mount
    // competes with the app's own JS and fonts for bandwidth. A 3s delay
    // still beats the user framing a shot; captures stay safe regardless —
    // `analyzeCanvas` awaits `loadModel()` itself, so a cold model only
    // adds its own latency to the first shot, never a failure.
    const warm = () => {
      const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 500));
      idle(() => void loadModel().catch(() => undefined));
    };
    const timer = window.setTimeout(warm, 3000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let dead = false;
    setCamOn(false);
    void (async () => {
      if (!navigator.mediaDevices?.getUserMedia) return;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 1600 } },
        });
        if (dead) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        const video = videoRef.current;
        if (!video) return;
        video.srcObject = stream;
        await video.play();
        setCamOn(true);
      } catch {
        if (!dead) setCamOn(false);
      }
    })();
    return () => {
      dead = true;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [facing]);

  useEffect(() => {
    if (phase !== "loading") return;
    setStep(0);
    const timer = window.setInterval(() => setStep((value) => (value + 1) % STEPS.length), 1600);
    return () => window.clearInterval(timer);
  }, [phase]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  async function mint(canvas: HTMLCanvasElement, seen: VisionResult, where: { lat: number; lng: number } | null) {    const facts: CardFacts = await build({
      data: {
        felineLabel: seen.felineLabel,
        score: seen.score,
        isBigCat: seen.isBigCat,
        dominant: seen.coat.dominant,
        pointed: seen.coat.pointed,
        contrast: seen.coat.contrast,
        colorful: seen.coat.colorful,
        shares: seen.coat.shares,
        lat: where?.lat ?? null,
        lng: where?.lng ?? null,
      },
    });
    const photo = canvas.toDataURL("image/jpeg", 0.66);
    const checkLine = !seen.model
      ? "Ước lượng theo màu lông — model nhận dạng không tải được"
      : `MobileNet: ${seen.labelVi} · ${Math.round(seen.score * 100)}%`;
    const card: SavedCard = {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      photo,
      name: suggestName(photo.slice(-24)),
      ...facts,
      checkLine,
      lat: where?.lat ?? null,
      lng: where?.lng ?? null,
    };
    setName(card.name);
    setDraft(card);
    setPhase("reveal");
  }

  async function run(canvas: HTMLCanvasElement) {
    setError(null);
    setPhase("loading");
    canvasRef.current = canvas;
    try {
      const [seen, where] = await Promise.all([analyzeCanvas(canvas), locate()]);
      setVision(seen);
      if (!seen.isCat) {
        setPhase("reject");
        return;
      }
      await mint(canvas, seen, where);
    } catch (err) {
      setPhase("idle");
      setError(err instanceof Error ? err.message : "Không tạo được thẻ");
    }
  }

  function shoot() {
    const video = videoRef.current;
    if (!video || !video.videoWidth) {
      setError("Camera chưa sẵn sàng. Hãy chọn ảnh hoặc mèo mẫu.");
      return;
    }
    try {
      void run(drawContain(video, video.videoWidth, video.videoHeight, facing === "user"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không chụp được");
    }
  }

  async function onFile(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Chọn file ảnh JPEG hoặc PNG.");
      return;
    }
    try {
      const dataUrl = await fileToDataUrl(file);
      const canvas = await canvasFromDataUrl(dataUrl);
      await run(canvas);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không đọc được ảnh");
    }
  }

  async function onSample() {
    setError(null);
    setPhase("loading");
    try {
      const { dataUrl } = await sample({ data: { nonce: Date.now() } });
      const canvas = await canvasFromDataUrl(dataUrl);
      canvasRef.current = canvas;
      const [seen, where] = await Promise.all([analyzeCanvas(canvas), locate()]);
      setVision(seen);
      if (!seen.isCat) {
        setPhase("reject");
        return;
      }
      await mint(canvas, seen, where);
    } catch (err) {
      setPhase("idle");
      setError(err instanceof Error ? err.message : "Không lấy được mèo mẫu");
    }
  }

  function save() {
    if (!draft) return;
    const cleaned = name.trim().slice(0, 24) || draft.name;
    addCard({ ...draft, name: cleaned });
    setDraft(null);
    setPhase("idle");
    setToast("Đã cất vào album");
  }

  return (
    <section className="relative flex h-full flex-col bg-ink text-surface">
      <header className="flex items-start justify-between px-4 pt-4 pb-3">
        <div>
          <p className="font-serif text-2xl leading-none">Locket Mèo</p>
          <p className="mt-1 text-xs text-surface/70">Một lần chụp, một thẻ bài</p>
        </div>
        <p className="max-w-36 text-right text-xs text-surface/60">Ảnh nhận dạng ngay trên máy</p>
      </header>

      <div className="relative mx-4 min-h-0 flex-1 overflow-hidden rounded-3xl bg-ink shadow-inner ring-2 ring-gold/70">
        <video
          ref={videoRef}
          playsInline
          muted
          autoPlay
          className={`h-full w-full object-cover ${facing === "user" ? "mirror" : ""} ${camOn ? "" : "opacity-0"}`}
        />
        {!camOn && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8 text-center">
            <Cat className="size-12 text-gold" aria-hidden="true" />
            <p className="text-sm text-pretty text-surface/80">
              Bật camera, tải một ảnh mèo, hoặc dùng mèo mẫu từ The Cat API.
            </p>
          </div>
        )}
        <span className="pointer-events-none absolute top-4 left-4 size-7 border-t-2 border-l-2 border-gold" />
        <span className="pointer-events-none absolute top-4 right-4 size-7 border-t-2 border-r-2 border-gold" />
        <span className="pointer-events-none absolute bottom-4 left-4 size-7 border-b-2 border-l-2 border-gold" />
        <span className="pointer-events-none absolute right-4 bottom-4 size-7 border-r-2 border-b-2 border-gold" />
      </div>

      {error && <p className="px-5 pt-3 text-center text-sm text-gold">{error}</p>}
      {quota && <p className="px-5 pt-2 text-center text-sm text-gold">Bộ nhớ trình duyệt đầy. Xoá bớt thẻ trong album.</p>}

      <div className="flex items-end justify-between px-6 pt-4 pb-4">
        <button type="button" onClick={() => void onSample()} className="flex w-16 flex-col items-center gap-1 text-xs text-surface/80">
          <span className="flex size-14 items-center justify-center rounded-full bg-surface/10 text-surface">
            <Cat className="size-5" aria-hidden="true" />
          </span>
          Mẫu
        </button>
        <button
          type="button"
          onClick={shoot}
          disabled={phase === "loading"}
          aria-label="Chụp mèo"
          className="flex size-20 items-center justify-center rounded-full bg-ginger text-ginger-ink ring-4 ring-surface/90 disabled:opacity-50"
        >
          <Aperture className="size-8" aria-hidden="true" />
        </button>
        <div className="flex w-16 flex-col items-center gap-2">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            aria-label="Chọn ảnh từ máy"
            className="flex size-12 items-center justify-center rounded-full bg-surface/10"
          >
            <ImagePlus className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setFacing((value) => (value === "user" ? "environment" : "user"))}
            aria-label="Đổi camera"
            className="flex size-12 items-center justify-center rounded-full bg-surface/10"
          >
            <SwitchCamera className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          void onFile(event.target.files?.[0]);
          event.target.value = "";
        }}
      />

      {toast && (
        <button
          type="button"
          onClick={onOpenAlbum}
          className="absolute inset-x-4 bottom-24 rounded-full bg-surface px-4 py-3 text-sm text-ink shadow-lg"
        >
          {toast}. Mở album
        </button>
      )}

      {phase === "loading" && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-ink/90 px-8 text-center">
          <Cat className="size-10 animate-pulse text-gold" aria-hidden="true" />
          <p className="font-serif text-2xl text-balance">{STEPS[step]}</p>
          <p className="text-sm text-surface/70">Ảnh không được gửi đi để nhận dạng.</p>
        </div>
      )}

      {phase === "reject" && vision && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-5 bg-bg px-8 text-center text-ink">
          {canvasRef.current && (
            <img
              src={canvasRef.current.toDataURL("image/jpeg", 0.66)}
              alt="Ảnh vừa chụp"
              className="h-40 w-40 rounded-3xl object-cover shadow-md ring-2 ring-line"
            />
          )}
          <div>
            <p className="font-serif text-3xl text-balance">Không thấy mèo</p>
            <p className="mt-2 text-sm text-pretty text-muted">
              Bộ nhận dạng nghi đây là “{vision.topLabel}”. Hãy chụp lại gần mặt mèo hơn nhé.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setPhase("idle")}
            className="h-12 w-full max-w-xs rounded-full bg-ginger text-ginger-ink"
          >
            Chụp lại
          </button>
        </div>
      )}

      {phase === "reveal" && draft && (
        <div className="absolute inset-0 z-20 flex flex-col bg-bg text-ink">
          <div className="flex items-center justify-between px-4 pt-4">
            <p className="font-serif text-xl">Thẻ mới</p>
            <button type="button" onClick={() => setPhase("idle")} className="h-11 px-2 text-sm text-muted">
              Bỏ
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-3">
            <ScratchCardReveal key={draft.id}>
              <CatCard card={{ ...draft, name: name.trim() || draft.name }} />
            </ScratchCardReveal>
          </div>
          <div className="space-y-3 px-4 pb-4">
            <label className="block text-xs text-muted">
              Tên trên thẻ
              <input
                value={name}
                maxLength={24}
                onChange={(event) => setName(event.target.value)}
                className="mt-1 h-12 w-full rounded-2xl border border-line bg-surface px-3 text-base text-ink"
              />
            </label>
            <p className="text-xs text-muted">
              {draft.checkLine}. Nguồn: {draft.sourceNote}.
            </p>
            <button type="button" onClick={save} className="h-12 w-full rounded-full bg-ginger text-ginger-ink">
              Cất vào album
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Không đọc được file"));
    reader.readAsDataURL(file);
  });
}
