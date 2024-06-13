import { create } from "zustand";

interface VostersSotre {
  page?: number;
  setPage: (page: number | undefined) => void;
}

const useVostersStore = create<VostersSotre>((set) => ({
  page: 1,
  setPage: (page) => set(() => ({ page: page })),
}));

export default useVostersStore;
