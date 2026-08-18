"use client";

import { create } from "zustand";

type Mode = "corridor" | "full";

type GalleryState = {
  currentIndex: number;
  mode: Mode;
  setIndex: (i: number) => void;
  next: (total: number) => void;
  openFull: (index: number) => void;
  closeFull: () => void;
  reset: () => void;
};

export const useGalleryStore = create<GalleryState>((set) => ({
  currentIndex: 0,
  mode: "corridor",
  setIndex: (i) => set({ currentIndex: i }),
  next: (total) =>
    set((s) => ({ currentIndex: (s.currentIndex + 1) % total })),
  openFull: (index) => set({ currentIndex: index, mode: "full" }),
  closeFull: () => set({ mode: "corridor" }),
  reset: () => set({ currentIndex: 0, mode: "corridor" }),
}));
