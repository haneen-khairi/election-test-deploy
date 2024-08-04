/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo } from "react";
import { Text } from "@chakra-ui/react";
import { truncateText } from "@constants/functions/TruncateText";
import { CellValue } from "react-table";
import { CheckBox } from "@components/core";

const useColumns = ({ isLeft }: { isLeft: boolean }) => {
  const [checkedRows, setCheckedRows] = useState<string[]>([]);

  const handleCheckboxChange = (id: string) => {
    if (checkedRows.includes(id)) {
      setCheckedRows(checkedRows.filter((rowId) => rowId !== id));
    } else {
      setCheckedRows([...checkedRows, id]);
    }
  };

  const columns = useMemo(() => {
    const array = [];

    if (!isLeft) {
      array.push({
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
      });
    }

    array.push({
      Header: "الإسم",
      Cell: ({ cell }: CellValue) => {
        return (
          <Text color="mPrimary" fontWeight="600" noOfLines={1}>
            {truncateText(
              `${cell.row.original.first_name} ${cell.row.original.second_name} ${cell.row.original.third_name} ${cell.row.original.last_name}`,
              50,
            )}
          </Text>
        );
      },
    });

    return array;
  }, [checkedRows]);

  return { columns, checkedRows, setCheckedRows };
};

export default useColumns;
