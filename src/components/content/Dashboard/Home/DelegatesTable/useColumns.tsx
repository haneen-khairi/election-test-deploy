import { useMemo } from "react";
import { Text } from "@chakra-ui/react";
import { CellValue } from "react-table";

const useColumns = () => {
  const columns = useMemo(
    () => [
      {
        Header: "الإسم",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text color="mPrimary" fontWeight="600" noOfLines={1}>
              {cell?.row?.original?.name}
            </Text>
          );
        },
      },
      {
        Header: "عدد الأصوات",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text color="mPrimary" fontWeight="600" noOfLines={1}>
              {cell?.row?.original?.count}
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
