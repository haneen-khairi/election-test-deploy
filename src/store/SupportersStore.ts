import { create } from "zustand";

interface SupportersStore {
  page?: number;
  token: string | null;
  setToken: (token: string | undefined) => void;
  setPage: (page: number | undefined) => void;
}

const useSupportersStore = create<SupportersStore>((set) => ({
  page: 1,
  token: null,
  setToken: (token) => set(() => ({ token })),
  setPage: (page) => set(() => ({ page })),
}));

export default useSupportersStore;
