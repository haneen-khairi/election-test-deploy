import APIClient from "@services/api";
import { useQuery } from "@tanstack/react-query";
import { BoxesType, VotingCentersType } from "./Centers";

export const useGetVotingCenters = (isMapLoaded?: boolean) => {
  const api = new APIClient<VotingCentersType>(`data/voting_center`);
  return useQuery({
    queryKey: ["VotingCenters"],
    queryFn: () => api.getList(),
    enabled: !!isMapLoaded,
  });
};

export const useGetVotingCentersBoxes = (id: string, isEnabled: boolean) => {
  const api = new APIClient<BoxesType>(`data/map/voting_center/boxes/${id}`);
  return useQuery({
    queryKey: ["VotingCentersBoxes", id],
    queryFn: () => api.getItem(),
    enabled: !!isEnabled,
  });
};
