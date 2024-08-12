import { BoxProps, Skeleton } from "@chakra-ui/react";

interface Props extends BoxProps {
  isLoading: boolean;
  children: React.ReactNode;
}
const ESkeleton = ({ isLoading, children, ...rest }: Props) => {
  return (
    <Skeleton
      isLoaded={!isLoading}
      fadeDuration={1}
      flexGrow="1"
      rounded="10px"
      startColor="#F0F2F6"
      endColor="#E2E5E9"
      {...rest}
    >
      {children}
    </Skeleton>
  );
};

export default ESkeleton;
