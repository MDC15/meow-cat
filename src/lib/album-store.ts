import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CardStats, Rarity } from "@/lib/breed-match";

export type SavedCard = {
  id: string;
  createdAt: number;
  photo: string;
  name: string;
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
  checkLine: string;
  lat: number | null;
  lng: number | null;
  place: string | null;
  bigCat: boolean;
};

type AlbumState = {
  cards: SavedCard[];
  quota: boolean;
  add: (card: SavedCard) => void;
  remove: (id: string) => void;
  rename: (id: string, name: string) => void;
  setPlace: (id: string, lat: number, lng: number, place: string | null) => void;
  clearQuota: () => void;
};

export const useAlbum = create<AlbumState>()(
  persist(
    (set) => ({
      cards: [],
      quota: false,
      add: (card) => set((state) => ({ cards: [card, ...state.cards].slice(0, 24), quota: false })),
      remove: (id) => set((state) => ({ cards: state.cards.filter((card) => card.id !== id) })),
      rename: (id, name) =>
        set((state) => ({
          cards: state.cards.map((card) => (card.id === id ? { ...card, name } : card)),
        })),
      setPlace: (id, lat, lng, place) =>
        set((state) => ({
          cards: state.cards.map((card) => (card.id === id ? { ...card, lat, lng, place } : card)),
        })),
      clearQuota: () => set({ quota: false }),
    }),
    {
      name: "locket-meo-album",
      skipHydration: true,
      storage: createJSONStorage(() => ({
        getItem: (key) => localStorage.getItem(key),
        setItem: (key, value) => {
          try {
            localStorage.setItem(key, value);
          } catch {
            useAlbum.setState({ quota: true });
          }
        },
        removeItem: (key) => localStorage.removeItem(key),
      })),
    },
  ),
);
