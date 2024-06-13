import { MandobIcon2 } from "@assets/icons";
import { Circle, HStack, Text, VStack } from "@chakra-ui/react";
import { BorderedBox } from "@components/core";

interface Props {
  value: number;
}
const MainManobCountBox = ({ value }: Props) => {
  return (
    <BorderedBox p="20px" flexGrow="1">
      <HStack spacing="16px">
        <Circle bg="white" p="3">
          <MandobIcon2 />
        </Circle>
        <VStack align="stretch" spacing="2px">
          <Text fontSize="20px">
            {value.toLocaleString()}
          </Text>
          <Text color="#46515D">المناديب الرئيسيين</Text>
        </VStack>
      </HStack>
    </BorderedBox>
  );
};

export default MainManobCountBox;
