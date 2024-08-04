/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface ListsStore {
  page1?: number;
  setPage1: (page1: number | undefined) => void;

  page2?: number;
  setPage2: (page2: number | undefined) => void;

  page3?: number;
  setPage3: (page3: number | undefined) => void;
}

const useListsStore = create<ListsStore>((set) => ({
  page1: 1,
  setPage1: (page1) => set(() => ({ page1 })),

  page2: 1,
  setPage2: (page2) => set(() => ({ page2 })),

  page3: 1,
  setPage3: (page3) => set(() => ({ page3 })),
}));

export default useListsStore;
