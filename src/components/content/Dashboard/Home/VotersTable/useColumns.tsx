/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useState } from "react";
import {
  Box,
  Button,
  HStack,
  Text,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import { truncateText } from "@constants/functions/TruncateText";
import { CellValue } from "react-table";
import { CheckBox } from "@components/core";
import { IoQrCode } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

interface Props {
  edit: UseDisclosureReturn;
  remove: UseDisclosureReturn;
}

const useColumns = ({ edit }: Props) => {
  const [checkedRows, setCheckedRows] = useState<string[]>([]);
  const [recordID, setRecordID] = useState<string>();

  const handleCheckboxChange = (id: string) => {
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
        Header: "  ",
        Cell: ({ cell }: CellValue) => {
          // const id = cell.row.original.id;
          return (
            <HStack>
              <Button
                as={Button}
                size="xs"
                rounded="full"
                px="0"
                variant="ghost"
                color="primary.500"
                disabled={!cell.row.original.qr_code_key}
                onClick={() => {
                  if (!cell.row.original.qr_code_key) return;

                  const url = new URL(
                    `/qr/${cell.row.original.qr_code_key}`,
                    window.location.origin,
                  );
                  window.open(url.toString(), "_blank");
                }}
              >
                <IoQrCode size={16} />
              </Button>

              <Box
                as={Button}
                size="xs"
                rounded="full"
                px="0"
                variant="ghost"
                color="primary.500"
                onClick={() => {
                  setRecordID(cell.row.original.id);
                  edit.onOpen();
                }}
              >
                <MdEdit size={20} />
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
