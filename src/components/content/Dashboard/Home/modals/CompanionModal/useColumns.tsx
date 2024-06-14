/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo } from "react";
import {
  Text,
} from "@chakra-ui/react";
import { truncateText } from "@constants/functions/TruncateText";
import { CellValue } from "react-table";
import { CheckBox } from "@components/core";

const useColumns = () => {
  const [checkedRows, setCheckedRows] = useState<string[]>([]);

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
            <Text color="mPrimary" fontWeight="600" noOfLines={1}>
              {truncateText(
                `${cell.row.original.voter.first_name} ${cell.row.original.voter.second_name} ${cell.row.original.voter.third_name} ${cell.row.original.voter.last_name}`,
                150,
              )}
            </Text>
          );
        },
      },
      {
        Header: "الرابط",
        accessor: "url",
      },
    ],
    [checkedRows, handleCheckboxChange],
  );

  return { columns, checkedRows, setCheckedRows };
};

export default useColumns;
