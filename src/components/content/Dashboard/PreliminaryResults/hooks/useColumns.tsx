import { useMemo } from "react";
import { Avatar, HStack, Text, WrapItem } from "@chakra-ui/react";
import { CellValue } from "react-table";

const useColumns = () => {
  const columns = useMemo(
    () => [
      {
        Header: "اسم المرشح",
        Cell: ({ cell }: CellValue) => {
          const name = cell.row.original?.name;
          const image = cell.row.orginal?.image || "";
          return (
            <HStack>
              <WrapItem>
                <Avatar size="sm" src={image} />
              </WrapItem>
              <Text fontWeight="700">{name}</Text>
            </HStack>
          );
        },
      },
      {
        Header: "عدد الأصوات",
        Cell: ({ cell }: CellValue) => {
          const total_votes = cell.row.original?.vote_count || 0;
          return (
            <Text color="primary.200">
              {total_votes + " "}
              <Text as="span">صوت</Text>
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
