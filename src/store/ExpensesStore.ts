/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface ExpensesStore {
  page?: number;
  filter?: any;
  setFilter: (data: any) => void;
  setPage: (page: number | undefined) => void;
}

const useExpensesStore = create<ExpensesStore>((set) => ({
  page: 1,
  filter: undefined,
  setFilter: (data: any) => set(() => ({ filter: data })),
  setPage: (page) => set(() => ({ page: page })),
}));

export default useExpensesStore;
