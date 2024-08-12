import { FilterType } from "@components/content/Dashboard/Delegates/FilterSection/FilterType";
import { create } from "zustand";

interface DelegatesStore {
  page?: number;
  filter?: FilterType;
  setFilter: (data: FilterType) => void;
  setPage: (page: number | undefined) => void;
}

const useDelegatesStore = create<DelegatesStore>((set) => ({
  page: 1,
  filter: undefined,
  setFilter: (data: FilterType) => set(() => ({ filter: data })),
  setPage: (page) => set(() => ({ page: page })),
}));

export default useDelegatesStore;
