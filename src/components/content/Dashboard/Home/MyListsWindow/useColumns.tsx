/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo } from "react";
import { HStack, Text } from "@chakra-ui/react";
import { truncateText } from "@constants/functions/TruncateText";
import { CellValue } from "react-table";
import { CheckBox } from "@components/core";

interface Props {
  names: string | undefined;
}

const useColumns = ({ names }: Props) => {
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

    if (names !== "found_with_mandoub_main")
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

    array.push(
      ...[
        {
          Header: "الإسم",
          Cell: ({ cell }: CellValue) => {
            return (
              <HStack justifyContent="flex-start">
                <Text color="mPrimary" fontWeight="600" noOfLines={1}>
                  {truncateText(cell.row.original.full_name, 150)}
                </Text>
              </HStack>
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
                {cell.row.original.status
                  ? `${cell.row.original.status} %`
                  : "-"}
              </Text>
            );
          },
        },
        // {
        //   Header: "  ",
        //   Cell: ({ cell }: CellValue) => {
        //     const id = cell.row.original.id;
        //     return (
        //       <HStack justifyContent="flex-end">
        //         {checkedRows.includes(id) && checkedRows.length <= 1 && (
        //           <Box
        //             as={Button}
        //             size="xs"
        //             rounded="full"
        //             px="0"
        //             variant="ghost"
        //             fontSize="15px"
        //             color="primary.500"
        //             onClick={() => {
        //               setRecordID(cell.row.original.id);
        //               edit.onOpen();
        //             }}
        //           >
        //             <MdEdit />
        //           </Box>
        //         )}
        //         <Box
        //           as={Button}
        //           size="xs"
        //           rounded="full"
        //           px="0"
        //           variant="ghost"
        //           fontSize="15px"
        //           color="primary.500"
        //           onClick={() => {
        //             setRecordID(cell.row.original.id);
        //             info.onOpen();
        //           }}
        //         >
        //           <FaInfoCircle />
        //         </Box>
        //       </HStack>
        //     );
        //   },
        // },
      ],
    );

    return array;
  }, [checkedRows, names]);

  return { columns, checkedRows, setCheckedRows };
};

export default useColumns;
