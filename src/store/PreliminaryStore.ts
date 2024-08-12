import { create } from "zustand";

interface PreliminaryStore {
  page?: number;
  setPage: (page: number | undefined) => void;
}

const usePreliminaryStore = create<PreliminaryStore>((set) => ({
  page: 1,
  setPage: (page) => set(() => ({ page: page })),
}));

export default usePreliminaryStore;
