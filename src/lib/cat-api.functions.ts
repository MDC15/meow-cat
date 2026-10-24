import { createServerFn } from "@tanstack/react-start";
import {
  FALLBACK_BREEDS,
  bigCatProfile,
  breedViName,
  coatVi,
  countryVi,
  localBlurb,
  matchBreed,
  originVi,
  patternVi,
  rarityOf,
  statsFor,
  type Breed,
  type CardStats,
  type CoatColor,
  type Rarity,
  type ScanPayload,
} from "@/lib/breed-match";

const UA = "LocketMeo/1.0 (personal cat card app)";

export type CardFacts = {
  breedEn: string;
  breedVi: string;
  country: string;
  origin: string;
  coat: string;
  pattern: string;
  blurb: string;
  wikiTitle: string | null;
  wikiUrl: string | null;
  rarity: Rarity;
  stats: CardStats;
  sourceNote: string;
  place: string | null;
  bigCat: boolean;
};

const COLORS: CoatColor[] = ["black", "white", "orange", "cream", "grey", "brown"];

function num(value: unknown, min: number, max: number, fallback: number) {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, value));
}

function parseScan(input: unknown): ScanPayload {
  if (!input || typeof input !== "object") throw new Error("Thiếu dữ liệu ảnh");
  const raw = input as Record<string, unknown>;
  const sharesRaw = (raw.shares ?? {}) as Record<string, unknown>;
  const shares = Object.fromEntries(COLORS.map((color) => [color, num(sharesRaw[color], 0, 1, 0)])) as Record<
    CoatColor,
    number
  >;
  const dominant = COLORS.includes(raw.dominant as CoatColor) ? (raw.dominant as CoatColor) : "brown";
  const lat = raw.lat == null ? null : num(raw.lat, -90, 90, Number.NaN);
  const lng = raw.lng == null ? null : num(raw.lng, -180, 180, Number.NaN);
  if (Number.isNaN(lat) || Number.isNaN(lng)) throw new Error("Toạ độ không hợp lệ");
  const label = typeof raw.felineLabel === "string" ? raw.felineLabel.slice(0, 80) : "";
  return {
    felineLabel: label,
    score: num(raw.score, 0, 1, 0),
    isBigCat: raw.isBigCat === true,
    dominant,
    pointed: num(raw.pointed, 0, 1, 0),
    contrast: num(raw.contrast, 0, 1, 0),
    colorful: num(raw.colorful, 0, 6, 1),
    shares,
    lat,
    lng,
  };
}

let breedCache: { at: number; breeds: Breed[]; live: boolean } | null = null;

async function loadBreeds() {
  if (breedCache && Date.now() - breedCache.at < 1000 * 60 * 60 * 6) return breedCache;
  try {
    const res = await fetch("https://catfact.ninja/breeds?limit=98", {
      headers: { Accept: "application/json", "User-Agent": UA },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`catfact ${res.status}`);
    const json = (await res.json()) as { data?: Partial<Breed>[] };
    const breeds = (json.data ?? [])
      .filter((row) => typeof row.breed === "string" && row.breed.length > 0)
      .map((row) => ({
        breed: String(row.breed),
        country: String(row.country ?? ""),
        origin: String(row.origin ?? ""),
        coat: String(row.coat ?? ""),
        pattern: String(row.pattern ?? ""),
      }));
    if (breeds.length < 10) throw new Error("catfact list too short");
    breedCache = { at: Date.now(), breeds, live: true };
  } catch {
    breedCache = { at: Date.now(), breeds: FALLBACK_BREEDS, live: false };
  }
  return breedCache;
}

function trimExtract(text: string) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= 420) return clean;
  const cut = clean.slice(0, 420);
  const dot = cut.lastIndexOf(".");
  return dot > 160 ? cut.slice(0, dot + 1) : `${cut.trim()}…`;
}

async function wikiIntro(queries: string[]) {
  for (const query of queries) {
    if (!query.trim()) continue;
    try {
      const searchRes = await fetch(
        `https://vi.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&srlimit=4&utf8=1`,
        { headers: { Accept: "application/json", "User-Agent": UA }, signal: AbortSignal.timeout(7000) },
      );
      if (!searchRes.ok) continue;
      const search = (await searchRes.json()) as {
        query?: { search?: { title: string; snippet: string }[] };
      };
      const hits = search.query?.search ?? [];
      const token = query.toLowerCase().slice(0, 18);
      const hit =
        hits.find((item) => item.title.toLowerCase().includes(token.slice(0, 8))) ??
        hits.find((item) => /mèo|cat|sư tử|hổ|báo|linh miêu/i.test(`${item.title} ${item.snippet}`)) ??
        hits[0];
      if (!hit) continue;
      const titlePath = encodeURIComponent(hit.title.replace(/ /g, "_"));
      const sumRes = await fetch(`https://vi.wikipedia.org/api/rest_v1/page/summary/${titlePath}`, {
        headers: { Accept: "application/json", "User-Agent": UA },
        signal: AbortSignal.timeout(7000),
      });
      if (!sumRes.ok) continue;
      const sum = (await sumRes.json()) as {
        extract?: string;
        title?: string;
        type?: string;
        content_urls?: { desktop?: { page?: string } };
      };
      if (!sum.extract || sum.type === "disambiguation") continue;
      return {
        title: sum.title || hit.title,
        extract: trimExtract(sum.extract),
        url: sum.content_urls?.desktop?.page || `https://vi.wikipedia.org/wiki/${titlePath}`,
      };
    } catch {
      continue;
    }
  }
  return null;
}

function shortPlace(body: {
  display_name?: string;
  address?: Record<string, string | undefined>;
}) {
  const address = body.address ?? {};
  const near = address.suburb || address.quarter || address.neighbourhood || address.village || address.hamlet;
  const city = address.city || address.town || address.state || address.country;
  const parts = [near, city].filter(Boolean);
  if (parts.length > 0) return parts.join(", ");
  return (body.display_name ?? "").split(",").slice(0, 2).join(",").trim();
}

async function reversePlace(lat: number, lng: number) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=vi&zoom=14`;
  const res = await fetch(url, {
    headers: { Accept: "application/json", "User-Agent": UA, "Accept-Language": "vi" },
    signal: AbortSignal.timeout(7000),
  });
  if (!res.ok) throw new Error(`Bản đồ không phản hồi (${res.status})`);
  const body = (await res.json()) as {
    display_name?: string;
    address?: Record<string, string | undefined>;
    error?: string;
  };
  if (body.error) throw new Error("Không tìm thấy địa danh");
  return shortPlace(body) || null;
}

function parseLatLng(input: unknown) {
  if (!input || typeof input !== "object") throw new Error("Thiếu toạ độ");
  const raw = input as { lat?: unknown; lng?: unknown };
  const lat = num(raw.lat, -90, 90, Number.NaN);
  const lng = num(raw.lng, -180, 180, Number.NaN);
  if (Number.isNaN(lat) || Number.isNaN(lng)) throw new Error("Toạ độ không hợp lệ");
  return { lat, lng };
}

export const lookupPlace = createServerFn({ method: "POST" })
  .validator(parseLatLng)
  .handler(async ({ data }) => {
    try {
      const place = await reversePlace(data.lat, data.lng);
      return { place };
    } catch {
      return { place: null as string | null };
    }
  });

export const sampleCatPhoto = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const nonce = (input as { nonce?: unknown } | null)?.nonce;
    return { nonce: typeof nonce === "number" ? nonce : Date.now() };
  })
  .handler(async () => {
    const sources = [
      "https://api.thecatapi.com/v1/images/search?size=med",
      "https://cataas.com/cat?width=640",
    ];
    let lastError = "Không lấy được ảnh mẫu";
    for (const source of sources) {
      try {
        let imageUrl = source;
        if (source.includes("thecatapi")) {
          const listRes = await fetch(source, {
            headers: { Accept: "application/json", "User-Agent": UA },
            signal: AbortSignal.timeout(8000),
          });
          if (!listRes.ok) throw new Error(`thecatapi ${listRes.status}`);
          const list = (await listRes.json()) as { url?: string }[];
          if (!list[0]?.url) throw new Error("thecatapi empty");
          imageUrl = list[0].url;
        }
        const imgRes = await fetch(imageUrl, { signal: AbortSignal.timeout(12000) });
        if (!imgRes.ok) throw new Error(`image ${imgRes.status}`);
        const mime = imgRes.headers.get("content-type")?.split(";")[0] || "image/jpeg";
        if (!mime.startsWith("image/")) throw new Error("not an image");
        const bytes = new Uint8Array(await imgRes.arrayBuffer());
        if (bytes.byteLength < 1000 || bytes.byteLength > 3_000_000) throw new Error("bad image size");
        let binary = "";
        const step = 0x8000;
        for (let index = 0; index < bytes.length; index += step) {
          binary += String.fromCharCode(...bytes.subarray(index, index + step));
        }
        return { dataUrl: `data:${mime};base64,${btoa(binary)}` };
      } catch (error) {
        lastError = error instanceof Error ? error.message : lastError;
      }
    }
    throw new Error(lastError);
  });

export const buildCatCard = createServerFn({ method: "POST" })
  .validator(parseScan)
  .handler(async ({ data }): Promise<CardFacts> => {
    const catalog = await loadBreeds();
    let place: string | null = null;
    if (data.lat != null && data.lng != null) {
      try {
        place = await reversePlace(data.lat, data.lng);
      } catch {
        place = null;
      }
    }

    if (data.isBigCat) {
      const profile = bigCatProfile(data.felineLabel);
      const wiki = await wikiIntro([profile.query, profile.en]);
      const rarity = rarityOf(null, true);
      return {
        breedEn: profile.en,
        breedVi: profile.vi,
        country: "Hoang dã",
        origin: "Loài hoang",
        coat: "Tự nhiên",
        pattern: "Hoang dã",
        blurb:
          wiki?.extract ??
          `${profile.vi} là loài mèo lớn. Thẻ này ghi nhận từ ảnh, không phải giống mèo nhà.`,
        wikiTitle: wiki?.title ?? null,
        wikiUrl: wiki?.url ?? null,
        rarity,
        stats: { affection: 2, energy: 5, voice: 3, scarcity: 5 },
        sourceNote: `Wikipedia${place ? " · OpenStreetMap" : ""}`,
        place,
        bigCat: true,
      };
    }

    const breed = matchBreed(catalog.breeds, data);
    const safe = breed ?? FALLBACK_BREEDS[6]!;
    const rarity = rarityOf(safe, false);
    const name = breedViName(safe.breed);
    const wiki = await wikiIntro([name, `${safe.breed} cat`, `mèo ${safe.breed}`]);
    const bits = [
      catalog.live ? "catfact.ninja" : "danh sách giống dự phòng",
      wiki ? "Wikipedia" : null,
      place ? "OpenStreetMap" : null,
    ].filter(Boolean);
    return {
      breedEn: safe.breed,
      breedVi: name,
      country: countryVi(safe.country),
      origin: originVi(safe.origin),
      coat: coatVi(safe.coat),
      pattern: patternVi(safe.pattern),
      blurb: wiki?.extract ?? localBlurb(safe),
      wikiTitle: wiki?.title ?? null,
      wikiUrl: wiki?.url ?? null,
      rarity,
      stats: statsFor(safe, rarity),
      sourceNote: bits.join(" · "),
      place,
      bigCat: false,
    };
  });
