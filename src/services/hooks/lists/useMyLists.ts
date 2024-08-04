/* eslint-disable @typescript-eslint/no-explicit-any */
import APIClient from "@services/api";
import { ItemResponse } from "@services/structure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetCosts = () => {
  const api = new APIClient<any>("expense/costs");
  return useQuery({
    queryKey: ["Costs"],
    queryFn: () => api.getList(),
  });
};

export const useProcessMyLists = ({
  page = 1,
  key = "found_in_voters",
}: {
  page: number;
  key: "found_in_voters" | "not_found" | "found_with_mandoub_main";
}) => {
  const clientQuery = useQueryClient();
  const api = new APIClient<any>(
    `candidate/my_lists/upload-excel/?page=${page}&key=${key}`,
  );

  return useMutation<ItemResponse<string>, Error, any>({
    mutationFn: async (data: any) => { 
      const response = (await api.post(data)) as ItemResponse<string>;
      return response;
    },
    onSuccess: async () => {
      clientQuery.resetQueries({
        queryKey: ["ProcessMyLists"],
      });
      clientQuery.invalidateQueries({
        queryKey: [],
      });
    },
    onError: (error: Error) => {
      if (error) return error;
    },
  });
};
