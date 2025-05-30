import { create } from "zustand";

export const useOpenChatlistStore = create((set) => ({
  isChatlistOpen: false,
  openChatlist: () => {
    set({ isChatlistOpen: true });
  },
  closeChatlist: () => {
    set({ isChatlistOpen: false });
  },
}));
