import { HStack, Text } from "@chakra-ui/react";
import { BorderedBox, ECircularProgress } from "@components/core";

interface Props {
  value: string;
}
const SwingingVotesBox = ({ value }: Props) => {
  const newValue = parseFloat(value.replace("%", ""));

  const formattedValue = new Intl.NumberFormat("en", {
    style: "percent",
    minimumFractionDigits: 2,
  }).format(newValue / 100);
  return (
    <BorderedBox p="20px" flexGrow="1" h="100%">
      <HStack>
        <ECircularProgress
          value={Number(newValue)}
          displayed_value={formattedValue}
        />
        <Text fontSize="16px" fontWeight="600">
          أصواتي المتأرجحة
        </Text>
      </HStack>
    </BorderedBox>
  );
};

export default SwingingVotesBox;
