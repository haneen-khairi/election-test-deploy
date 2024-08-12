import { useState, useMemo } from "react";
import {
  Box,
  Button,
  HStack,
  Text,
  UseDisclosureReturn,
} from "@chakra-ui/react";

import { BsFillTrashFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { CellValue } from "react-table";
import { ShowTime } from "@constants/functions/ShowTime";
import { convertToArabicDate } from "@constants/functions/ShowDate";

interface Props {
  edit: UseDisclosureReturn;
  alert: UseDisclosureReturn;
}

const useColumns = ({ edit, alert }: Props) => {
  const [recordID, setRecordID] = useState<string>();

  const columns = useMemo(
    () => [
      {
        Header: "الإسم",
        accessor: "name",
      },
      {
        Header: "النوع",
        Cell: ({ cell }: CellValue) => {
          const name = cell.row.original.cost.name;
          return (
            <Text fontWeight="700" color="primary.200">
              {name}
            </Text>
          );
        },
      },
      {
        Header: "الوقت والتاريخ",
        Cell: ({ cell }: CellValue) => {
          const date = cell.row.original.date;
          const time = cell.row.original.time;
          return (
            <Text>{ShowTime(time) + "," + convertToArabicDate(date)}</Text>
          );
        },
      },
      {
        Header: "المبلغ",
        Cell: ({ cell }: CellValue) => {
          const amount = cell.row.original.amount;
          return <Text>{`${amount} دينار`}</Text>;
        },
      },
      {
        Header: "اجراءات",
        Cell: ({ cell }: CellValue) => {
          const id = cell.row.original.id;
          return (
            <HStack justifyContent="flex-end">
              <Box
                as={Button}
                size="xs"
                rounded="full"
                px="0"
                variant="ghost"
                fontSize="15px"
                color="primary.500"
                onClick={() => {
                  setRecordID(id);
                  edit.onOpen();
                }}
              >
                <MdEdit />
              </Box>

              <Box
                as={Button}
                size="xs"
                rounded="full"
                px="0"
                variant="ghost"
                fontSize="15px"
                color="danger.200"
                onClick={() => {
                  setRecordID(id);
                  alert.onOpen();
                }}
              >
                <BsFillTrashFill />
              </Box>
            </HStack>
          );
        },
      },
    ],
    []
  );

  return { columns, recordID };
};

export default useColumns;
