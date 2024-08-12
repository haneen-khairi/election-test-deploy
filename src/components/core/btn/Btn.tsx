import { HStack, HTMLChakraProps, Text } from "@chakra-ui/react";
import { Loader } from "..";

interface Props extends HTMLChakraProps<"div"> {
  type?: "solid" | "outlined" | "danger";
  icon?: React.ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  iconPlacment?: "left" | "right";
  children?: React.ReactNode;
}
const Btn = ({
  children,
  type = "solid",
  icon,
  isLoading,
  iconPlacment = "left",
  disabled,
  ...rest
}: Props) => {
  return (
    <HStack
      px="24px"
      bg={
        !disabled
          ? type === "solid"
            ? "primary.200"
            : type === "danger"
            ? "danger.500"
            : "white"
          : type === "solid"
          ? "#ECECEC"
          : "white"
      }
      rounded="8px"
      fontSize="15px"
      fontWeight="500"
      h="40px"
      justifyContent="center"
      _hover={{
        bg:
          type === "outlined"
            ? "primary.200"
            : type === "danger"
            ? "danger.300"
            : "primary.800",
        color: "white",
      }}
      color={
        disabled ? "#888888" : type === "outlined" ? "primary.200" : "white"
      }
      transition="0.3s"
      pointerEvents={disabled || isLoading ? "none" : "auto"}
      border={
        !disabled
          ? type === "outlined"
            ? "1px solid"
            : "none"
          : "1px solid #888888"
      }
      borderColor={
        !disabled ? (type === "outlined" ? "primary.200" : "white") : "none"
      }
      cursor="pointer"
      {...rest}
    >
      {isLoading ? (
        <Loader
          color={type === "solid" || type === "danger" ? "white" : "mPrimary"}
          size={6}
        />
      ) : (
        <HStack flexDir={iconPlacment === "left" ? "row-reverse" : "row"}>
          {icon && icon}
          {children && <Text as="div">{children}</Text>}
        </HStack>
      )}
    </HStack>
  );
};

export default Btn;
