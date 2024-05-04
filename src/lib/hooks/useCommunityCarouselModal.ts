import { create } from "zustand"

interface CommunityCarouselModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useCommunityCarouselModal = create<CommunityCarouselModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useCommunityCarouselModal