import { create } from "zustand";

export const useOpenDetailStore = create((set) => ({
  detail: false,
  openDetail: () => {
    set({ detail: true });
  },
  closeDetail: () => {
    set({ detail: false });
  },
}));
