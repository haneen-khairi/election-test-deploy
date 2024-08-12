/* eslint-disable @typescript-eslint/no-explicit-any */
import APIClient from "@services/api";
import useListsStore from "@store/ListsStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useGetCosts = () => {
  const api = new APIClient<any>("expense/costs");
  return useQuery({
    queryKey: ["Costs"],
    queryFn: () => api.getList(),
  });
};

export const useGetProcessedLists = ({
  key,
  selectedFile,
  isAll = false,
}: {
  key: "found_in_voters" | "not_found" | "found_with_mandoub_main";
  selectedFile: File | null;
  isAll?: boolean;
}) => {
  const api = new APIClient<any>("candidate/my_lists/upload-excel/", true);
  const { page1, page2, page3 } = useListsStore();

  const pageData = useMemo(() => {
    if (key === "found_in_voters") return page1;
    else if (key === "not_found") return page2;
    return page3;
  }, [key, page1, page2, page3]);

  const formData = new FormData();
  selectedFile && formData.append("file", selectedFile);

  const extra = isAll
    ? {
        return: "all",
      }
    : {};

  return useQuery({
    queryKey: ["Supporters", pageData, key, isAll],
    queryFn: () =>
      api.postPageintaed(formData, {
        params: {
          key,
          page: pageData,
          page_size: 6,
          ...extra,
        },
      }),
    placeholderData: keepPreviousData,
  });
};
