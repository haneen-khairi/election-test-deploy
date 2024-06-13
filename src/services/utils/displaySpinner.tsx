/* eslint-disable @typescript-eslint/no-explicit-any */
import { Spinner } from "@chakra-ui/react";
import { ReactNode } from "react";

export const displaySpinner = (
  data: any,
  isLoading: boolean = false,
  emptyState: ReactNode = "No data",
) => {
  if (isLoading) return <Spinner />;

  if (data || data === 0) {
    return data;
  } else {
    return emptyState;
  }
};
