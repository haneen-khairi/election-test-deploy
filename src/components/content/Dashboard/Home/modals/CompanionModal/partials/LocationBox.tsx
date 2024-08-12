import { InfoError } from "@assets/icons";
import { Box, FormControl, FormLabel, HStack, Text } from "@chakra-ui/react";
import { GrMapLocation } from "react-icons/gr";

interface Value {
  longitude?: number;
  latitude?: number;
}
interface Props {
  placeholder: string;
  value: Value;
  error?: string;
  onOpen: () => void;
  label: string;
}
const LocationBox = ({ onOpen, placeholder, value, error, label }: Props) => {
  const getLocationText = () => {
    return value.latitude && value.longitude
      ? `${value.longitude},${value.latitude}`
      : placeholder;
  };
  return (
    <>
      <FormControl>
        <FormLabel fontSize="14px" fontWeight={500}>
          {label}
        </FormLabel>

        <Box
          p="16px 12px"
          border="1px solid"
          borderColor={error ? "danger.200" : "#E4E4E4"}
          borderWidth={error ? "2px" : "1px"}
          h="51px"
          rounded="8px"
          onClick={onOpen}
          cursor="pointer"
        >
          <HStack justifyContent="space-between" alignItems="center">
            <Text color="gray.500" fontSize="15px" fontWeight="400">
              {getLocationText()}
            </Text>
            <Box color="primary.500" fontSize="15px">
              <GrMapLocation />
            </Box>
          </HStack>
        </Box>

        {error && (
          <Text
            mt="8px"
            display="flex"
            alignItems="center"
            textAlign="start"
            gap="6px"
            color="danger.200"
            fontSize="0.85rem"
          >
            <InfoError /> {error}
          </Text>
        )}
      </FormControl>
    </>
  );
};

export default LocationBox;
