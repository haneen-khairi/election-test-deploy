import { create } from "zustand";

interface VostersSotre {
  page?: number;
  setPage: (page: number | undefined) => void;
  addedPage?: number;
  setAddedPage: (page: number | undefined) => void;
}

const useVostersStore = create<VostersSotre>((set) => ({
  page: 1,
  setPage: (page) => set(() => ({ page })),
  addedPage: 1,
  setAddedPage: (addedPage) => set(() => ({ addedPage })),
}));

export default useVostersStore;
