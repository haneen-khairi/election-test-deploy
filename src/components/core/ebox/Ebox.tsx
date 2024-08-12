import React from "react";
import { Box, BoxProps, Divider, HStack, Text } from "@chakra-ui/react";

interface Props extends BoxProps {
  children: React.ReactNode;
  isBorder?: boolean;
  title?: string;
  full?: boolean;
  element?: React.ReactNode;
}

const Ebox = ({
  children,
  title,
  isBorder = true,
  full = false,
  element,
  ...rest
}: Props) => {
  return (
    <Box w="100%" rounded="12px" bg="white" {...rest}>
      {title && (
        <Box>
          <HStack justifyContent="space-between" alignItems="center" p="24px">
            <Text fontSize="18px" fontWeight="600">
              {title}
            </Text>
            {element}
          </HStack>

          {isBorder && <Divider borderWidth="0.8px" borderColor="#E2E5E9" />}
        </Box>
      )}
      <Box p={full ? "" : "24px"}>{children}</Box>
    </Box>
  );
};

export default Ebox;
