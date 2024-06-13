/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BoxRepresentatives,
  BoxesNumbers,
  FamiliesNumbers,
  FamiliesRepresentations,
  MainRepresentatives,
  MapIcon,
  MotionRepresentatives,
  SchoolWatchers,
  VotingCenters,
} from "@assets/icons";
import { Box, Grid, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import { Ebox } from "@components/core";
import { ReactNode } from "react";
import FamilyDonutChart from "../FamilyDonutChart/FamilyDonutChart";
import FamilyRepBarChart from "../FamilyRepBarChart/FamilyRepBarChart";
import GoogleGeoMap from "@components/content/map/GoogleGeoMap";
import { displaySpinner } from "@services/utils/displaySpinner";
import { useGetGeneralStats } from "@services/hooks/insights/useInsights";
import {
  useGetMapVoters,
  useGetVotersStats,
} from "@services/hooks/voters/useVoters";

interface SideBox {
  text: string;
  icon: ReactNode;
  number: string | number | ReactNode;
  content?: ReactNode;
}

const VotersCountWindow = ({
  filter,
  setFilter,
}: {
  filter: any;
  setFilter: any;
}) => {
  const { data: generalStats, isLoading: isLoading1 } =
    useGetGeneralStats(filter);
  const { data: votersStats, isLoading: isLoading2 } = useGetVotersStats(filter);
  const { data: mapVoters, isLoading: isLoading3 } = useGetMapVoters();

  const leftSideBoxes: SideBox[] = [
    {
      text: "المناديب الرئيسيين",
      icon: <MainRepresentatives />,
      number: displaySpinner(
        generalStats?.data?.manadeeb_raeesi_count,
        isLoading1,
        "---",
      ),
    },
    {
      text: "مناديب الحركة",
      icon: <MotionRepresentatives />,
      number: displaySpinner(
        generalStats?.data?.manadeeb_haraka_count,
        isLoading1,
        "---",
      ),
    },
    {
      text: "مناديب الصندوق",
      icon: <BoxRepresentatives />,
      number: displaySpinner(
        generalStats?.data?.manadeeb_sandoq_count,
        isLoading1,
        "---",
      ),
    },
    {
      text: "مراقبي المدارس",
      icon: <SchoolWatchers />,
      number: displaySpinner(
        generalStats?.data?.muraqib_count,
        isLoading1,
        "---",
      ),
    },
  ];

  const rightSideBoxes: SideBox[] = [
    {
      text: "مراكز الإقتراع",
      icon: <VotingCenters />,
      number: displaySpinner(
        votersStats?.data?.voting_centers,
        isLoading2,
        "---",
      ),
    },
    {
      text: "عدد الصناديق",
      icon: <BoxesNumbers />,
      number: "[number]",
    },
    {
      text: "عدد العائلات",
      icon: <FamiliesNumbers />,
      number: displaySpinner(
        generalStats?.data?.unique_last_names_count,
        isLoading1,
        "---",
      ),
      content: (
        <FamilyDonutChart
          setFilter={setFilter}
          data={generalStats?.data}
          isLoading={isLoading1}
        />
      ),
    },
  ];

  return (
    <VStack gap="16px">
      <Grid
        templateColumns="auto 350px"
        gridAutoRows="max-content"
        w="100%"
        gap="15px"
      >
        <VStack>
          <Ebox height="100%">
            <HStack justifyContent="space-between">
              <VStack alignItems="start">
                <HStack gap="8px">
                  <MapIcon />
                  <Text fontWeight={600}>الأصوات حسب المنطقة</Text>
                </HStack>
                <Text fontWeight={600} mb="10px" fontSize="24px">
                  {displaySpinner(
                    generalStats?.data?.total_voters,
                    isLoading1,
                    "---",
                  )}
                </Text>
              </VStack>
            </HStack>

            <Box w="100%" h="auto">
              {isLoading3 ? (
                <Spinner />
              ) : (
                mapVoters?.data && <GoogleGeoMap mapVoters={mapVoters?.data} />
              )}
            </Box>
          </Ebox>
        </VStack>

        <VStack justifyContent="space-between" gap="15px">
          {leftSideBoxes.map(({ icon, number, text }) => (
            <Ebox h="100%">
              <HStack>
                {icon}
                <Text lineHeight="22px" mr="14px" fontSize="18px">
                  {text}
                </Text>
                <Text mr="auto">{number}</Text>
              </HStack>
            </Ebox>
          ))}
        </VStack>
      </Grid>

      <Grid
        templateColumns="350px auto"
        w="100%"
        gap="15px"
        gridAutoRows="max-content"
      >
        <VStack>
          {rightSideBoxes.map(({ icon, number, text, content }, index) => (
            <Ebox height={index === 2 ? "100%" : "auto"}>
              <HStack>
                {icon}
                <Text lineHeight="22px" mr="14px">
                  {text}
                </Text>
                <Text mr="auto">{number}</Text>
              </HStack>

              {content && content}
            </Ebox>
          ))}
        </VStack>

        <VStack>
          <Ebox height="100%">
            <HStack gap="8px">
              <FamiliesRepresentations />
              <Text fontWeight={600}>تمثيل العائلات في الدائرة الانتخابية</Text>
            </HStack>

            <FamilyRepBarChart filter={filter} setFilter={setFilter} />
          </Ebox>
        </VStack>
      </Grid>
    </VStack>
  );
};

export default VotersCountWindow;
