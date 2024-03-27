import { create } from "zustand"

interface UsernameModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useUsernameModal = create<UsernameModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useUsernameModal