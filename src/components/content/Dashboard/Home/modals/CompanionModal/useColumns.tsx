/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo } from "react";
import { Button, Text, useToast } from "@chakra-ui/react";
import { CellValue } from "react-table";
import { CheckBox } from "@components/core";
import { FaRegCopy } from "react-icons/fa";
import { EToast } from "@constants/functions/toast";

const useColumns = () => {
  const [checkedRows, setCheckedRows] = useState<string[]>([]);
  const toast = useToast();

  const handleCheckboxChange = (id: string) => {
    if (checkedRows.includes(id)) {
      setCheckedRows(checkedRows.filter((rowId) => rowId !== id));
    } else {
      setCheckedRows([...checkedRows, id]);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: " ",
        Cell: ({ cell }: CellValue) => {
          const id = cell.row.original.token;
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
            <Text color="mPrimary" fontWeight="600" noOfLines={1}>
              {cell.row.original.name}
            </Text>
          );
        },
      },
      {
        Header: "الرابط",
        Cell: ({ cell }: CellValue) => {
          return (
            <Button
              onClick={() => {
                copyToClipboard(
                  `${window.location.host}/supporter/${cell.row.original.token}`,
                );

                EToast({
                  toast,
                  status: "success",
                  title: "تم نسخ الرابط",
                });
              }}
            >
              <FaRegCopy />
              {cell.row.original.url}
            </Button>
          );
        },
      },
    ],
    [checkedRows, handleCheckboxChange],
  );

  return { columns, checkedRows, setCheckedRows };
};

export default useColumns;
