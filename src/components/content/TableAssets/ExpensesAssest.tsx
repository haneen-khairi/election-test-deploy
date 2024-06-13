import { Expenses } from "@assets/icons/tables";
import { Text, VStack } from "@chakra-ui/react";

const ExpensesAssest = () => {
  return (
    <VStack h="50vh" alignItems="center" justifyContent="center">
      <Expenses />
      <Text fontSize="18px" fontWeight="700" color="black">
        لا يوجد مصروفات بعد !
      </Text>
      <Text color="#46515D">قم بإضافة مصروفات لكي يتم إظهار بيناتهم</Text>
    </VStack>
  );
};

export default ExpensesAssest;
