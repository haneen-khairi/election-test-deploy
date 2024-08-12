/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import APIClient from "@services/api";
import { useMutation } from "@tanstack/react-query";

export const useDownloadMyLists = () => {
  const api = new APIClient("candidate/my_lists/template-excel/");

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

export const useDownloadContent = ({
  url,
  filter,
  myvote = false,
  isExport
}: {
  url: string;
  filter: any;
  myvote?: boolean;
  isExport?: boolean;
}) => {
  const api = new APIClient<any>(url, true);
  const extra: any = {};

  myvote && (extra.myvote = true);
  isExport && (extra.export = "excel");

  return useMutation({
    mutationFn: async ({ body }: { body?: any[] }) => {
      const res =
        body?.length && body?.length > 0
          ? api.exportPost({}, body)
          : api.export({
              params: {
                ...extra,
                ...filter,
              },
            });

      return res;
    },
    onSuccess: () => {
      return "Exported";
    },
    onError: (error) => {
      if (error) return error;
    },
  });
};
