import { create } from "zustand";

interface FilterType {
  last_name: string;
}
interface DashboardFilter {
  filter?: FilterType;
  setFilter: (data: FilterType) => void;
}

const useDashboardFilter = create<DashboardFilter>((set) => ({
  filter: undefined,
  setFilter: (data: FilterType) => set(() => ({ filter: data })),
}));

export default useDashboardFilter;
