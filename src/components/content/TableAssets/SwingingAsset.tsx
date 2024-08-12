import { Swinging } from "@assets/icons/tables";
import { Text, VStack } from "@chakra-ui/react";

const SwingingAsset = () => {
  return (
    <VStack h="50vh" alignItems="center" justifyContent="center">
      <Swinging />
      <Text fontSize="18px" fontWeight="700" color="black">
        لا توجد اصوات متأرجحة بعد!
      </Text>
      <Text color="#46515D">قم بتغيير حالة الناخبين لتظهر هنا</Text>
    </VStack>
  );
};

export default SwingingAsset;
