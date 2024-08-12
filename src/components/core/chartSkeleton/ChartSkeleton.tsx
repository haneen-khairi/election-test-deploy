import { HStack, Skeleton, SkeletonCircle, VStack } from "@chakra-ui/react";

interface Props {
  type: "Pie" | "Bar";
  noLabels?: number;
  noBars?: number;
}
const ChartSkeleton = ({ type, noLabels = 2, noBars }: Props) => {
  return (
    <>
      {type === "Pie" && (
        <HStack justifyContent="center" spacing="70px">
          <VStack align="stretch">
            {Array.from({ length: noLabels || 0 }).map((_, index) => (
              <HStack key={index}>
                <Skeleton
                  h="5px"
                  w="50px"
                  startColor="#F0F2F6"
                  endColor="#E2E5E9"
                ></Skeleton>
                <Skeleton
                  h="10px"
                  w="10px"
                  startColor="#F0F2F6"
                  endColor="#E2E5E9"
                ></Skeleton>
              </HStack>
            ))}
          </VStack>
          <SkeletonCircle size="300" startColor="#F0F2F6" endColor="#E2E5E9" />
        </HStack>
      )}
      {type === "Bar" && (
        <HStack align="flex-end" justifyContent="space-between">
          {Array.from({ length: noBars || 0 }).map((_, index) => (
            <Skeleton
              key={index}
              h={index % 2 == 0 ? "250px" : "150px"}
              w="45px"
              startColor="#F0F2F6"
              endColor="#E2E5E9"
            ></Skeleton>
          ))}
        </HStack>
      )}
    </>
  );
};

export default ChartSkeleton;
