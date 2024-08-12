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
  VotersResult,
  VotersStats,
} from "./Voters";
import useVostersStore from "@store/VostersSotre";
import { ItemResponse } from "@services/structure";
import { DeliveringVote, MapVoter, VotingDelegate } from "../insights/Insights";
import useSupportersStore from "@store/SupportersStore";
import usePlaceVotersStore from "@store/PlaceVostersStore";
import useDelegatesStore from "@store/DelegatesStore";
import filterSelections from "@services/utils/filterSelecttions";
import useNamesStore from "@store/NamesStore";

const url = "candidate/voters";

export const useGetVoters = (filter?: any) => {
  const { page } = useVostersStore();
  const api = new APIClient<VotersResult>(url);

  return useQuery({
    queryKey: ["useGetVoters", filter, page],
    queryFn: () =>
      api.getPageintaed({
        params: {
          page: page,
          myvote: false,
          ...filterSelections(filter),
        },
      }),
    placeholderData: keepPreviousData,
  });
};

export const useGetMyVoters = (filter?: any) => {
  const { page } = useVostersStore();
  const api = new APIClient<VotersResult>(url);

  return useQuery({
    queryKey: ["useGetMyVoters", filter, page],
    queryFn: () =>
      api.getPageintaed({
        params: {
          page: page,
          myvote: true,
          ...filterSelections(filter),
        },
      }),
    placeholderData: keepPreviousData,
  });
};

export const useGetNamesWithOthers = (filter?: any) => {
  const { page } = useNamesStore();
  const api = new APIClient<any>("candidate/my_lists/duplicates/");

  return useQuery({
    queryKey: ["GetNamesWithOthers", filter, page],
    queryFn: () =>
      api.getPageintaed({
        params: {
          page,
        },
      }),
    placeholderData: keepPreviousData,
  });
};

export const useGetSupportersByToken = (token: string, filter?: any) => {
  const api = new APIClient<any>("supporter/voters/token");
  const { page } = useSupportersStore();

  const newFilter = structuredClone(filter);

  if (filter?.last_name) newFilter.last_name = filter.last_name.join(",");

  return useQuery({
    queryKey: ["GetSupportersByToken", newFilter, page],
    queryFn: () =>
      api.getPageintaed({
        params: {
          token,
          page,
          ...newFilter,
        },
      }),
  });
};

export const useGetSupporters = (filter: any) => {
  const { page } = useSupportersStore();
  const api = new APIClient<GetVoters>(
    "supporter/assign_selected_users_to_my_votes",
  );

  return useQuery({
    queryKey: ["Supporters", filter, page],
    queryFn: () =>
      api.getPageintaed({
        params: {
          page: page,
          page_size: 20,
          ...filterSelections(filter),
        },
      }),
    placeholderData: keepPreviousData,
  });
};

export const useGetVotersStats = (filter: any) => {
  const api = new APIClient<VotersStats>(`statistic/voters_number/voters`);
  return useQuery({
    queryKey: ["VotersStats", filter],
    queryFn: () =>
      api.getItem({
        params: {
          ...filterSelections(filter),
        },
      }),
  });
};

export const useGetVoterProfileByToken = (token: string) => {
  const api = new APIClient<any>(`candidate/voters/qr`);

  return useQuery({
    queryKey: ["GetVoterProfileByToken", token],
    queryFn: () =>
      api.getItem({
        params: {
          qr_code: token,
        },
      }),
  });
};

export const useGetVoterProfileById = (id: string) => {
  const api = new APIClient<any>(`supporter/get_candidate_info/${id}`);

  return useQuery({
    queryKey: ["GetVoterProfileById", id],
    queryFn: () => api.getItem(),
  });
};

export const useGetMapVoters = (filter?: any) => {
  const api = new APIClient<MapVoter>(
    `statistic/voters_number/map/voting_center`,
  );

  return useQuery({
    queryKey: ["MapVoters", filter],
    queryFn: () =>
      api.getList({
        params: {
          ...filterSelections(filter),
        },
      }),
  });
};

export const useGetDeliveringVoters = (filter: any) => {
  const api = new APIClient<DeliveringVote>(
    `statistic/election_day/delivery_table`,
  );
  return useQuery({
    queryKey: ["DeliveringVoters", filter],
    queryFn: () =>
      api.getItem({
        params: filterSelections(filter),
      }),
  });
};

export const useGetVotingDelegates = (filter: any) => {
  const api = new APIClient<VotingDelegate>(
    `statistic/election_day/main_mandoub_table`,
  );
  return useQuery({
    queryKey: ["VotingDeligates", filter],
    queryFn: () =>
      api.getList({
        params: filterSelections(filter),
      }),
  });
};

export const useGetPerformance = (filter: any) => {
  const api = new APIClient<any>(`statistic/election_day/voters_by_hour`);
  return useQuery({
    queryKey: ["PerformanceData", filter],
    queryFn: () => api.getList({ params: filterSelections(filter) }),
  });
};

export const useGetElectionDayStats = (filter: any) => {
  const api = new APIClient<ElectionDayStats>(
    `statistic/election_day/statistic`,
  );
  return useQuery({
    queryKey: ["ElectionDayStats", filter],
    queryFn: () => api.getItem({ params: filterSelections(filter) }),
  });
};

export const useGetMyVotesStats = (filter: any) => {
  const api = new APIClient<any>(
    `candidate/voters/statistics/my-votes-status-percentage`,
  );

  const { status, ...rest } = filter;

  return useQuery({
    queryKey: ["MyVotesStats", rest],
    queryFn: () =>
      api.getItem({
        params: {
          ...filterSelections(rest),
        },
      }),
  });
};

export const useGetDelegatesVotes = (filter: any) => {
  const api = new APIClient<any>(
    `candidate/voters/statistics/mandoub-main-vote-counts`,
  );

  const { mandoub_main, ...rest } = filter;
  const { page } = useDelegatesStore();

  return useQuery({
    queryKey: ["DelegatesVotes", rest, page],
    queryFn: () =>
      api.getList({
        params: { ...filterSelections(rest), page },
      }) as any,
  });
};

export const useGetPlaceBasedVotes = (filter: any) => {
  const { page } = usePlaceVotersStore();

  const api = new APIClient<any>(
    `statistic/election_day/place_of_residence_delivery_table`,
  );

  const { place_of_residence, ...rest } = filter;

  return useQuery({
    queryKey: ["GetPlaceBasedVotes", page, rest],
    queryFn: () =>
      api.getPageintaed({
        params: {
          page,
          ...filterSelections(rest),
        },
      }) as any,
  });
};

export const useGetActivitiesVotes = (period: string, filter?: any) => {
  const api = new APIClient<any>(
    `candidate/voters/statistics/votes-counts-by-date`,
  );
  return useQuery({
    queryKey: ["ActivitiesVotes"],
    queryFn: () =>
      api.getList({
        params: {
          date_filter: period,
          ...filterSelections(filter),
        },
      }) as any,
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
  const api = new APIClient<any>(url);

  return useMutation<ItemResponse<string>, Error, PutVoter>({
    mutationFn: async (data: any) => {
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
      const response = (await api.post(
        data,
      )) as unknown as ItemResponse<string>;
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

export const useSendSupporters = () => {
  const clientQuery = useQueryClient();
  const url = new APIClient<any>("supporter/select_users_for_token");

  return useMutation<ItemResponse<string>, Error, any>({
    mutationFn: async ({
      token,
      users,
    }: {
      token: string;
      users: {
        id: string;
        mobile: string;
      }[];
    }) => {
      const response = await url.post({
        token,
        users,
      });
      return response;
    },
    onSuccess: async () => {
      clientQuery.resetQueries({
        queryKey: ["SendSupporters"],
      });
    },
    onError: (error: Error) => {
      if (error) return error;
    },
  });
};

export const useTransferVoters = () => {
  const clientQuery = useQueryClient();
  const url = new APIClient<any>("candidate/my_lists/add-to-my-votes/");

  return useMutation<any>({
    mutationFn: async (data: any) => {
      const response = await url.post(data);
      return response;
    },
    onSuccess: async () => {
      clientQuery.invalidateQueries({
        queryKey: [],
      });
    },
    onError: (error: Error) => {
      if (error) return error;
    },
  });
};
