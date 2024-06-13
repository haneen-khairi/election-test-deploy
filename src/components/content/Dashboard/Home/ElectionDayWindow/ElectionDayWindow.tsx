/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActivityChart, DownloadDB } from "@assets/icons";
import { Button, Grid, HStack, Text, VStack } from "@chakra-ui/react";
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

const ElectionDayWindow = ({ filter }: { filter: any }) => {
  const { data: deliveringVoters } = useGetDeliveringVoters();
  const { data: votingDelegates } = useGetVotingDelegates();

  return (
    <VStack gap="16px">
      <StatsSection />

      <Grid width="100%" gap="16px" gridTemplateColumns="repeat(2, 1fr)">
        <Ebox>
          <VStack w="100%" gap="33px" fontSize="20px">
            <HStack w="100%" fontWeight={600}>
              <Text ml="auto">جدول الانتخاب</Text>
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

            <VotingTable
              deliveringVoters={
                deliveringVoters?.data ? deliveringVoters?.data : ([] as any)
              }
            />
          </VStack>
        </Ebox>

        <Ebox>
          <VStack w="100%" gap="33px" fontSize="20px">
            <HStack w="100%" fontWeight={600}>
              <Text ml="auto">سجل مناديب الحركة</Text>
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

            <ActionDelegatesTable
              votingDelegates={
                votingDelegates?.data ? votingDelegates?.data : []
              }
            />
          </VStack>
        </Ebox>
      </Grid>

      <Grid width="100%" gap="16px" gridTemplateColumns="auto 55%">
        <Ebox>
          <VStack w="100%" gap="33px" fontSize="20px">
            <HStack w="100%" fontWeight={600}>
              <Text ml="auto">أصواتي حسب المناطق</Text>
              <DownloadDB />
              <Text color="#318973">تحميل</Text>
            </HStack>

            <PlaceBasedVotesTable />
          </VStack>
        </Ebox>

        <Ebox>
          <VStack w="100%" gap="33px" fontSize="20px">
            <HStack w="100%">
              <ActivityChart />
              <Text fontWeight={600}>الأداء</Text>
            </HStack>
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
