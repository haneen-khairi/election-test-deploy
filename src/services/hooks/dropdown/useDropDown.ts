/* eslint-disable @typescript-eslint/no-explicit-any */
import APIClient from "@services/api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { GetDropDown } from "./DropDown";
import { ListPageinated } from "@services/structure";
import useFilterStore from "@store/FilterStore";

const url = "candidate/dropdown";

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
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    staleTime: 24 * 60 * 60 * 1000,
    retry: false,
    initialPageParam: 1,
  });
};

export const useGetFirstNameDropdown = (search?: string) => {
  const { filter } = useFilterStore();
  const api = new APIClient<GetDropDown>(`${url}/first_name`);
  return useInfiniteQuery<ListPageinated<GetDropDown>, Error>({
    queryKey: [
      "first_name_dropdown",
      search,
      filter?.second_name,
      filter?.third_name,
      filter?.last_name,
      filter?.Place_of_residence,
      filter?.electoral_district,
      filter?.gender,
    ],
    queryFn: ({ pageParam = 1 }) =>
      api.getPageintaed({
        params: {
          page: pageParam,
          first_name: search || undefined,
          second_name: filter?.second_name,
          third_name: filter?.third_name,
          last_name: filter?.last_name,
          Place_of_residence: filter?.Place_of_residence,
          electoral_district: filter?.electoral_district,
          gender: filter?.gender,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    staleTime: 24 * 60 * 60 * 1000,
    retry: false,
    initialPageParam: 1,
  });
};
export const useGetSecondNameDropdown = (search?: string) => {
  const { filter } = useFilterStore();
  const api = new APIClient<GetDropDown>(`${url}/second_name`);
  return useInfiniteQuery<ListPageinated<GetDropDown>, Error>({
    queryKey: [
      "second_name_dropdown",
      search,
      filter?.first_name,
      filter?.third_name,
      filter?.last_name,
      filter?.Place_of_residence,
      filter?.electoral_district,
      filter?.gender,
    ],
    queryFn: ({ pageParam = 1 }) =>
      api.getPageintaed({
        params: {
          page: pageParam,
          first_name: filter?.first_name,
          second_name: search || undefined,
          third_name: filter?.third_name,
          last_name: filter?.last_name,
          Place_of_residence: filter?.Place_of_residence,
          electoral_district: filter?.electoral_district,
          gender: filter?.gender,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    staleTime: 24 * 60 * 60 * 1000,
    retry: false,
    initialPageParam: 1,
  });
};
export const useGetThirdNameDropdown = (search?: string) => {
  const { filter } = useFilterStore();
  const api = new APIClient<GetDropDown>(`${url}/third_name`);
  return useInfiniteQuery<ListPageinated<GetDropDown>, Error>({
    queryKey: [
      "third_name_dropdown",
      search,
      filter?.first_name,
      filter?.second_name,
      filter?.last_name,
      filter?.Place_of_residence,
      filter?.electoral_district,
      filter?.gender,
    ],
    queryFn: ({ pageParam = 1 }) =>
      api.getPageintaed({
        params: {
          page: pageParam,
          first_name: filter?.first_name,
          second_name: filter?.second_name,
          third_name: search || undefined,
          last_name: filter?.last_name,
          Place_of_residence: filter?.Place_of_residence,
          electoral_district: filter?.electoral_district,
          gender: filter?.gender,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    staleTime: 24 * 60 * 60 * 1000,
    retry: false,
    initialPageParam: 1,
  });
};

export const useGetLastNameDropdown = (search?: string) => {
  const { filter } = useFilterStore();
  const api = new APIClient<GetDropDown>(`${url}/last_name`);
  return useInfiniteQuery<ListPageinated<GetDropDown>, Error>({
    queryKey: [
      "last_name_dropdown",
      search,
      filter?.first_name,
      filter?.second_name,
      filter?.third_name,
      filter?.Place_of_residence,
      filter?.electoral_district,
      filter?.gender,
    ],
    queryFn: ({ pageParam = 1 }) =>
      api.getPageintaed({
        params: {
          page: pageParam,
          first_name: filter?.first_name,
          second_name: filter?.second_name,
          third_name: filter?.third_name,
          Place_of_residence: filter?.Place_of_residence,
          last_name: search || undefined,
          electoral_district: filter?.electoral_district,
          gender: filter?.gender,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
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
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    staleTime: 24 * 60 * 60 * 1000,
    retry: false,
    initialPageParam: 1,
  });
};

export const useGetBoxesDropdown = (circlesData: any, search?: string) => {
  const api = new APIClient<GetDropDown>(
    `data/voting_center/boxes?voting_center=[${circlesData ? circlesData.map((item: any) => `"${item}"`).join(",") : ""}]`,
  );
  return useInfiniteQuery<ListPageinated<GetDropDown>, Error>({
    queryKey: ["boxes_dropdown", search],
    queryFn: ({ pageParam = 1 }) =>
      api.getPageintaed({
        params: {
          page: pageParam,
          last_name: search || undefined,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    staleTime: 24 * 60 * 60 * 1000,
    retry: false,
    initialPageParam: 1,
  });
};

export const useGetplaceOfResidenceDropdown = (search?: string) => {
  const { filter } = useFilterStore();
  const api = new APIClient<GetDropDown>(`${url}/place_of_residence`);
  return useInfiniteQuery<ListPageinated<GetDropDown>, Error>({
    queryKey: [
      "place_of_residence_dropdown",
      search,
      filter?.first_name,
      filter?.second_name,
      filter?.third_name,
      filter?.last_name,
      filter?.electoral_district,
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
          Place_of_residence: search || undefined,
          electoral_district: filter?.electoral_district,
          gender: filter?.gender,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
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
      filter?.Place_of_residence,
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
          Place_of_residence: filter?.Place_of_residence,
          gender: filter?.gender,
          electoral_district: search || undefined,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    staleTime: 24 * 60 * 60 * 1000,
    retry: false,
    initialPageParam: 1,
  });
};

// todo: to be removed
// export const useGetMainManadeebDropdown = () => {
//   const api = new APIClient<GetDropDown>("account/manadeeb/dropdown/main");
//   return useQuery({
//     queryKey: ["GetMainMandoobDropdown"],
//     queryFn: () => api.getList(),
//   });
// };

// export const useGetHarakaManadeebDropdown = () => {
//   const api = new APIClient<GetDropDown>("account/manadeeb/dropdown/haraka");
//   return useQuery({
//     queryKey: ["GetHarakaMandoobDropdown"],
//     queryFn: () => api.getList(),
//   });
// };

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
export const useGetBoxesDropDown2 = (votingCenter: number) => {
  const api = new APIClient<GetDropDown>(
    `account/box_list?voting_center_id=${votingCenter}`,
  );
  return useQuery({
    queryKey: ["GetBoxesDropDown2", votingCenter],
    queryFn: () =>
      api.getList({
        params: {
          voting_center: votingCenter,
        },
      }),
    enabled: !!votingCenter,
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
