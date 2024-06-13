import { useQuery } from "@tanstack/react-query";
import APIClient from "@services/api";
import { GroupType } from "./Delegates";

const GroupURL = "account/groups/";
export const useGetDelegateTypes = () => {
  const api = new APIClient<GroupType>(GroupURL);
  return useQuery({
    queryKey: ["DelegateTypes"],
    queryFn: () => api.getList(),
  });
};
