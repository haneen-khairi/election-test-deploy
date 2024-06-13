import APIClient from "@services/api";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { GetTaskType, PostPutTaskType, TaskType } from "./Tasks";
import useTasksStore from "@store/TasksStore";
import { FilterType } from "@components/content/Dashboard/Tasks/FilterSection/FilterType";
import { ItemResponse } from "@services/structure";

export const useGetTakTypes = () => {
  const api = new APIClient<TaskType>("task/types");
  return useQuery({
    queryKey: ["TaskTypes"],
    queryFn: () => api.getList(),
  });
};

export const useGetTasks = (filter?: FilterType) => {
  const { page } = useTasksStore();
  const api = new APIClient<GetTaskType>("task/tasks");
  return useQuery({
    queryKey: ["Tasks", page, filter],
    queryFn: () =>
      api.getPageintaed({
        params: {
          page: page,
          task_type: filter?.task_type,
          mandob_type: filter?.mandob_type,
          mandob_name: filter?.mandob_name,
          status: filter?.status,
          date: filter?.date,
          time: filter?.time,
        },
      }),
    placeholderData: keepPreviousData,
  });
};

export const useGetTask = (id: number, isEnabled: boolean) => {
  const api = new APIClient<GetTaskType>(`task/tasks/${id}`);
  return useQuery({
    queryKey: ["Task", id],
    queryFn: () => api.getItem(),
    enabled: !!isEnabled,
  });
};

export const usePutTask = (id: number) => {
  const clientQuery = useQueryClient();
  const api = new APIClient<PostPutTaskType>(`task/tasks/${id}`);
  return useMutation<ItemResponse<string>, Error, PostPutTaskType>({
    mutationFn: async (data: PostPutTaskType) => {
      const response = (await api.put(data)) as ItemResponse<string>;
      return response;
    },
    onSuccess: async () => {
      clientQuery.resetQueries({
        queryKey: ["Tasks"],
      });
      clientQuery.resetQueries({
        queryKey: ["Task"],
        type: "active",
      });
      return "Added";
    },
    onError: (error: Error) => {
      if (error) return error;
    },
  });
};

export const usePostTask = () => {
  const clientQuery = useQueryClient();
  const api = new APIClient<PostPutTaskType>(`task/tasks`);
  return useMutation<ItemResponse<string>, Error, PostPutTaskType>({
    mutationFn: async (data: PostPutTaskType) => {
      const response = (await api.post(data)) as ItemResponse<string>;
      return response;
    },
    onSuccess: async () => {
      clientQuery.resetQueries({
        queryKey: ["Tasks"],
      });
      clientQuery.resetQueries({
        queryKey: ["Task"],
        type: "active",
      });
      return "Added";
    },
    onError: (error: Error) => {
      if (error) return error;
    },
  });
};
