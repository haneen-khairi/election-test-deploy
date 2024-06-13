import APIClient from "@services/api";
import { ItemResponse } from "@services/structure";
import { useMutation } from "@tanstack/react-query";
import { RefreshBody } from "./Auth";

export const useRefreshToken = () => {
  const api = new APIClient<RefreshBody>(`account/token/refresh/`);
  return useMutation<ItemResponse<string>, Error, RefreshBody>({
    mutationFn: async (data: RefreshBody) => {
      const response = (await api.postNoToken(data)) as ItemResponse<string>;
      return response;
    },
    onSuccess: async () => {
      return "Success";
    },
    onError: (error: Error) => {
      if (error) return error;
    },
  });
};
