/* eslint-disable @typescript-eslint/no-explicit-any */
import APIClient from "@services/api";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import {
  Candidate,
  GeneralStats,
  GuaranteedVoters,
  TopFamilies,
  TransportationInsight,
  VoterPercentage,
} from "./Insights";
import useDashboardFilter from "@store/DashboardFilter";
import { FilterType } from "@components/content/Dashboard/PreliminaryResults/FilterSection/FilterType";
import usePreliminaryStore from "@store/PreliminaryStore";
import useTransportationStore from "@store/TransportationStore";

export const useGetVotersPercentage = () => {
  const { filter } = useDashboardFilter();
  const api = new APIClient<VoterPercentage>(`data/voters/percentage`);
  return useQuery({
    queryKey: ["VotersPercentage", filter?.last_name],
    queryFn: () =>
      api.getItem({
        params: {
          last_name: filter?.last_name,
        },
      }),
  });
};

export const useGetGeneralStats = (filter: any) => {
  const api = new APIClient<GeneralStats>(`data/general/stats`);
  return useQuery({
    queryKey: ["GeneralStats", filter?.last_name],
    queryFn: () =>
      api.getItem({
        params: {
          last_name: filter?.last_name,
        },
      }),
  });
};

export const useGetTopFamilies = (filter: any) => {
  const api = new APIClient<TopFamilies>(`data/top/families`);
  return useQuery({
    queryKey: ["TopFamilies", filter],
    queryFn: () =>
      api.getList({
        params: {
          ...filter,
        },
      }),
  });
};

export const useGetCandidates = (filter?: FilterType) => {
  const { page } = usePreliminaryStore();
  const api = new APIClient<Candidate>("account/candidates/all");
  return useQuery({
    queryKey: ["Candidates", page, filter],
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
