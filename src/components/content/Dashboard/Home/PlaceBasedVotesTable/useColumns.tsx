import { useMemo } from "react";
import { Text } from "@chakra-ui/react";
import { CellValue } from "react-table";

const useColumns = (withCharts: boolean) => {
  const columns = useMemo(() => {
    const arr = [
      {
        Header: "المنطقة",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text color="mPrimary" fontWeight="600" noOfLines={1}>
              {cell.row.original.name}
            </Text>
          );
        },
      },
      {
        Header: "عدد الأصوات الكلي",
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
    ];

    if (withCharts)
      arr.push({
        Header: "نسبة التصويت",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text color="mPrimary" fontWeight="600" noOfLines={1}>
              {cell.row.original.count}
            </Text>
          );
        },
      });

    return arr;
  }, []);

  return { columns };
};

export default useColumns;
