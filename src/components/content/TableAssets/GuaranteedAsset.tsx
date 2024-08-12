import { Guaranteed } from "@assets/icons/tables";
import { Text, VStack } from "@chakra-ui/react";

const GuaranteedAsset = () => {
  return (
    <VStack h="50vh" alignItems="center" justifyContent="center">
      <Guaranteed />
      <Text fontSize="18px" fontWeight="700" color="black">
        لا توجد اصوات مضمونة بعد!
      </Text>
      <Text color="#46515D">قم بتغيير حالة الناخبين لتظهر هنا</Text>
    </VStack>
  );
};

export default GuaranteedAsset;
