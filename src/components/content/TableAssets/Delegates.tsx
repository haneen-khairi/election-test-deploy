import { NoDelegates } from "@assets/icons/tables";
import { Text, VStack } from "@chakra-ui/react";

const NoData = () => {
  return (
    <VStack h="50vh" alignItems="center" justifyContent="center">
      <NoDelegates />
      <Text fontSize="18px" fontWeight="700" color="black">
        لا يوجد مناديب بعد !
      </Text>
      <Text color="#46515D">قم بإضافة مناديب لكي يتم إظهار بيناتهم</Text>
    </VStack>
  );
};

export default NoData;
