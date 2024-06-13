import { HStack } from "@chakra-ui/react";
import { useGetVotersPercentage } from "@services/hooks/insights/useInsights";
import {
  GuaranteedVotesBox,
  ImponderableVotesBox,
  SwingingVotesBox,
  VotersCountBox,
} from "./partials";
import { ESkeleton } from "@components/core";

const VotersPercentage = () => {
  const { data, isLoading } = useGetVotersPercentage();

  const voterCount = data?.data.voter_count.toLocaleString() || "";
  const assuredPercentage = data?.data.assured_percentage || "";
  const swingingPercentage = data?.data.unassured_percentage || "";
  const imponderablePercentage = data?.data.unassured_percentage || "";

  return (
    <HStack flexWrap="wrap" align="stretch" spacing="16px">
      <ESkeleton isLoading={isLoading}>
        <VotersCountBox value={voterCount} />
      </ESkeleton>
      <ESkeleton isLoading={isLoading}>
        <GuaranteedVotesBox value={assuredPercentage} />
      </ESkeleton>
      <ESkeleton isLoading={isLoading}>
        <SwingingVotesBox value={swingingPercentage} />
      </ESkeleton>
      <ESkeleton isLoading={isLoading}>
        <ImponderableVotesBox value={imponderablePercentage} />
      </ESkeleton>
    </HStack>
  );
};

export default VotersPercentage;
