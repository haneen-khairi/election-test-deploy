import { create } from "zustand";

interface TasksStore {
  page?: number;
  setPage: (page: number | undefined) => void;
}

const useTasksStore = create<TasksStore>((set) => ({
  page: 1,
  setPage: (page) => set(() => ({ page: page })),
}));

export default useTasksStore;
