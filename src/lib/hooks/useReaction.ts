import { create } from 'zustand';

interface ReactionStore {
    reactionStatus: any;
    setReactionStatus: (newStatus: any) => void;
}

export const useReactionStore = create<ReactionStore>((set) => ({
    reactionStatus: null,
    setReactionStatus: (newStatus: any) => set({ reactionStatus: newStatus }),
}));