import { create } from 'zustand';

interface AIStore {
  introOpen: boolean;
  introCompleted: boolean;
  chatOpen: boolean;
  openIntro: () => void;
  closeIntro: () => void;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
}

export const useAIStore = create<AIStore>((set) => ({
  introOpen: false,
  introCompleted: typeof window !== 'undefined' && localStorage.getItem('ai_intro_done') === '1',
  chatOpen: false,
  openIntro: () => set({ introOpen: true }),
  closeIntro: () => {
    if (typeof window !== 'undefined') localStorage.setItem('ai_intro_done', '1');
    set({ introOpen: false, introCompleted: true });
  },
  openChat: () => set({ chatOpen: true }),
  closeChat: () => set({ chatOpen: false }),
  toggleChat: () => set((s) => ({ chatOpen: !s.chatOpen })),
}));
