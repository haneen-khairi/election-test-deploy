import { CircularProgressLabel, CircularProgress } from "@chakra-ui/react";

interface Props {
  value: number;
  displayed_value: string;
}
const ECircularProgress = ({ value, displayed_value }: Props) => {
  return (
    <CircularProgress
      value={value}
      color={
        value >= 50 ? "primary.200" : value >= 20 ? "#FFAC07" : "danger.200"
      }
      thickness="6px"
      size="65px"
    >
      <CircularProgressLabel fontSize="14px" fontWeight="600">
        {displayed_value}
      </CircularProgressLabel>
    </CircularProgress>
  );
};

export default ECircularProgress;
