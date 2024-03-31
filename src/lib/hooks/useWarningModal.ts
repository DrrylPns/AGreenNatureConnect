import { create } from 'zustand';

interface WarningModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useWarningModal = create<WarningModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useWarningModal;