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
          const dateTime = new Date(cell.row.original.created_at);
          const [date, time] = dateTime.toLocaleString().split(",");
          const [_space, timeString, _period] = time.split(" ");

          return (
            <Text fontWeight="600" noOfLines={1}>
              {formatDateTime(new Date(date), timeString.trim(), true)}
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
