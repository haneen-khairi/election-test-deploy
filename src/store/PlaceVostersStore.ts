import { create } from "zustand";

interface PlaceVotersStore {
  page?: number;
  setPage: (page: number | undefined) => void;
}

const usePlaceVotersStore = create<PlaceVotersStore>((set) => ({
  page: 1,
  setPage: (page) => set(() => ({ page: page })),
}));

export default usePlaceVotersStore;
