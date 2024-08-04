/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { Button, Text } from "@chakra-ui/react";
import { CellValue } from "react-table";
import { formatDateTime } from "@services/utils";
import { FaArrowDown } from "react-icons/fa6";

const useExpensesColumns = () => {
  const downloadImage = async (src: string, name: string) => {
    const blob = await fetch(src)
      .then((res) => res.arrayBuffer())
      .then((buffer) => new Blob([buffer], { type: "image/png" }));

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const expensesColumns = useMemo(
    () => [
      {
        Header: "من حساب رئيسي",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text fontWeight="600" noOfLines={1}>
              {cell.row.original?.from_main_account}
            </Text>
          );
        },
      },
      {
        Header: "من حساب فرعي ",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text fontWeight="600" noOfLines={1}>
              {cell.row.original?.from_sub_account}
            </Text>
          );
        },
      },
      {
        Header: "نوع المصروف",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text fontWeight="600" noOfLines={1}>
              {cell.row.original?.type_name}
            </Text>
          );
        },
      },
      {
        Header: "القيمة",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text fontWeight="600" noOfLines={1}>
              {cell.row.original?.amount}
            </Text>
          );
        },
      },
      {
        Header: "التاريخ والوقت",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text fontWeight="600" noOfLines={1}>
              {formatDateTime(cell.row.original?.date, cell.row.original?.time)}
            </Text>
          );
        },
      },
      {
        Header: "الفاتورة",
        Cell: ({ cell }: CellValue) => {
          return cell.row.original.image ? (
            <Button
              rounded="full"
              p="10px 15px"
              variant="ghost"
              colorScheme="green"
              fontSize="16px"
              size="sm"
              onClick={async () => {
                await downloadImage(cell.row.original.image, "invoice.png");
              }}
            >
              <FaArrowDown />
              <Text mr="10px" color="#318973">
                تحميل
              </Text>
            </Button>
          ) : (
            <Text fontWeight="600" noOfLines={1}>
              غير موجودة
            </Text>
          );
        },
      },
    ],
    [],
  );

  return { expensesColumns };
};

export default useExpensesColumns;
