import { create } from "zustand";

interface SupportersStore {
  page?: number;
  modalPage?: number;
  token: string | null;
  addedPage?: number;
  setToken: (token: string | undefined) => void;
  setPage: (page: number | undefined) => void;
  setModalPage: (page: number | undefined) => void;
  setAddedPage: (page: number | undefined) => void;
}

const useSupportersStore = create<SupportersStore>((set) => ({
  page: 1,
  modalPage: 1,
  token: null,
  addedPage: 1,
  setToken: (token) => set(() => ({ token })),
  setPage: (page) => set(() => ({ page })),
  setModalPage: (modalPage) => set(() => ({ modalPage })),
  setAddedPage: (addedPage) => set(() => ({ addedPage })),
}));

export default useSupportersStore;
