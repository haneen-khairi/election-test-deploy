/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { Text } from "@chakra-ui/react";
import { CellValue } from "react-table";
import { formatDateTime } from "@services/utils";

const useIncomeColumns = () => {
  const incomeColumns = useMemo(
    () => [
      {
        Header: "من حساب رئيسي",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text fontWeight="600" noOfLines={1}>
              {cell.row.original?.from_main_account}
            </Text>
          );
        },
      },
      {
        Header: "من حساب فرعي ",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text fontWeight="600" noOfLines={1}>
              {cell.row.original?.from_sub_account}
            </Text>
          );
        },
      },
      {
        Header: "الى حساب رئيسي",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text fontWeight="600" noOfLines={1}>
              {cell.row.original?.to_main_account}
            </Text>
          );
        },
      },
      {
        Header: "الى حساب فرعي ",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text fontWeight="600" noOfLines={1}>
              {cell.row.original?.to_sub_account}
            </Text>
          );
        },
      },
      {
        Header: "القيمة",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text fontWeight="600" noOfLines={1}>
              {cell.row.original?.amount}
            </Text>
          );
        },
      },
      {
        Header: "التاريخ والوقت",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text fontWeight="600" noOfLines={1}>
              {formatDateTime(cell.row.original?.date, cell.row.original?.time)}
            </Text>
          );
        },
      },
    ],
    [],
  );

  return { incomeColumns };
};

export default useIncomeColumns;
