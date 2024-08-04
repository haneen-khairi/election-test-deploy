import { useMemo } from "react";
import { HStack, Text } from "@chakra-ui/react";
import { CellValue } from "react-table";
import { formatDateTime } from "@services/utils";

const useColumns = () => {
  const columns = useMemo(
    () => [
      {
        Header: "من حساب رئيسي",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text fontWeight="600" noOfLines={1}>
              {cell.row.original.from_account?.name || "---"}
            </Text>
          );
        },
      },
      {
        Header: "القيمة",
        Cell: ({ cell }: CellValue) => {
          return (
            <HStack
              justifyContent="center"
              fontWeight="bold"
              fontSize="18px"
              color={cell.row.original.is_in ? "#1AAD4C" : "#D62C2C"}
            >
              <Text>JOD</Text>
              <Text>{cell.row.original.amount}</Text>
              <Text>{cell.row.original.is_in ? "+" : "-"}</Text>
            </HStack>
          );
        },
      },
      {
        Header: "التاريخ والوقت",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text fontWeight="600" noOfLines={1}>
              {formatDateTime(cell.row.original.date, cell.row.original.time)}
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
