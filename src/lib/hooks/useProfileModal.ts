import { create } from "zustand"

interface ProfileModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useProfileModal = create<ProfileModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useProfileModal