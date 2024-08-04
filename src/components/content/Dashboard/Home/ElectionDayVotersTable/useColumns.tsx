/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useState } from "react";
import { Box, HStack, Text, UseDisclosureReturn } from "@chakra-ui/react";
import { truncateText } from "@constants/functions/TruncateText";
import { CellValue } from "react-table";

interface Props {
  edit: UseDisclosureReturn;
  remove: UseDisclosureReturn;
}

const useColumns = ({ edit }: Props) => {
  const [checkedRows, setCheckedRows] = useState<string[]>([]);
  const [recordID, _setRecordID] = useState<string>();

  const getDotColor = (status: number | undefined | null): string => {
    if (!status) return "#9F9F9F";
    if (status === 100) return "#EEB72A";
    if (status === 80) return "#1C8FA6";
    if (status === 60) return "#50B698";
    if (status === 40) return "#EE882A";
    if (status === 20) return "#e80000";

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
        Header: "حالة التوصيل",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text color="mPrimary" fontWeight="600" noOfLines={1}>
              {cell.row.original.delivery_status === "1"
                ? "تم التوصيل"
                : "لم يتم التوصيل"}
            </Text>
          );
        },
      },
      {
        Header: "حالة التصويت",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text color="mPrimary" fontWeight="600" noOfLines={1}>
              {cell.row.original.is_voted ? "تم التصويت" : "لم يتم التصويت"}
            </Text>
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
        Header: "مركز الأقتراع",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text color="mPrimary" noOfLines={1}>
              {truncateText(cell.row.original.school || "", 150)}
            </Text>
          );
        },
      },
      {
        Header: "صندوق",
        accessor: "box",
      },
    ],
    [checkedRows, edit, handleCheckboxChange],
  );

  return { columns, checkedRows, setCheckedRows, recordID };
};

export default useColumns;
