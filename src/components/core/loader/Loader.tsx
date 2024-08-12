import { CircularProgress, VStack } from "@chakra-ui/react";
interface Props {
  size?: number;
  color?: string;
}
const Loader = ({ size, color }: Props) => {
  return (
    <VStack>
      <CircularProgress
        isIndeterminate
        color={color ? color : "primary.500"}
        size={size || 10}
      />
    </VStack>
  );
};

export default Loader;
