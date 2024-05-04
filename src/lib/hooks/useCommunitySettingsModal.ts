import { create } from "zustand"

interface CommunitySettingsModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useCommunitySettingsModal = create<CommunitySettingsModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useCommunitySettingsModal