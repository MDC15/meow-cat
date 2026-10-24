import { MapPin } from "lucide-react";
import { RARITY_VI } from "@/lib/breed-match";
import type { SavedCard } from "@/lib/album-store";

const STATS = [
  ["affection", "Tình cảm"],
  ["energy", "Năng lượng"],
  ["voice", "Hay kêu"],
  ["scarcity", "Độ hiếm"],
] as const;

function formatWhen(stamp: number) {
  return new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "short" }).format(stamp);
}

export function CatCard({
  card,
  variant = "full",
}: {
  card: SavedCard;
  variant?: "full" | "mini";
}) {
  if (variant === "mini") {
    return (
      <article className="card-ratio relative w-full overflow-hidden rounded-2xl bg-ink text-left shadow-md">
        <img src={card.photo} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-3">
          <p className="font-serif text-lg leading-tight text-balance text-surface">{card.name}</p>
          <p className="text-xs text-gold">{card.breedVi}</p>
        </div>
      </article>
    );
  }

  const foil = card.rarity === "legendary" || card.rarity === "rare";

  return (
    <article className={`card-rise overflow-hidden rounded-3xl bg-ink text-surface shadow-xl ${foil ? "foil" : ""}`}>
      <div className="relative h-52">
        <img src={card.photo} alt={`Ảnh ${card.name}`} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/25" />
        <span className="absolute top-3 left-3 rounded-full bg-ink/75 px-2.5 py-1 text-xs text-gold">
          {RARITY_VI[card.rarity]}
        </span>
      </div>
      <div className="px-4 pt-3 pb-4">
        <h3 className="font-serif text-3xl leading-none text-balance">{card.name}</h3>
        <p className="mt-1 text-sm text-gold">{card.breedVi}</p>
        <p className="mt-2 line-clamp-4 text-sm leading-snug text-pretty text-surface/80">{card.blurb}</p>
        <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-sm text-surface/80">
          <div>
            <dt className="text-xs text-surface/50">Xuất xứ</dt>
            <dd>{card.country}</dd>
          </div>
          <div>
            <dt className="text-xs text-surface/50">Lông</dt>
            <dd>{card.coat}</dd>
          </div>
        </dl>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {STATS.map(([key, label]) => (
            <div key={key}>
              <div className="mb-1 h-1 overflow-hidden rounded-full bg-surface/20">
                <div className="h-full rounded-full bg-gold" style={{ width: `${card.stats[key] * 20}%` }} />
              </div>
              <p className="text-xs leading-tight text-surface/70">{label}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 flex items-center gap-1 text-xs text-surface/70">
          <MapPin className="size-3 shrink-0 text-gold" aria-hidden="true" />
          <span className="truncate">{card.place ?? "Chưa ghim bản đồ"}</span>
          <span className="ml-auto shrink-0 tabular-nums">{formatWhen(card.createdAt)}</span>
        </p>
      </div>
    </article>
  );
}
