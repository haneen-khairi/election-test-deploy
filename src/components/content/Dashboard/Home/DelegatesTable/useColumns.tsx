/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo } from "react";
import { Box, Text } from "@chakra-ui/react";
import { CellValue } from "react-table";

const useColumns = ({ filter, setFilter }: { filter: any; setFilter: any }) => {
  const getColor = useCallback(
    (id: string): string => {
      if (
        !filter?.mainMandoubId ||
        (filter?.mainMandoubId && filter?.mainMandoubId === id)
      ) {
        return "#000";
      }

      return "#aaaaaa";
    },
    [filter?.mainMandoubId],
  );

  const columns = useMemo(
    () => [
      {
        Header: "الإسم",
        Cell: ({ cell }: CellValue) => {
          return (
            <Box
              cursor="pointer"
              color={getColor(cell?.row?.original?.mandoub_id)}
              onClick={() => {
                setFilter((prev: any) => ({
                  ...prev,
                  mandoub_main: cell?.row?.original?.mandoub_id,
                  mainMandoubId: cell?.row?.original?.mandoub_id,
                }));
              }}
            >
              <Text color="mPrimary" fontWeight="600" noOfLines={1}>
                {cell?.row?.original?.name}
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
              color={getColor(cell?.row?.original?.mandoub_id)}
              fontWeight="600"
              noOfLines={1}
            >
              {cell?.row?.original?.count}
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
