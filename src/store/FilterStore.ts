/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface FilterStore {
  filter?: any;
  setFilter: (data: any) => void;
}

const useFilterStore = create<FilterStore>((set) => ({
  filter: undefined,
  setFilter: (data: any) => set(() => ({ filter: data })),
}));

export default useFilterStore;
