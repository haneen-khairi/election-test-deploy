/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, HStack, Text } from "@chakra-ui/react";
import { Control, useController } from "react-hook-form";

interface RadioCardGroupProps {
  options: { value: string; label: string; color?: string }[];
  name: string;
  control: Control<any, any>;
}

const RadioCardGroup: any = ({
  options,
  name,
  control,
  ...rest
}: RadioCardGroupProps) => {
  const { field } = useController({
    name,
    control,
  });

  const handleRadioChange = (value: any) => {
    field.onChange(value);
  };

  const getBorderRadius = (index: number) => {
    if (index === 0) return "0px 12px 12px 0px";
    if (index === options.length - 1) return "12px 0px 0px 12px";
    else return "0px";
  };

  return (
    <HStack w="100%" h="100%" justifyContent="center" gap={0} {...rest}>
      {options.map(({ value, label, color }, index) => {
        const radius = getBorderRadius(index);

        return (
          <Button
            w="100%"
            h="100%"
            p="14px 19px"
            _hover={{
              color: field.value === value ? "#fff" : "#000",
              opacity: 0.7,
            }}
            border={
              field.value === value
                ? `1px solid ${color || "#2a8a6e"}`
                : `1px solid ${color || "#7878785b"}`
            }
            borderRadius={radius}
            onClick={() => handleRadioChange(value)}
            bg={field.value === value ? color || "#2a8a6e" : "#f8f8f8"}
            color={field.value === value ? "#fff" : "#000"}
          >
            <Text>{label}</Text>
          </Button>
        );
      })}
    </HStack>
  );
};

export default RadioCardGroup;
