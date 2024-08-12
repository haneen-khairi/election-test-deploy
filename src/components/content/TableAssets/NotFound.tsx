import { NotFound } from "@assets/icons/tables";
import { Text, VStack } from "@chakra-ui/react";

const NoFilterData = () => {
  return (
    <VStack h="50vh" alignItems="center" justifyContent="center">
      <NotFound />
      <Text fontSize="18px" fontWeight="700" color="black">
        لا يوجد نتائج مطابقة!
      </Text>
      <Text color="#46515D">من فضلك تأكد من خيارات البحث و اعد المحاولة</Text>
    </VStack>
  );
};

export default NoFilterData;
