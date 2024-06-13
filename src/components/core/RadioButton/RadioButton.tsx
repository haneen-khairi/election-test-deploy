import { Box, Text } from "@chakra-ui/react";

interface CustomRadioBoxProps {
  field: {
    value: string | number;
    onChange: (value: string | number) => void;
  };
  option: { title: string; value: number };
  isChecked?: boolean;
}

function RadioButton({ field, option, isChecked }: CustomRadioBoxProps) {
  const { title, value } = option;

  return (
    <Box
      as="label"
      bg={field.value === value ? "primary.200/10" : "white"}
      border="1px"
      borderColor={field.value === value ? "primary.500" : "gray.300"}
      borderRadius="8px"
      width="100%"
      height="46px"
      textAlign="center"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      cursor="pointer"
      position="relative"
      p="2"
      onClick={() => field.onChange(value)}
    >
      <Text>{title}</Text>
      <input
        type="radio"
        value={String(value)} // Ensure value is string for compatibility
        checked={field.value === value || isChecked}
        onChange={() => field.onChange(value)}
        style={{ display: "none" }}
      />
      <Box
        p="2"
        border="1px solid"
        borderColor={field.value === value ? "green" : "gray.300"}
        rounded="full"
        w="10px"
        h="10px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {field.value === value && (
          <Box bg="primary.200" w="5px" h="5px" p="1" rounded="full"></Box>
        )}
      </Box>
    </Box>
  );
}

export default RadioButton;
