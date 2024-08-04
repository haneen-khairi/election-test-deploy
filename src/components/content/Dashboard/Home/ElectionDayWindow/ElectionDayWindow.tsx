/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActivityChart } from "@assets/icons";
import { Grid, HStack, Text, VStack } from "@chakra-ui/react";
import { Ebox } from "@components/core";
import ActionDelegatesTable from "../ActionDelegatesTable/ActionDelegatesTable";
import VotingTable from "../VotingTable/VotingTable";
import PlaceBasedVotesTable from "../PlaceBasedVotesTable/PlaceBasedVotesTable";
import StatsSection from "./StatsSection";
import {
  useGetDeliveringVoters,
  useGetVotingDelegates,
} from "@services/hooks/voters/useVoters";
import ElectionDayVotersTable from "../ElectionDayVotersTable/ElectionDayVotersTable";
import PerformanceBarChart from "../PerformanceBarChart/PerformanceBarChart";
import DownloadButton from "@components/core/downloadButton/DownloadButton";

const ElectionDayWindow = ({
  filter,
  setFilter,
}: {
  filter: any;
  setFilter: any;
}) => {
  const { data: deliveringVoters } = useGetDeliveringVoters(filter);
  const { data: votingDelegates } = useGetVotingDelegates(filter);

  return (
    <VStack gap="16px">
      <StatsSection filter={filter} setFilter={setFilter} />

      <Grid width="100%" gap="16px" gridTemplateColumns="50% auto">
        <Ebox>
          <VStack w="100%" gap="33px" fontSize="20px">
            <HStack w="100%" fontWeight={600}>
              <Text ml="auto">سجل المناديب الرئيسيين</Text>
              <DownloadButton
                url="statistic/election_day/main_mandoub_table"
                fileName="content.xlsx"
              />
            </HStack>

            <ActionDelegatesTable
              filter={filter}
              setFilter={setFilter}
              votingDelegates={
                votingDelegates?.data ? votingDelegates?.data : []
              }
            />
          </VStack>
        </Ebox>

        <Ebox>
          <VStack w="100%" gap="33px" fontSize="20px">
            <HStack w="100%" fontWeight={600}>
              <Text ml="auto">سجل مناديب الحركة</Text>
              <DownloadButton
                url="statistic/election_day/delivery_table"
                fileName="content.xlsx"
              />
            </HStack>

            <VotingTable
              filter={filter}
              setFilter={setFilter}
              deliveringVoters={
                deliveringVoters?.data ? deliveringVoters?.data : ([] as any)
              }
            />
          </VStack>
        </Ebox>
      </Grid>

      <Grid width="100%" gap="16px" gridTemplateColumns="50% auto ">
        <Ebox>
          <VStack w="100%" gap="33px">
            <HStack w="100%" fontWeight={600}>
              <Text ml="auto">أصواتي حسب المناطق</Text>
              <DownloadButton
                url="statistic/election_day/place_of_residence_delivery_table"
                fileName="content.xlsx"
              />
            </HStack>

            <PlaceBasedVotesTable filter={filter} setFilter={setFilter} />
          </VStack>
        </Ebox>

        <Ebox>
          <VStack w="100%" gap="33px" fontSize="20px">
            <HStack w="100%">
              <ActivityChart />
              <Text fontWeight={600}>الأداء</Text>
            </HStack>

            <PerformanceBarChart filter={filter} />
          </VStack>
        </Ebox>
      </Grid>

      <Ebox>
        <ElectionDayVotersTable filter={filter} />
      </Ebox>
    </VStack>
  );
};

export default ElectionDayWindow;
