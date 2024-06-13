import { VotersIcon } from "@assets/icons";
import { Circle, HStack, Text, VStack } from "@chakra-ui/react";
import { BorderedBox } from "@components/core";

interface Props {
  value: string;
}
const VotersCountBox = ({ value }: Props) => {
  return (
    <BorderedBox p="20px" flexGrow="1" h="100%">
      <HStack spacing="16px">
        <Circle bg="white" p="2">
          <VotersIcon />
        </Circle>
        <VStack align="stretch" spacing="2px">
          <Text fontSize="20px">
            {value}
          </Text>
          <Text color="primary.200">إجمالي عدد الناخبين</Text>
        </VStack>
      </HStack>
    </BorderedBox>
  );
};

export default VotersCountBox;
