import { useEffect, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Camera, Cat, Map } from "lucide-react";
import { useAlbum } from "@/lib/album-store";
import { AlbumScreen } from "@/components/album-screen";
import { CameraScreen } from "@/components/camera-screen";
import { MapScreen } from "@/components/map-screen";

export const Route = createFileRoute("/")({ component: Home });

type Tab = "camera" | "album" | "map";

function Home() {
  const [tab, setTab] = useState<Tab>("camera");
  const [focusId, setFocusId] = useState<string | null>(null);
  const [pinning, setPinning] = useState(false);
  const count = useAlbum((state) => state.cards.length);

  useEffect(() => {
    void useAlbum.persist.rehydrate();
  }, []);

  return (
    <main className="app-frame mx-auto flex max-w-lg flex-col overflow-hidden bg-bg text-ink">
      <div className="min-h-0 flex-1">
        {tab === "camera" && <CameraScreen onOpenAlbum={() => setTab("album")} />}
        {tab === "album" && (
          <AlbumScreen
            focusId={focusId}
            onFocus={setFocusId}
            onShoot={() => setTab("camera")}
            onPin={(id) => {
              setFocusId(id);
              setPinning(true);
              setTab("map");
            }}
          />
        )}
        {tab === "map" && (
          <MapScreen
            focusId={focusId}
            pinning={pinning}
            onFocus={setFocusId}
            onPinned={() => setPinning(false)}
          />
        )}
      </div>
      <nav className="nav-safe grid grid-cols-3 border-t border-line bg-surface" aria-label="Chính">
        <TabButton active={tab === "camera"} label="Chụp" onClick={() => setTab("camera")}>
          <Camera className="size-5" aria-hidden="true" />
        </TabButton>
        <TabButton active={tab === "album"} label={count > 0 ? `Album ${count}` : "Album"} onClick={() => setTab("album")}>
          <Cat className="size-5" aria-hidden="true" />
        </TabButton>
        <TabButton active={tab === "map"} label="Bản đồ" onClick={() => setTab("map")}>
          <Map className="size-5" aria-hidden="true" />
        </TabButton>
      </nav>
    </main>
  );
}

function TabButton({
  active,
  label,
  onClick,
  children,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`flex h-16 flex-col items-center justify-center gap-0.5 text-xs ${active ? "text-ginger" : "text-muted"}`}
    >
      {children}
      {label}
    </button>
  );
}
