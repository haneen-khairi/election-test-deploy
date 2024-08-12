import { create } from "zustand";

interface ExcelStore {
  page?: number;
  setPage: (page: number | undefined) => void;
}

const useExcelStore = create<ExcelStore>((set) => ({
  page: 1,
  setPage: (page) => set(() => ({ page: page })),
}));

export default useExcelStore;
