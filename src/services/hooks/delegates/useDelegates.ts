/* eslint-disable @typescript-eslint/no-explicit-any */
import APIClient from "@services/api";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { GetDelegate, GetDelegates, PostDelegate } from "./Delegates";
import { ItemResponse } from "@services/structure";
import { FilterType } from "@components/content/Dashboard/Delegates/FilterSection/FilterType";
import useDelegatesStore from "@store/DelegatesStore";
import useSupportersStore from "@store/SupportersStore";

const manadeebURL = "account/manadeeb";
export const useGetDelegates = (filter?: FilterType) => {
  const { page } = useDelegatesStore();
  const api = new APIClient<GetDelegates>(manadeebURL + "/");
  return useQuery({
    queryKey: ["Delegates", filter, page],
    queryFn: () =>
      api.getPageintaed({
        params: {
          page: page,
          name: filter?.name,
          group: filter?.group,
          mobile_number: filter?.mobile_number,
        },
      }),
    placeholderData: keepPreviousData,
  });
};

export const useGetDelegate = (id: string, isEnabled: boolean) => {
  const api = new APIClient<GetDelegate>(`${manadeebURL}/${id}`);
  return useQuery({
    queryKey: ["GetOneDelegate", id],
    queryFn: () => api.getItem(),
    enabled: !!isEnabled,
  });
};

export const usePostDelegate = () => {
  const clientQuery = useQueryClient();
  const api = new APIClient<PostDelegate>("account/register/");
  return useMutation<ItemResponse<string>, Error, PostDelegate>({
    mutationFn: async (data: PostDelegate) => {
      const response = (await api.post(data)) as ItemResponse<string>;
      return response;
    },
    onSuccess: async () => {
      clientQuery.resetQueries({
        queryKey: ["Delegates"],
        type: "active",
      });
      return "Added";
    },
    onError: (error: Error) => {
      if (error) return error;
    },
  });
};

export const usePutDelegate = (id: string) => {
  const clientQuery = useQueryClient();
  const api = new APIClient<PostDelegate>(`${manadeebURL}/${id}`);
  return useMutation<ItemResponse<string>, Error, PostDelegate>({
    mutationFn: async (data: PostDelegate) => {
      const response = (await api.put(data)) as ItemResponse<string>;
      return response;
    },
    onSuccess: async () => {
      clientQuery.resetQueries({
        queryKey: ["Delegates"],
        type: "active",
      });
      clientQuery.resetQueries({
        queryKey: ["GetOneDelegate"],
        type: "active",
      });
      return "Added";
    },
    onError: (error: Error) => {
      if (error) return error;
    },
  });
};

export const useDeleteDelegate = (id: string) => {
  const clientQuery = useQueryClient();
  const url = new APIClient(`${manadeebURL}/${id}`);
  return useMutation({
    mutationFn: async () => {
      const response = await url.delete();
      return response;
    },
    onSuccess: async () => {
      clientQuery.resetQueries({
        queryKey: ["Delegates"],
      });

      return "Deleted";
    },
    onError: (error: Error) => {
      if (error) return error;
    },
  });
};

export const useGetSupporterNamesModal = () => {
  const api = new APIClient<any>("supporter/almuazereen");
  const { modalPage } = useSupportersStore();

  return useQuery({
    queryKey: ["SupporterNames"],
    queryFn: () =>
      api.getList({
        params: {
          page: modalPage,
        },
      }),
  });
};

export const useAddSupporter = () => {
  const clientQuery = useQueryClient();
  const api = new APIClient<any>("supporter/generate_token");

  return useMutation<ItemResponse<string>, Error, any>({
    mutationFn: async (data: any) => {
      const response = (await api.post(data)) as any;
      return response;
    },
    onSuccess: async () => {
      await clientQuery.invalidateQueries({
        queryKey: ["SupporterNames"],
      });
     
    },
    onError: (error: Error) => {
      if (error) return error;
    },
  });
};
