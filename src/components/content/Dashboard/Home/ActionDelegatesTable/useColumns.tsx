/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useMemo } from "react";
import { Box, Text } from "@chakra-ui/react";
import { CellValue } from "react-table";

const useColumns = ({ filter, setFilter }: { setFilter: any; filter: any }) => {
  const getTotal = (
    num1: string | number | undefined,
    num2: string | number | undefined,
  ): number => {
    if ((num1 || num1 === 0) && (num2 || num2 === 0))
      return Number(num1) + Number(num2);

    return 0;
  };

  const getColor = useCallback(
    (id: string): string => {
      if (
        !filter?.mandoubHarakaName ||
        (filter?.mandoubHarakaName && filter?.mandoubHarakaName === id)
      ) {
        return "#000";
      }

      return "#aaaaaa";
    },
    [filter?.mandoubHarakaName],
  );

  const columns = useMemo(
    () => [
      {
        Header: "إسم المندوب الرئيسي",
        Cell: ({ cell }: CellValue) => {
          return (
            <Box
              cursor="pointer"
              color={getColor(cell?.row?.original?.name)}
              onClick={() => {
                setFilter((prev: any) => ({
                  ...prev,
                  mandoub_haraka: cell?.row?.original?.name,
                  mandoubHarakaName: cell?.row?.original?.name,
                }));
              }}
            >
              <Text color="mPrimary" fontWeight="600" noOfLines={1}>
                {cell.row.original.name}
              </Text>
            </Box>
          );
        },
      },
      {
        Header: "عدد الأصوات",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text
              color={getColor(cell?.row?.original?.name)}
              fontWeight="600"
              noOfLines={1}
            >
              {getTotal(
                cell.row.original.is_voted,
                cell.row.original.is_not_voted,
              )}
            </Text>
          );
        },
      },
      {
        Header: "تم التصويت",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text
              color={getColor(cell?.row?.original?.name)}
              fontWeight="600"
              noOfLines={1}
            >
              {cell.row.original.is_voted}
            </Text>
          );
        },
      },
      {
        Header: "لم يتم التصويت",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text
              color={getColor(cell?.row?.original?.name)}
              fontWeight="600"
              noOfLines={1}
            >
              {cell.row.original.is_not_voted}
            </Text>
          );
        },
      },
    ],
    [filter],
  );

  return { columns };
};

export default useColumns;
