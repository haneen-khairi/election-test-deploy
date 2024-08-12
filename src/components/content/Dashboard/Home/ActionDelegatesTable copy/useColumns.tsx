import { useMemo } from "react";
import { Text } from "@chakra-ui/react";
import { truncateText } from "@constants/functions/TruncateText";
import { CellValue } from "react-table";

const useColumns = () => {
  const columns = useMemo(
    () => [
      {
        Header: "إسم مندوب الحركة",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text color="mPrimary" fontWeight="600" noOfLines={1}>
              {truncateText(cell.row.original.name, 150)}
            </Text>
          );
        },
      },
      {
        Header: "عدد الأصوات",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text color="mPrimary" fontWeight="600" noOfLines={1}>
              {cell.row.original.count}
            </Text>
          );
        },
      },
      {
        Header: "تم التصويت",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text color="mPrimary" fontWeight="600" noOfLines={1}>
              {cell.row.original.count}
            </Text>
          );
        },
      },
      {
        Header: "لم يتم التصويت",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text color="mPrimary" fontWeight="600" noOfLines={1}>
              {cell.row.original.count}
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
