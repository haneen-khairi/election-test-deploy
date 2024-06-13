import { create } from "zustand";

interface TransportationStore {
  page?: number;
  setPage: (page: number | undefined) => void;
}

const useTransportationStore = create<TransportationStore>((set) => ({
  page: 1,
  setPage: (page) => set(() => ({ page: page })),
}));

export default useTransportationStore;
