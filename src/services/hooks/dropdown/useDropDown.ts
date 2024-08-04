/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import APIClient from "@services/api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { GetDropDown } from "./DropDown";
import { ListPageinated } from "@services/structure";
import useFilterStore from "@store/FilterStore";
import filterSelections from "@services/utils/filterSelecttions";

const url = "candidate/dropdown";

const filterTrans = (filter: any, fieldVal: string): any => {
  if (Object.keys(filter)?.length === 0) return {};

  const rest = structuredClone(filter);
  delete rest[fieldVal];

  return rest;
};

export const useGetSupporterNameDropdown = (search?: string) => {
  const api = new APIClient<GetDropDown>("supporter/almuazereen");
  return useInfiniteQuery<ListPageinated<GetDropDown>, Error>({
    queryKey: ["supporter_name_dropdown", search],
    queryFn: ({ pageParam = 1 }) =>
      api.getPageintaed({
        params: {
          page: pageParam,
          first_name: search || undefined,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages?.length + 1 : undefined;
    },
    staleTime: 24 * 60 * 60 * 1000,
    retry: false,
    initialPageParam: 1,
  });
};

export const useGetManadeebDropDown = (id: string) => {
  const api = new APIClient<GetDropDown>(`account/manadeeb/dropdown/${id}`);
  return useQuery({
    queryKey: ["GetManadeebDropDown", id],
    queryFn: () => api.getList(),
    enabled: !!id,
  });
};

export const useGetFirstNameDropdown = (
  search: string = "",
  filter: any = {},
  token?: string | null,
) => {
  const api = new APIClient<GetDropDown>(`${url}/first_name`);
  const rest = filterTrans(filter, "first_name");

  return useInfiniteQuery<ListPageinated<GetDropDown>, Error>({
    queryKey: ["first_name_dropdown", search, rest],
    queryFn: ({ pageParam = 1 }) => {
      const params = {
        page: pageParam,
        first_name: search || undefined,
        ...filterSelections(rest),
      };

      return token
        ? api.getPageintaedNoToken({
            params: {
              ...params,
              token,
            },
          })
        : api.getPageintaed({
            params,
          });
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages?.length + 1 : undefined;
    },
    staleTime: 24 * 60 * 60 * 1000,
    retry: false,
    initialPageParam: 1,
  });
};

export const useGetSecondNameDropdown = (
  search: string = "",
  filter: any = {},
  token?: string | null,
) => {
  const api = new APIClient<GetDropDown>(`${url}/second_name`);
  const { second_name, ...rest } = filter;

  return useInfiniteQuery<ListPageinated<GetDropDown>, Error>({
    queryKey: ["second_name_dropdown", search, rest],
    queryFn: ({ pageParam = 1 }) => {
      const params = {
        page: pageParam,
        second_name: search || undefined,
        ...filterSelections(rest),
      };

      return token
        ? api.getPageintaedNoToken({
            params: {
              ...params,
              token,
            },
          })
        : api.getPageintaed({
            params,
          });
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages?.length + 1 : undefined;
    },
    staleTime: 24 * 60 * 60 * 1000,
    retry: false,
    initialPageParam: 1,
  });
};

export const useGetThirdNameDropdown = (
  search: string = "",
  filter: any = {},
  token?: string | null,
) => {
  const api = new APIClient<GetDropDown>(`${url}/third_name`);
  const { third_name, ...rest } = filter;

  return useInfiniteQuery<ListPageinated<GetDropDown>, Error>({
    queryKey: ["third_name_dropdown", search, rest],
    queryFn: ({ pageParam = 1 }) => {
      const params = {
        page: pageParam,
        third_name: search || undefined,
        ...filterSelections(rest),
      };

      return token
        ? api.getPageintaedNoToken({
            params: {
              ...params,
              token,
            },
          })
        : api.getPageintaed({
            params,
          });
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages?.length + 1 : undefined;
    },
    staleTime: 24 * 60 * 60 * 1000,
    retry: false,
    initialPageParam: 1,
  });
};

export const useGetLastNameDropdown = (
  search: string = "",
  filter: any = {},
  token?: string | null,
) => {
  const api = new APIClient<GetDropDown>(`${url}/last_name`);
  const { last_name, ...rest } = filter;

  return useInfiniteQuery<ListPageinated<GetDropDown>, Error>({
    queryKey: ["last_name_dropdown", search, rest],
    queryFn: ({ pageParam = 1 }) => {
      const params = {
        page: pageParam,
        last_name: search || undefined,
        ...filterSelections(rest),
      };

      return token
        ? api.getPageintaedNoToken({
            params: {
              ...params,
              token,
            },
          })
        : api.getPageintaed({
            params,
          });
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages?.length + 1 : undefined;
    },
    staleTime: 24 * 60 * 60 * 1000,
    retry: false,
    initialPageParam: 1,
  });
};

export const useGetFamilyTreeDropdown = (
  search: string = "",
  filter: any = {},
  token?: string | null,
) => {
  const api = new APIClient<GetDropDown>(`family_tree/trees/`);
  const { family_tree, ...rest } = filter;

  return useInfiniteQuery<ListPageinated<GetDropDown>, Error>({
    queryKey: ["family_tree_dropdown", search, rest],
    queryFn: ({ pageParam = 1 }) => {
      const params = {
        page: pageParam,
        family_tree: search || undefined,
        ...filterSelections(rest),
      };

      return token
        ? api.getPageintaedNoToken({
            params: {
              ...params,
              token,
            },
          })
        : api.getPageintaed({
            params,
          });
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages?.length + 1 : undefined;
    },
    staleTime: 24 * 60 * 60 * 1000,
    retry: false,
    initialPageParam: 1,
  });
};

export const useGetVotingCentersDropdown = (search?: string) => {
  const api = new APIClient<GetDropDown>("data/voting_center");
  return useInfiniteQuery<ListPageinated<GetDropDown>, Error>({
    queryKey: ["voting_center_dropdown", search],
    queryFn: ({ pageParam = 1 }) =>
      api.getPageintaed({
        params: {
          page: pageParam,
          last_name: search || undefined,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages?.length + 1 : undefined;
    },
    staleTime: 24 * 60 * 60 * 1000,
    retry: false,
    initialPageParam: 1,
  });
};

export const useGetBoxesDropdown = (voting_center: any, search?: string) => {
  const api = new APIClient<GetDropDown>(
    `data/voting_center/boxes${voting_center ? `?voting_center=["${voting_center}"]` : ""}`,
  );

  return useInfiniteQuery<ListPageinated<GetDropDown>, Error>({
    queryKey: ["boxes_dropdown", search, voting_center],
    queryFn: ({ pageParam = 1 }) =>
      api.getPageintaed({
        params: {
          page: pageParam,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages?.length + 1 : undefined;
    },
    staleTime: 24 * 60 * 60 * 1000,
    retry: false,
    initialPageParam: 1,
  });
};

export const useGetplaceOfResidenceDropdown = (search?: string) => {
  const api = new APIClient<GetDropDown>(`${url}/place_of_residence`);
  return useInfiniteQuery<ListPageinated<GetDropDown>, Error>({
    queryKey: ["place_of_residence_dropdown", search],
    queryFn: ({ pageParam = 1 }) =>
      api.getPageintaed({
        params: {
          page: pageParam,
          place_of_residence: search || undefined,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages?.length + 1 : undefined;
    },
    staleTime: 24 * 60 * 60 * 1000,
    retry: false,
    initialPageParam: 1,
  });
};
export const useGetTypesOfTasks = (search?: string) => {
  const { filter } = useFilterStore();
  const api = new APIClient<GetDropDown>(`${url}/task/types`);
  return useInfiniteQuery<ListPageinated<GetDropDown>, Error>({
    queryKey: [
      "type_of_tasks",
      search,
      filter?.first_name,
      filter?.second_name,
    ],
    queryFn: ({ pageParam = 1 }) =>
      api.getPageintaed({
        params: {
          page: pageParam,
          first_name: filter?.first_name,
          second_name: filter?.second_name,
          typeOfTasks: search || undefined,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages?.length + 1 : undefined;
    },
    staleTime: 24 * 60 * 60 * 1000,
    retry: false,
    initialPageParam: 1,
  });
};
export const useGetElectoralDistrictDropdown = (search?: string) => {
  const { filter } = useFilterStore();
  const api = new APIClient<GetDropDown>(`${url}/electoral_district`);
  return useInfiniteQuery<ListPageinated<GetDropDown>, Error>({
    queryKey: [
      "electoral_district_dropdown",
      search,
      filter?.first_name,
      filter?.second_name,
      filter?.third_name,
      filter?.last_name,
      filter?.place_of_residence,
      filter?.gender,
    ],
    queryFn: ({ pageParam = 1 }) =>
      api.getPageintaed({
        params: {
          page: pageParam,
          first_name: filter?.first_name,
          second_name: filter?.second_name,
          third_name: filter?.third_name,
          last_name: filter?.last_name,
          place_of_residence: filter?.place_of_residence,
          gender: filter?.gender,
          electoral_district: search || undefined,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages?.length + 1 : undefined;
    },
    staleTime: 24 * 60 * 60 * 1000,
    retry: false,
    initialPageParam: 1,
  });
};

export const useGetVotingCenterDropDown = () => {
  const api = new APIClient<GetDropDown>("data/voting_center");
  return useQuery({
    queryKey: ["GetVotingCenterDropDown"],
    queryFn: () => api.getList(),
  });
};

// Filter on Multi Center Id
export const useGetBoxesDropDown = (votingCenters?: number[]) => {
  const api = new APIClient<GetDropDown>("data/voting_center/boxes");
  return useQuery({
    queryKey: ["GetBoxesDropDown", votingCenters],
    queryFn: () =>
      api.getList({
        params: {
          voting_center: votingCenters
            ? JSON.stringify(votingCenters)
            : undefined,
        },
      }),
    enabled: !!votingCenters?.length,
  });
};

// Filter on One Center Id
export const useGetBoxesDropDown2 = (votingCenter: string) => {
  const api = new APIClient<any>(
    `data/map/voting_center/boxes/${votingCenter}`,
  );
  return useQuery({
    queryKey: ["GetBoxesDropDown2", votingCenter],
    queryFn: () => api.getList(),
    enabled: !!votingCenter,
  });
};
