/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { Text } from "@chakra-ui/react";
import { CellValue } from "react-table";
import { formatDateTime } from "@services/utils";

const useExpensesColumns = () => {
  const expensesColumns = useMemo(
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
        Header: "نوع المصروف",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text fontWeight="600" noOfLines={1}>
              {cell.row.original?.type}
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
      {
        Header: "الفاتورة",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text fontWeight="600" noOfLines={1}>
              {cell.row.original?.amount}
            </Text>
          );
        },
      },
    ],
    [],
  );

  return { expensesColumns };
};

export default useExpensesColumns;
