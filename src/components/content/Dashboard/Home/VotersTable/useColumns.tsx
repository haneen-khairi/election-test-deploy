/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useState } from "react";
import {
  Box,
  Button,
  HStack,
  Text,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import { ShowTime } from "@constants/functions/ShowTime";
import { truncateText } from "@constants/functions/TruncateText";
import { CellValue } from "react-table";
import { CheckBox } from "@components/core";
import { EditPenIcon, TrashIcon } from "@assets/icons";

interface Props {
  edit: UseDisclosureReturn;
  remove: UseDisclosureReturn;
}

const useColumns = ({ edit, remove }: Props) => {
  const [checkedRows, setCheckedRows] = useState<number[]>([]);
  const [recordID, setRecordID] = useState<number>();

  const handleCheckboxChange = (id: number) => {
    if (checkedRows.includes(id)) {
      setCheckedRows(checkedRows.filter((rowId) => rowId !== id));
    } else {
      setCheckedRows([...checkedRows, id]);
    }
  };

  const getDotColor = (status: number | undefined | null): string => {
    if (!status) return "#9F9F9F";
    if (status === 100) return "#EEB72A";
    if (status === 80) return "#1C8FA6";
    if (status === 60) return "#50B698";
    if (status === 40) return "#EE882A";
    if (status === 20) return "#e80000";

    return "#9F9F9F";
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
            <HStack justifyContent="flex-start">
              <Box
                w="10px"
                h="10px"
                borderRadius="100%"
                bg={getDotColor(cell.row.original.status)}
              />
              <Text color="mPrimary" fontWeight="600" noOfLines={1}>
                {truncateText(
                  `${cell.row.original.first_name} ${cell.row.original.second_name} ${cell.row.original.third_name} ${cell.row.original.last_name}`,
                  150,
                )}
              </Text>
            </HStack>
          );
        },
      },
      {
        Header: "المندوب الرئيسي",
        accessor: "mandoub_main",
      },
      {
        Header: "مندوب الحركة",
        accessor: "mandoub_haraka",
      },
      {
        Header: "مكان الإنتخاب",
        accessor: "place_of_residence",
      },
      {
        Header: "صندوق رقم",
        accessor: "box",
      },
      {
        Header: "وقت الإنتخاب",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text>{ShowTime(cell.row.original.election_time) || "-"}</Text>
          );
        },
      },
      {
        Header: "  ",
        Cell: ({ cell }: CellValue) => {
          const id = cell.row.original.id;
          return (
            <HStack justifyContent="center" gap="20px">
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
                  edit.onOpen();
                }}
              >
                <EditPenIcon />
              </Box>

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
    [checkedRows, edit, handleCheckboxChange],
  );

  return { columns, checkedRows, recordID, setCheckedRows };
};

export default useColumns;
