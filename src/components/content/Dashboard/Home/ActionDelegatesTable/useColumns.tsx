/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo } from "react";
import { Text } from "@chakra-ui/react";
import { CellValue } from "react-table";

const useColumns = () => {
  const columns = useMemo(
    () => [
      {
        Header: "إسم مندوب الحركة",
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
        Cell: () => {
          return (
            <Text color="mPrimary" fontWeight="600" noOfLines={1}>
              [number]
            </Text>
          );
        },
      },
      {
        Header: "تم التصويت",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text color="mPrimary" fontWeight="600" noOfLines={1}>
              {cell.row.original.is_voted}
            </Text>
          );
        },
      },
      {
        Header: "لم يتم التصويت",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text color="mPrimary" fontWeight="600" noOfLines={1}>
              {cell.row.original.is_not_voted}
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
