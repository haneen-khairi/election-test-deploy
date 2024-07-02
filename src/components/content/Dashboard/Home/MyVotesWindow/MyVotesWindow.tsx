/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActivityChart, DownloadDB, MyVotes } from "@assets/icons";
import { Box, Button, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import { Ebox } from "@components/core";
import VotersBarChart from "../VotersBarChart/VotersBarChart";
import { VotesStats } from "@services/hooks/voters/Voters";
import DelegatesTable from "../DelegatesTable/DelegatesTable";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { votesActivitiesSchemas } from "./votesActivitiesSchemas";
import ActivitiesPeriodSelect from "@components/content/DropDown/ActivitiesPeriodSelect";
import ActivitiesLineChart from "../ActivitiesLineChart/ActivitiesLineChart";
import {
  useGetActivitiesVotes,
  useGetMyVotesStats,
} from "@services/hooks/voters/useVoters";
import { useEffect } from "react";
import VotersTable from "../VotersTable/VotersTable";
import PlaceBasedVotesTable from "../PlaceBasedVotesTable/PlaceBasedVotesTable";

const MyVotesWindow = ({
  filter,
  homePage = false,
  getCheckboxList =(data: any[]) => {}
}: {
  filter: any;
  homePage: boolean,
  setFilter: any;
  getCheckboxList?:(data: any[]) => void
}) => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(votesActivitiesSchemas),
    defaultValues: {
      period: undefined,
    },
  });
  const { data: myVoters } = useGetMyVotesStats(filter);
  const sortedData = ((myVoters?.data || []) as VotesStats[]).sort(
    (a, b) => b.status - a.status,
  );
  const {
    data,
    isLoading: activitiesDataIsLoading,
    refetch,
  } = useGetActivitiesVotes(watch("period") || "week");

  useEffect(() => {
    refetch();
  }, [watch("period")]);

  useEffect(() => {
    setValue("period", "week");
  }, []);

  const getSum = (arr: VotesStats[]): number => {
    return arr.reduce((acc, curr) => {
      return acc + curr.count;
    }, 0);
  };

  return (
    <VStack gap="16px">
      {homePage && <Grid
        templateColumns="auto 350px"
        gridAutoRows="max-content"
        w="100%"
        gap="15px"
      >
        <Ebox height="100%">
          <HStack justifyContent="space-between">
            <VStack alignItems="start" w="100%" gap="33px" fontSize="20px">
              <HStack gap="8px">
                <MyVotes />
                <Text fontWeight={600}>أصواتي</Text>

                <Text fontWeight={600} fontSize="16px">
                  {getSum(sortedData)}
                </Text>
              </HStack>

              <VotersBarChart filter={filter} />
            </VStack>
          </HStack>
        </Ebox>

        <VStack>
          <Ebox height="100%">
            <VStack w="100%" gap="33px" fontSize="20px">
              <HStack w="100%" fontWeight={600}>
                <Text ml="auto">سجل المناديب الرئيسيين</Text>
                <Button
                  rounded="full"
                  p="10px 15px"
                  variant="ghost"
                  colorScheme="green"
                  fontSize="20px"
                  size="sm"
                >
                  <DownloadDB />
                  <Text mr="10px" color="#318973">
                    تحميل
                  </Text>
                </Button>
              </HStack>

              <DelegatesTable />
            </VStack>
          </Ebox>
        </VStack>
      </Grid>}

      {homePage && <Grid
        templateColumns="30% auto"
        gridAutoRows="max-content"
        w="100%"
        gap="15px"
      >
        <Ebox>
          <VStack gap="33px">
            <HStack w="100%" fontSize="20px">
              <Text fontWeight={600} ml="auto">
                أصواتي حسب المناطق
              </Text>
              <Button
                rounded="full"
                p="10px 15px"
                variant="ghost"
                colorScheme="green"
                fontSize="20px"
                size="sm"
              >
                <DownloadDB />
                <Text mr="10px" color="#318973">
                  تحميل
                </Text>
              </Button>
            </HStack>

            <PlaceBasedVotesTable withCharts={false} />
          </VStack>
        </Ebox>

        <Ebox>
          <VStack>
            <HStack w="100%" fontSize="20px">
              <ActivityChart />
              <Text fontWeight={600} ml="auto">
                نشاط المندوب مع الاصوات
              </Text>

              <Box w="130px" mr="auto">
                <Controller
                  control={control}
                  name="period"
                  render={({ field: { onChange, value } }) => (
                    <ActivitiesPeriodSelect
                      onChange={onChange}
                      value={value}
                      error={errors.period?.message}
                      key={value}
                    />
                  )}
                />
              </Box>
            </HStack>

            <ActivitiesLineChart
              data={data?.data}
              isLoading={activitiesDataIsLoading}
            />
          </VStack>
        </Ebox>
      </Grid>}

      <Ebox>
        <VotersTable getCheckboxList={getCheckboxList} filter={filter} />
      </Ebox>
    </VStack>
  );
};

export default MyVotesWindow;
