/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import APIClient from "@services/api";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  AssignSupporter,
  ElectionDayStats,
  GetVoterDetails,
  GetVoters,
  PutVoter,
  VotersStats,
} from "./Voters";
import { FilterType } from "@components/content/Dashboard/Voters/FilterSection/FilterType";
import useVostersStore from "@store/VostersSotre";
import { ItemResponse } from "@services/structure";
import { DeliveringVote, MapVoter, VotingDelegate } from "../insights/Insights";
import useSupportersStore from "@store/SupportersStore";

const url = "candidate/voters";
export const useGetVoters = (filter?: FilterType, status?: string) => {
  const { page } = useVostersStore();
  const api = new APIClient<GetVoters>(url);
  return useQuery({
    queryKey: ["Voters", filter, page, status],
    queryFn: () =>
      api.getPageintaed({
        params: {
          page: page,
          ...filter,
        },
      }),
    placeholderData: keepPreviousData,
  });
};

export const useGetSupporters = (filter?: FilterType, status?: string) => {
  const { page } = useSupportersStore();
  const api = new APIClient<GetVoters>(
    "supporter/assign_selected_users_to_my_votes",
  );
  return useQuery({
    queryKey: ["Supporters", filter, page, status],
    queryFn: () =>
      api.getPageintaed({
        params: {
          page: page,
          page_size: 6,
          status: status || undefined,
          ...filter,
        },
      }),
    placeholderData: keepPreviousData,
  });
};

export const useGetVotersStats = (filter: any) => {
  const api = new APIClient<VotersStats>(`candidate/voters/statistics`);
  return useQuery({
    queryKey: ["VotersStats", filter?.last_name],
    queryFn: () =>
      api.getItem({
        params: {
          last_name: filter?.last_name,
        },
      }),
  });
};

export const useGetMapVoters = () => {
  const api = new APIClient<MapVoter>(`data/map/voting_center`);
  return useQuery({
    queryKey: ["MapVoters"],
    queryFn: () => api.getList(),
  });
};

export const useGetDeliveringVoters = () => {
  const api = new APIClient<DeliveringVote>(
    `statistic/election_day/delivery_table`,
  );
  return useQuery({
    queryKey: ["DeliveringVoters"],
    queryFn: () => api.getItem(),
  });
};

export const useGetVotingDelegates = () => {
  const api = new APIClient<VotingDelegate>(
    `statistic/election_day/main_mandoub_table`,
  );
  return useQuery({
    queryKey: ["VotingDeligates"],
    queryFn: () => api.getList(),
  });
};

export const useGetElectionDayStats = () => {
  const api = new APIClient<ElectionDayStats>(
    `statistic/election_day/statistic`,
  );
  return useQuery({
    queryKey: ["ElectionDayStats"],
    queryFn: () => api.getItem(),
  });
};

export const useGetMyVotesStats = (filter: any) => {
  const api = new APIClient<any>(
    `candidate/voters/statistics/my-votes-status-percentage`,
  );

  return useQuery({
    queryKey: ["MyVotesStats", filter],
    queryFn: () =>
      api.getItem({
        params: {
          ...filter,
        },
      }),
  });
};

export const useGetDelegatesVotes = () => {
  const api = new APIClient<any>(
    `candidate/voters/statistics/mandoub-main-vote-counts`,
  );
  return useQuery({
    queryKey: ["DelegatesVotes"],
    queryFn: () => api.getItem() as any,
  });
};

export const useGetActivitiesVotes = (period: string) => {
  const api = new APIClient<any>(
    `candidate/voters/statistics/votes-counts-by-date?date_filter=${period}`,
  );
  return useQuery({
    queryKey: ["ActivitiesVotes"],
    queryFn: () => api.getList() as any,
  });
};

export const useGetVoterDetails = (id: string, isEnabled: boolean) => {
  const api = new APIClient<GetVoterDetails>(`candidate/voter/${id}`);
  return useQuery({
    queryKey: ["VoterDetails", id, isEnabled],
    queryFn: () => api.getItem(),
    enabled: !!isEnabled,
  });
};

export const useUpdateVoterInfo = () => {
  const clientQuery = useQueryClient();
  const api = new APIClient<PutVoter>(url);
  return useMutation<ItemResponse<string>, Error, PutVoter>({
    mutationFn: async (data: PutVoter) => {
      const response = (await api.put(data)) as unknown as ItemResponse<string>;
      return response;
    },
    onSuccess: async (res) => {
      if (!res.error) {
        clientQuery.resetQueries({
          queryKey: ["Voters"],
        });
        clientQuery.resetQueries({
          queryKey: ["VoterDetails"],
        });
        return "Updated";
      }
    },
    onError: (error: Error) => {
      if (error) return error;
    },
  });
};

export const useAssignSupportersToVotes = () => {
  const clientQuery = useQueryClient();
  const api = new APIClient<AssignSupporter>(
    "supporter/assign_selected_users_to_my_votes",
  );

  return useMutation<ItemResponse<string>, Error, any>({
    mutationFn: async (data: AssignSupporter) => {
      const response = (await api.put(data)) as unknown as ItemResponse<string>;
      return response;
    },
    onSuccess: async (res) => {
      if (!res.error) {
        clientQuery.resetQueries({
          queryKey: ["Supporters"],
        });
        return "Updated";
      }
    },
    onError: (error: Error) => {
      if (error) return error;
    },
  });
};

export const useDeleteVoter = (id: string) => {
  const clientQuery = useQueryClient();
  const removeUrl = new APIClient(`${url}/${id}`);
  return useMutation({
    mutationFn: async () => {
      const response = await removeUrl.delete();
      return response;
    },
    onSuccess: async () => {
      clientQuery.resetQueries({
        queryKey: ["Voters"],
      });

      return "Deleted";
    },
    onError: (error: Error) => {
      if (error) return error;
    },
  });
};

export const useDeleteVoters = (_ids: string[]) => {
  const clientQuery = useQueryClient();
  const removeUrl = new APIClient(url);
  return useMutation({
    mutationFn: async () => {
      const response = await removeUrl.delete();
      return response;
    },
    onSuccess: async () => {
      clientQuery.resetQueries({
        queryKey: ["Voters"],
      });

      return "Deleted";
    },
    onError: (error: Error) => {
      if (error) return error;
    },
  });
};

export const useDeleteSupporters = () => {
  const clientQuery = useQueryClient();
  const removeUrl = new APIClient("supporter/select_users_for_token");
  return useMutation({
    mutationFn: async (ids: string[]) => {
      const response = await removeUrl.delete({
        ids,
      });
      return response;
    },
    onSuccess: async () => {
      clientQuery.resetQueries({
        queryKey: ["Supporters"],
      });

      return "Deleted";
    },
    onError: (error: Error) => {
      if (error) return error;
    },
  });
};
