import { FilterType } from "@components/content/Dashboard/Voters/FilterSection/FilterType";
import { create } from "zustand";

interface FilterStore {
  filter?: FilterType;
  setFilter: (data: FilterType) => void;
}

const useFilterStore = create<FilterStore>((set) => ({
  filter: undefined,
  setFilter: (data: FilterType) => set(() => ({ filter: data })),
}));

export default useFilterStore;
