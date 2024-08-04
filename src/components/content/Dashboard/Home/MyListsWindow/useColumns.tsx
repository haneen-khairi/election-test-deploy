/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo } from "react";
import { Text } from "@chakra-ui/react";
import { truncateText } from "@constants/functions/TruncateText";
import { CellValue } from "react-table";
// import { CheckBox } from "@components/core";

interface Props {
  names: string | undefined;
}

const useColumns = ({ names }: Props) => {
  const [checkedRows, setCheckedRows] = useState<string[]>([]);

  // const handleCheckboxChange = (id: string) => {
  //   if (checkedRows.includes(id)) {
  //     setCheckedRows(checkedRows.filter((rowId) => rowId !== id));
  //   } else {
  //     setCheckedRows([...checkedRows, id]);
  //   }
  // };

  const columns = useMemo(
    () => [
      {
        Header: "الإسم",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text color="mPrimary" fontWeight="600" noOfLines={1}>
              {truncateText(cell.row.original.full_name, 150)}
            </Text>
          );
        },
      },
      {
        Header: "رقم الهاتف",
        accessor: "mobile_number",
      },
      {
        Header: "حالة الضمان",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text fontWeight="600">
              {cell.row.original.status ? `${cell.row.original.status} %` : "-"}
            </Text>
          );
        },
      },
      {
        Header: "إسم المندوب",
        Cell: ({ cell }: CellValue) => {
          return (
            <Text fontWeight="600">
              {cell.row.original.delegate_name || "---"}
            </Text>
          );
        },
      },
    ],
    [checkedRows, names],
  );

  return { columns, checkedRows, setCheckedRows };
};

export default useColumns;
