import { BoxMandobIcon } from "@assets/icons";
import { Circle, HStack, Text, VStack } from "@chakra-ui/react";
import { BorderedBox } from "@components/core";

interface Props {
  value: number;
}
const BMandobCountBoxt = ({ value }: Props) => {
  return (
    <BorderedBox p="20px" flexGrow="1">
      <HStack spacing="16px">
        <Circle bg="white" p="3">
          <BoxMandobIcon />
        </Circle>
        <VStack align="stretch" spacing="2px">
          <Text fontSize="20px">
            {value.toLocaleString()}
          </Text>
          <Text color="#46515D">مناديب الصندوق</Text>
        </VStack>
      </HStack>
    </BorderedBox>
  );
};

export default BMandobCountBoxt;
