import { create } from "zustand"

interface GenderModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useGenderModal = create<GenderModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useGenderModal