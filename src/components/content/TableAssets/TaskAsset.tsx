import { Tasks } from "@assets/icons/tables";
import { Text, VStack } from "@chakra-ui/react";

const ExpensesAssest = () => {
  return (
    <VStack h="50vh" alignItems="center" justifyContent="center">
      <Tasks />
      <Text fontSize="18px" fontWeight="700" color="black">
        لا يوجد مهام بعد!
      </Text>
      <Text color="#46515D">قم بإضافة مهام لكي يتم إظهار بيناتهم</Text>
    </VStack>
  );
};

export default ExpensesAssest;
