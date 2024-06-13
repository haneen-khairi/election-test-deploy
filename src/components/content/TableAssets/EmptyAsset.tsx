import { NotFound } from "@assets/icons/tables";
import { Text, VStack } from "@chakra-ui/react";

const PreliminaryAsset = () => {
  return (
    <VStack h="50vh" alignItems="center" justifyContent="center">
      <NotFound />
      <Text fontSize="18px" fontWeight="700" color="black">
        لا يوجد نتائج!
      </Text>
      <Text color="#46515D">لا يوجد نتائج حالياً يرجى الحاولة لاحقاً</Text>
    </VStack>
  );
};

export default PreliminaryAsset;
