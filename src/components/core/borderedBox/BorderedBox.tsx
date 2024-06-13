import { Box, BoxProps } from "@chakra-ui/react";

interface Props extends BoxProps {
  children: React.ReactNode;
}
const BorderedBox = ({ children, ...rest }: Props) => {
  return (
    <Box
      bg="#F1F3F5"
      p="8px 12px"
      rounded="8px"
      border="1px solid #E4E5E5"
      {...rest}
    >
      {children}
    </Box>
  );
};

export default BorderedBox;
