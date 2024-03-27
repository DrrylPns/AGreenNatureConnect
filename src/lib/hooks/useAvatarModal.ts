import { create } from "zustand"

interface AvatarModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useAvatarModal = create<AvatarModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useAvatarModal