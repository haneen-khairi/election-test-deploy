/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo } from "react";
import { Text } from "@chakra-ui/react";
import { CellValue } from "react-table";

const useColumns = () => {
  const columns = useMemo(
    () => [
      {
        Header: "إسم المندوب",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text color="mPrimary" fontWeight="600" noOfLines={1}>
              {cell.row.original.name}
            </Text>
          );
        },
      },
      {
        Header: "عدد الأصوات",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text color="mPrimary" fontWeight="600" noOfLines={1}>
              [number]
            </Text>
          );
        },
      },
      {
        Header: "تم التوصيل",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text color="mPrimary" fontWeight="600" noOfLines={1}>
              {cell.row.original.delivered_count}
            </Text>
          );
        },
      },
      {
        Header: "لم يتم التوصيل",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text color="mPrimary" fontWeight="600" noOfLines={1}>
              {cell.row.original.not_delivered_count}
            </Text>
          );
        },
      },
    ],
    [],
  );

  return { columns };
};

export default useColumns;
