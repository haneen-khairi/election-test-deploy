/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo } from "react";
import {
  Box,
  Button,
  HStack,
  Text,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import { CellValue } from "react-table";
import { CheckBox } from "@components/core";
import { TrashIcon } from "@assets/icons";

interface Props {
  remove: UseDisclosureReturn;
}

const useColumns = ({ remove }: Props) => {
  const [checkedRows, setCheckedRows] = useState<string[]>([]);
  const [recordID, setRecordID] = useState<string>();

  const getDotColor = (status: number | string | undefined | null): string => {
    if (!status) return "#9F9F9F";

    const stringStatus = String(status);
    if (stringStatus === "100") return "#EEB72A";
    if (stringStatus === "80") return "#1C8FA6";
    if (stringStatus === "60") return "#50B698";
    if (stringStatus === "40") return "#EE882A";
    if (stringStatus === "20") return "#e80000";

    return "#9F9F9F";
  };

  const handleCheckboxChange = (id: string) => {
    if (checkedRows.includes(id)) {
      setCheckedRows(checkedRows.filter((rowId) => rowId !== id));
    } else {
      setCheckedRows([...checkedRows, id]);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: " ",
        Cell: ({ cell }: CellValue) => {
          const id = cell.row.original.id;
          return (
            <CheckBox
              checked={checkedRows.includes(id)}
              onChange={() => handleCheckboxChange(id)}
            />
          );
        },
      },
      {
        Header: "الإسم",
        Cell: ({ cell }: CellValue) => {
          return (
            <HStack justifyContent="center">
              <Box
                w="10px"
                h="10px"
                borderRadius="100%"
                bg={getDotColor(cell.row.original.persentage)}
              />
              <Text fontWeight="600">
                {`${cell.row.original.voter.first_name} ${cell.row.original.voter.second_name} ${cell.row.original.voter.third_name} ${cell.row.original.voter.last_name}`}{" "}
              </Text>
            </HStack>
          );
        },
      },
      {
        Header: "اسم المؤازر",
        accessor: "name_almoazer",
      },
      {
        Header: "الدائرة",
        Cell: ({ cell }: CellValue) => {
          return <Text>{cell.row.original.voter.electoral_district_name}</Text>;
        },
      },
      {
        Header: "صندوق رقم",
        accessor: "voter.box_name",
      },
      {
        Header: "التكرار",
        Cell: ({ cell }: CellValue) => {
          return <Text>{cell.row.original.voter_count}</Text>;
        },
      },
      {
        Header: "  ",
        Cell: ({ cell }: CellValue) => {
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
                  setRecordID(cell.row.original.id);
                  remove.onOpen();
                }}
              >
                <TrashIcon />
              </Box>
            </HStack>
          );
        },
      },
    ],
    [checkedRows, remove, handleCheckboxChange],
  );

  return { columns, checkedRows, recordID, setCheckedRows };
};

export default useColumns;
