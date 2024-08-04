/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useMemo } from "react";
import { Box, Text } from "@chakra-ui/react";
import { CellValue } from "react-table";

const useColumns = ({
  setFilter,
  withCharts,
  filter,
}: {
  withCharts: boolean;
  filter: any;
  setFilter: any;
}) => {
  const getColor = useCallback(
    (id: string): string => {
      if (
        !filter?.placeBasedVotesId ||
        (filter?.placeBasedVotesId && filter?.placeBasedVotesId === id)
      ) {
        return "#000";
      }

      return "#aaaaaa";
    },
    [filter?.placeBasedVotesId],
  );

  const columns = useMemo(() => {
    const arr = [
      {
        Header: "المنطقة",
        Cell: ({ cell }: CellValue) => {
          return (
            <Box
              cursor="pointer"
              color={getColor(cell?.row?.original?.id)}
              onClick={() => {
                setFilter((prev: any) => ({
                  ...prev,
                  place_of_residence: cell?.row?.original?.id,
                  placeBasedVotesId: cell?.row?.original?.id,
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
        Header: "عدد الأصوات الكلي",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text
              color={getColor(cell?.row?.original?.id)}
              fontWeight="600"
              noOfLines={1}
            >
              {cell.row.original.voted_count +
                cell.row.original.not_voted_count}
            </Text>
          );
        },
      },
    ];

    if (withCharts)
      arr.push({
        Header: "نسبة التصويت",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text
              color={getColor(cell?.row?.original?.id)}
              fontWeight="600"
              noOfLines={1}
            >
              {(
                (cell.row.original.voted_count /
                  ((cell.row.original.voted_count || 0) +
                    (cell.row.original.not_voted_count || 0))) *
                100
              ).toFixed(1)}
              %
            </Text>
          );
        },
      });

    return arr;
  }, [filter]);

  return { columns };
};

export default useColumns;
