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

// export const useDownloadContent = (url: string) => {
//   const downloadUrl = new APIClient<any>(url, true);

//   return useMutation({
//     mutationFn: async () => {
//       const response = await downloadUrl.export({
//         params: {
//           myvote: true,
//           export: "excel",
//         },
//       });
//       return response;
//     },
//     onError: (error: Error) => {
//       if (error) return error;
//     },
//   });
// };

export const useDownloadContent = (url: string) => {
  const api = new APIClient<any>(`${url}?myvote=true&export=excel`, true);

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
