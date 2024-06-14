/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThreePeopleIcon } from "@assets/icons";
import { Box, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import { Ebox } from "@components/core";
import { useGetElectionDayStats } from "@services/hooks/voters/useVoters";
import { displaySpinner } from "@services/utils/displaySpinner";

const dateToSlots = (
  date: string,
): { d: string; h: string; m: string; s: string } => {
  if (!date) return { d: "0", h: "0", m: "0", s: "0" };

  const segments = date.split(" ");
  const time = segments[2];
  const timeSegments = time.split(":");

  return {
    d: segments[0],
    h: timeSegments[0],
    m: timeSegments[1],
    s: timeSegments[2],
  };
};

const StatsSection = () => {
  const { data, isLoading } = useGetElectionDayStats();

  const clone = structuredClone(data) as any;

  const slots = dateToSlots(clone?.timer);

  const GreenBox = ({ direction }: { direction: "up" | "down" }) => (
    <Box
      position="absolute"
      top={direction === "up" ? "0" : "unset"}
      bottom={direction === "down" ? "0" : "unset"}
      width="100%"
      height="48%"
      backgroundColor="#1baa76"
      borderRadius="6px"
    />
  );

  const ClockBox = ({ text }: { text: string | number }) => {
    return (
      <Box
        position="relative"
        color="white"
        fontSize="38px"
        width="65px"
        height="60px"
      >
        <GreenBox direction="up" />
        <GreenBox direction="down" />
        <Text
          position="absolute"
          top="50%"
          left="50%"
          transform="translateY(-50%) translateX(-50%)"
        >
          {text}
        </Text>
      </Box>
    );
  };

  const ClockFace = ({
    d,
    h,
    m,
    s,
  }: {
    d: string | number;
    h: string | number;
    m: string | number;
    s: string | number;
  }) => {
    return (
      <HStack>
        <ClockBox text={s} />
        <Text fontSize="30px">:</Text>
        <ClockBox text={m} />
        <Text fontSize="30px">:</Text>
        <ClockBox text={h} />
        <Text fontSize="30px">:</Text>
        <ClockBox text={d} />
      </HStack>
    );
  };

  return (
    <Grid
      width="100%"
      gap="16px"
      gridTemplateColumns="auto repeat(3, 20%)"
      gridAutoRows="max-content"
      fontWeight="600"
    >
      <Ebox
        gridRow="span 2"
        display="flex"
        flexDir="column"
        justifyContent="center"
      >
        <VStack gap={5}>
          <Text width="100%" textAlign="center" fontSize="24px">
            متبقي على العملية الانتخابية
          </Text>
          {clone?.timer ? (
            <ClockFace d={slots?.d} h={slots?.h} m={slots?.m} s={slots?.s} />
          ) : (
            "No data"
          )}
        </VStack>
      </Ebox>

      <Ebox
        gridRow="span 2"
        display="flex"
        flexDir="column"
        justifyContent="center"
      >
        <VStack justifyContent="center" alignItems="center">
          <ThreePeopleIcon />
          <Text fontSize="18px" mb="16px">
            أصواتي
          </Text>
          <Text fontSize="20px">
            {displaySpinner(clone?.my_votes_count, isLoading, "---")}
          </Text>
        </VStack>
      </Ebox>

      <Ebox display="flex" flexDir="column" justifyContent="center">
        <Text
          fontSize="18px"
          width="100%"
          textAlign="center"
          height="fit-content"
        >
          تم التوصيل
        </Text>
        <Text
          fontSize="20px"
          width="100%"
          textAlign="center"
          height="fit-content"
          color="#12B76A"
        >
          {displaySpinner(clone?.delivered, isLoading, "---")}
        </Text>
      </Ebox>

      <Ebox display="flex" flexDir="column" justifyContent="center">
        <Text
          fontSize="18px"
          width="100%"
          textAlign="center"
          height="fit-content"
        >
          تم التصويت
        </Text>
        <Text
          fontSize="20px"
          width="100%"
          textAlign="center"
          height="fit-content"
          color="#12B76A"
        >
          {displaySpinner(clone?.is_voted, isLoading, "---")}
        </Text>
      </Ebox>

      <Ebox display="flex" flexDir="column" justifyContent="center">
        <Text
          fontSize="18px"
          width="100%"
          textAlign="center"
          height="fit-content"
        >
          لم يتم التوصيل
        </Text>
        <Text
          fontSize="20px"
          width="100%"
          textAlign="center"
          height="fit-content"
          color="#D62C2C"
        >
          {displaySpinner(clone?.still_waiting_delivery, isLoading, "---")}
        </Text>
      </Ebox>

      <Ebox display="flex" flexDir="column" justifyContent="center">
        <Text
          fontSize="18px"
          width="100%"
          textAlign="center"
          height="fit-content"
        >
          لم يتم التصويت
        </Text>
        <Text
          fontSize="20px"
          width="100%"
          textAlign="center"
          height="fit-content"
          color="#D62C2C"
        >
          {displaySpinner(clone?.is_not_voted, isLoading, "---")}
        </Text>
      </Ebox>
    </Grid>
  );
};

export default StatsSection;
