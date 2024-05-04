import { create } from "zustand"

interface CommunityAvatarModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useCommunityAvatarModal = create<CommunityAvatarModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useCommunityAvatarModal