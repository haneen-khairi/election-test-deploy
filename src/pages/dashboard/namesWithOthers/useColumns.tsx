/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo } from "react";
import { Text } from "@chakra-ui/react";
import { CellValue } from "react-table";
import { formatDateTime } from "@services/utils";

const useColumns = (page: number) => {
  const columns = useMemo(
    () => [
      {
        Header: "إسم الناخب",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text color="mPrimary" fontWeight="600" noOfLines={1}>
              {cell.row.original.name}
            </Text>
          );
        },
      },
      {
        Header: "المندوب الحالي",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text color="mPrimary" fontWeight="600" noOfLines={1}>
              {cell.row.original.existing_mandoub_name}
            </Text>
          );
        },
      },
      {
        Header: "المندوب المكرر",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text color="mPrimary" fontWeight="600" noOfLines={1}>
              {cell.row.original.incoming_mandoub_name}
            </Text>
          );
        },
      },
      {
        Header: "التاريخ و الوقت",
        Cell: ({ cell }: CellValue) => {          
          const dateTime = new Date(cell.row.original.created_at.slice(0, 19));

          return (
            <Text fontWeight="600" noOfLines={1}>
              {formatDateTime(new Date(dateTime), " ", true)}
            </Text>
          );
        },
      },
    ],
    [page],
  );

  return { columns };
};

export default useColumns;
