/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import APIClient from "@services/api";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import {
  Candidate,
  GuaranteedVoters,
  TopFamilies,
  TransportationInsight,
  VoterPercentage,
} from "./Insights";
import useDashboardFilter from "@store/DashboardFilter";
import { FilterType } from "@components/content/Dashboard/PreliminaryResults/FilterSection/FilterType";
import usePreliminaryStore from "@store/PreliminaryStore";
import useTransportationStore from "@store/TransportationStore";
import filterSelections from "@services/utils/filterSelecttions";

export const useGetVotersPercentage = () => {
  const { filter } = useDashboardFilter();
  const api = new APIClient<VoterPercentage>(`data/voters/percentage`);
  return useQuery({
    queryKey: ["VotersPercentage", filter],
    queryFn: () =>
      api.getItem({
        params: {
          ...filter,
        },
      }),
  });
};

export const useGetTopFamilies = (filter: any) => {
  const api = new APIClient<TopFamilies>(
    `statistic/voters_number/top_families`,
  );
  const { last_name, ...rest } = filter;

  return useQuery({
    queryKey: ["TopFamilies", rest],
    queryFn: () =>
      api.getList({
        params: {
          ...filterSelections(rest),
        },
      }),
  });
};

export const useGetCandidates = (id: string) => {
  const { page } = usePreliminaryStore();
  const api = new APIClient<Candidate>(`account/candidates-by-box/${id}`);

  return useQuery({
    queryKey: ["CandidatesData", id],
    queryFn: () =>
      api.getPageintaed({
        params: {
          page: page,
        },
      }),
    placeholderData: keepPreviousData,
  });
};

export const useGetCandidatesPN = (filter?: FilterType) => {
  const api = new APIClient<Candidate>("account/candidates/all");
  return useQuery({
    queryKey: ["CandidatesPN", filter],
    queryFn: () =>
      api.getPageintaed({
        params: {
          voting_center: filter?.voting_center,
          box_id: filter?.box_id,
        },
      }),
    placeholderData: keepPreviousData,
  });
};

export const useExportFamilies = () => {
  const api = new APIClient("data/top/families/excel");
  return useMutation({
    mutationFn: api.export,
    onSuccess: () => {
      return "Exported";
    },
    onError: (error) => {
      if (error) return error;
    },
  });
};

export const useExportCandidates = () => {
  const api = new APIClient("account/candidates/export");
  return useMutation({
    mutationFn: api.export,
    onSuccess: () => {
      return "Exported";
    },
    onError: (error) => {
      if (error) return error;
    },
  });
};

export const useGetTransportationInsight = (filter?: FilterType) => {
  const api = new APIClient<TransportationInsight>("account/insights/harakeh");
  return useQuery({
    queryKey: ["TransportationInsights", filter],
    queryFn: () =>
      api.getItem({
        params: {
          voting_center: filter?.voting_center,
          box_id: filter?.box_id,
        },
      }),
  });
};

export const useGetGuaranteedVoters = (filter?: FilterType) => {
  const { page } = useTransportationStore();
  const api = new APIClient<GuaranteedVoters>("account/sure/voters");
  return useQuery({
    queryKey: ["GuaranteedVoters", page, filter],
    queryFn: () =>
      api.getPageintaed({
        params: {
          page: page,
          voting_center: filter?.voting_center,
          box_id: filter?.box_id,
        },
      }),
    placeholderData: keepPreviousData,
  });
};
