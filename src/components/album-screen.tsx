import { useState } from "react";
import { ArrowLeft, Cat, MapPin, Trash2 } from "lucide-react";
import { RARITY_VI } from "@/lib/breed-match";
import { useAlbum } from "@/lib/album-store";
import { CatCard } from "@/components/cat-card";

export function AlbumScreen({
  focusId,
  onFocus,
  onPin,
  onShoot,
}: {
  focusId: string | null;
  onFocus: (id: string | null) => void;
  onPin: (id: string) => void;
  onShoot: () => void;
}) {
  const cards = useAlbum((state) => state.cards);
  const remove = useAlbum((state) => state.remove);
  const rename = useAlbum((state) => state.rename);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const focus = cards.find((card) => card.id === focusId) ?? null;

  if (focus) {
    return (
      <section className="flex h-full flex-col bg-bg">
        <header className="flex items-center justify-between px-4 pt-4">
          <button
            type="button"
            onClick={() => onFocus(null)}
            aria-label="Về album"
            className="flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface"
          >
            <ArrowLeft className="size-5" aria-hidden="true" />
          </button>
          <p className="font-serif text-xl">{focus.name}</p>
          <span className="size-11" />
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-3">
          <div className="mx-auto w-full max-w-xs">
            <CatCard card={focus} />
          </div>
          <label className="mt-4 block text-xs text-muted">
            Đổi tên
            <input
              value={focus.name}
              maxLength={24}
              onChange={(event) => rename(focus.id, event.target.value.slice(0, 24))}
              className="mt-1 h-12 w-full rounded-2xl border border-line bg-surface px-3 text-base"
            />
          </label>
          <p className="mt-3 text-sm text-pretty text-muted">{focus.blurb}</p>
          <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <Fact label="Giống" value={focus.breedEn} />
            <Fact label="Xuất xứ" value={focus.country} />
            <Fact label="Nguồn gốc" value={focus.origin} />
            <Fact label="Hoa văn" value={focus.pattern} />
            <Fact label="Độ hiếm" value={RARITY_VI[focus.rarity]} />
            <Fact label="Nhận dạng" value={focus.checkLine} />
          </dl>
          {focus.wikiUrl && (
            <a href={focus.wikiUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm text-ginger">
              Đọc {focus.wikiTitle ?? "Wikipedia"}
            </a>
          )}
          <p className="mt-2 text-xs text-muted">Nguồn: {focus.sourceNote}</p>
        </div>
        <div className="flex gap-2 px-4 py-3">
          <button
            type="button"
            onClick={() => onPin(focus.id)}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-ink text-surface"
          >
            <MapPin className="size-4" aria-hidden="true" />
            {focus.place ? "Đổi vị trí" : "Ghim bản đồ"}
          </button>
          <button
            type="button"
            onClick={() => {
              if (confirmId === focus.id) {
                remove(focus.id);
                onFocus(null);
                setConfirmId(null);
              } else {
                setConfirmId(focus.id);
              }
            }}
            className="flex h-12 items-center gap-2 rounded-full border border-line bg-surface px-4"
          >
            <Trash2 className="size-4" aria-hidden="true" />
            {confirmId === focus.id ? "Xoá hẳn" : "Xoá"}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="flex h-full flex-col">
      <header className="px-4 pt-4 pb-2">
        <p className="font-serif text-3xl leading-none">Album</p>
        <p className="mt-1 text-sm text-muted">{cards.length === 0 ? "Chưa có thẻ nào" : `${cards.length} thẻ trong máy này`}</p>
      </header>
      {cards.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
          <Cat className="size-10 text-ginger" aria-hidden="true" />
          <p className="text-sm text-pretty text-muted">
            Chụp một con mèo. Ảnh được nhận dạng trên máy, thông tin giống lấy từ catfact.ninja và Wikipedia.
          </p>
          <button type="button" onClick={onShoot} className="h-12 rounded-full bg-ginger px-5 text-ginger-ink">
            Mở máy ảnh
          </button>
        </div>
      ) : (
        <div className="grid min-h-0 flex-1 grid-cols-2 content-start gap-3 overflow-y-auto px-4 pt-2 pb-4">
          {cards.map((card) => (
            <button key={card.id} type="button" onClick={() => onFocus(card.id)} className="text-left" aria-label={card.name}>
              <CatCard card={card} variant="mini" />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-surface px-3 py-2">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="text-pretty">{value}</dd>
    </div>
  );
}
