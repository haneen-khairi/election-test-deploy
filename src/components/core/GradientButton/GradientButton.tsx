import { Button, HTMLChakraProps } from "@chakra-ui/react";
import React from "react";
import { Loader } from "..";

interface Props extends HTMLChakraProps<"button"> {
  children: React.ReactNode;
  isLoading?: boolean;
}

const GradientButton = ({ children, isLoading, ...rest }: Props) => {
  return (
    <Button
      bg="linear-gradient(247.51deg, #2A8A6E 9.32%, #086259 96.8%)"
      color="#fff"
      _hover={{
        background: "linear-gradient(0.51deg, #2A8A6E 9.32%, #086259 96.8%)",
      }}
      p="16px 10px"
      h="50px"
      w="157px"
      {...rest}
      display="flex"
      justifyContent="center"
      gap="5px"
    >
      {isLoading && <Loader color="white" size={4} />}
      {children}
    </Button>
  );
};

export default GradientButton;
