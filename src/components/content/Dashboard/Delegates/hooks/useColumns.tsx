/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo } from "react";
import { Box, Button, Text, UseDisclosureReturn } from "@chakra-ui/react";

import { MdEdit } from "react-icons/md";
import { CellValue } from "react-table";

interface Props {
  edit: UseDisclosureReturn;
  alert: UseDisclosureReturn;
}

const useColumns = ({ edit }: Props) => {
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
          const name = cell.row.original.group.name;
          return (
            <Text fontWeight="700" color="primary.200">
              {name}
            </Text>
          );
        },
      },
      {
        Header: "المنطقة",
        Cell: ({ cell }: CellValue) => {
          const data = cell.row.original.place_of_residence;
          return (
            <Text>
              {data?.map(
                (item: { id: string; name: string }, index: number) => (
                  <React.Fragment key={item.id}>
                    {item.name}
                    {index !== data?.length - 1 && ", "}
                  </React.Fragment>
                ),
              )}
            </Text>
          );
        },
      },
      {
        Header: "اجراءات",
        Cell: ({ cell }: CellValue) => {
          const id = cell.row.original.id;
          return (
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
          );
        },
      },
    ],
    [],
  );

  return { columns, recordID };
};

export default useColumns;
