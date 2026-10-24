import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";
import type { LeafletApi, Map as LeafletMap, Marker } from "leaflet";
import { lookupPlace } from "@/lib/cat-api.functions";
import { useAlbum } from "@/lib/album-store";

function resolveLeaflet(mod: unknown): LeafletApi {
  const record = mod as { default?: LeafletApi; map?: LeafletApi["map"] };
  if (record.default && typeof record.default.map === "function") return record.default;
  return mod as LeafletApi;
}

export function MapScreen({
  focusId,
  pinning,
  onFocus,
  onPinned,
}: {
  focusId: string | null;
  pinning: boolean;
  onFocus: (id: string | null) => void;
  onPinned: () => void;
}) {
  const cards = useAlbum((state) => state.cards);
  const setPlace = useAlbum((state) => state.setPlace);
  const hostRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const apiRef = useRef<LeafletApi | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const fitted = useRef(false);
  const [ready, setReady] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const placeOf = useServerFn(lookupPlace);
  const focus = cards.find((card) => card.id === focusId) ?? null;
  const pinnedCount = cards.filter((card) => card.lat != null && card.lng != null).length;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let dead = false;
    void (async () => {
      const api = resolveLeaflet(await import("leaflet"));
      if (dead || !hostRef.current) return;
      const map = api.map(host, { zoomControl: true, attributionControl: true }).setView([16.05, 107.8], 5);
      api
        .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        })
        .addTo(map);
      mapRef.current = map;
      apiRef.current = api;
      setReady(true);
      window.setTimeout(() => map.invalidateSize(), 180);
    })();
    return () => {
      dead = true;
      mapRef.current?.remove();
      mapRef.current = null;
      apiRef.current = null;
      setReady(false);
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const api = apiRef.current;
    if (!map || !api) return;
    markersRef.current.forEach((marker) => marker.remove());
    const points: [number, number][] = [];
    const markers: Marker[] = [];
    for (const card of cards) {
      if (card.lat == null || card.lng == null) continue;
      const focused = card.id === focusId;
      const marker = api
        .marker([card.lat, card.lng], {
          icon: api.divIcon({
            className: "meo-pin-wrap",
            html: `<span class="meo-pin${focused ? " is-focus" : ""}"></span>`,
            iconSize: [22, 22],
            iconAnchor: [11, 11],
          }),
        })
        .addTo(map);
      marker.on("click", () => onFocus(card.id));
      markers.push(marker);
      points.push([card.lat, card.lng]);
    }
    markersRef.current = markers;
    if (!fitted.current && points.length > 0) {
      map.fitBounds(api.latLngBounds(points).pad(0.35), { maxZoom: 14, animate: false });
      fitted.current = true;
    }
  }, [cards, focusId, ready, onFocus]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    const handler = (event: { latlng: { lat: number; lng: number } }) => {
      if (!pinning || !focusId) return;
      void (async () => {
        setNote("Đang hỏi địa danh…");
        const { place } = await placeOf({ data: { lat: event.latlng.lat, lng: event.latlng.lng } });
        setPlace(focusId, event.latlng.lat, event.latlng.lng, place);
        setNote(place ? `Đã ghim tại ${place}` : "Đã ghim toạ độ");
        onPinned();
      })();
    };
    map.on("click", handler);
    return () => {
      map.off("click");
    };
  }, [focusId, pinning, ready, onPinned, placeOf, setPlace]);

  return (
    <section className="relative h-full">
      <div ref={hostRef} className="absolute inset-0" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 p-3">
        <div className="pointer-events-auto rounded-2xl bg-surface/95 px-3 py-2 shadow-md">
          <p className="font-serif text-lg leading-tight">Bản đồ ổ mèo</p>
          <p className="text-xs text-muted">
            {pinnedCount === 0 ? "Chưa có thẻ nào được ghim" : `${pinnedCount} vị trí · OpenStreetMap`}
          </p>
          {pinning && focus && (
            <p className="mt-1 text-sm text-ginger">Chạm bản đồ để ghim “{focus.name}”.</p>
          )}
          {note && <p className="mt-1 text-xs text-muted">{note}</p>}
        </div>
      </div>
      {focus && (
        <button
          type="button"
          onClick={() => onFocus(focus.id)}
          className="absolute inset-x-3 bottom-3 z-10 flex items-center gap-3 rounded-2xl bg-surface p-2 text-left shadow-lg"
        >
          <img src={focus.photo} alt="" className="size-14 rounded-xl object-cover" />
          <span className="min-w-0">
            <span className="block truncate font-serif text-lg leading-tight">{focus.name}</span>
            <span className="flex items-center gap-1 text-xs text-muted">
              <MapPin className="size-3 text-ginger" aria-hidden="true" />
              <span className="truncate">{focus.place ?? "Chưa có địa danh"}</span>
            </span>
          </span>
        </button>
      )}
    </section>
  );
}
