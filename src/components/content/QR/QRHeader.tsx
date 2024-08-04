import { ElectionBrand } from "@assets/icons";
import { HStack } from "@chakra-ui/react";

const QRHeader = () => {
  return (
    <HStack width="100%" p="20px">
      <ElectionBrand />
    </HStack>
  );
};

export default QRHeader;
