import { useMemo } from "react";
import { Text } from "@chakra-ui/react";
import { CellValue } from "react-table";
import DeliveryStatus from "../partials/DeliveryStatus";

const useColumns = () => {
  const columns = useMemo(
    () => [
      {
        Header: "اسم الناخب",
        Cell: ({ cell }: CellValue) => {
          const { first_name, second_name, third_name, last_name } =
            cell.row.original;
          return (
            <Text fontWeight="700">
              {first_name} {second_name} {third_name} {last_name}
            </Text>
          );
        },
      },
      {
        Header: "الحالة",
        Cell: ({ cell }: CellValue) => {
          const delivery_status = cell.row.original.delivery_status;
          return (
            <Text color="primary.200" w="120px" m="Auto">
              <DeliveryStatus statusID={delivery_status} />
            </Text>
          );
        },
      },
    ],
    []
  );

  return { columns };
};

export default useColumns;
