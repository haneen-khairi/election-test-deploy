import { create } from "zustand";

interface NamesStore {
  page?: number;
  setPage: (page: number | undefined) => void;
}

const useNamesStore = create<NamesStore>((set) => ({
  page: 1,
  setPage: (page) => set(() => ({ page })),
}));

export default useNamesStore;
