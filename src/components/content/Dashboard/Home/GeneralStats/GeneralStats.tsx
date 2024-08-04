import { HStack, useBreakpointValue } from "@chakra-ui/react";
import { ESkeleton } from "@components/core";
import {
  BMandobCountBoxt,
  CentersCountBox,
  FamilyCountBox,
  FamlilyMCountBox,
  FemaleCountBox,
  HarakaManobCountBox,
  MainManobCountBox,
  MaleCountBox,
} from "./partials";
import { useGetVotersStats } from "@services/hooks/voters/useVoters";

const GeneralStats = () => {
  const { data, isLoading } = useGetVotersStats({});
  const width = useBreakpointValue({
    base: "100%",
    md: "48%",
    lg: "25%",
    xl: "20%",
  });

  return (
    <HStack
      flexWrap="wrap"
      align="stretch"
      justifyContent="space-between"
      spacing="16px"
    >
      <ESkeleton isLoading={isLoading} w={width}>
        <CentersCountBox value={data?.data.voting_center_count || 0} />
      </ESkeleton>
      <ESkeleton isLoading={isLoading} w={width}>
        <MainManobCountBox value={data?.data.manadeeb_raeesi_count || 0} />
      </ESkeleton>
      <ESkeleton isLoading={isLoading} w={width}>
        <HarakaManobCountBox value={data?.data.manadeeb_haraka_count || 0} />
      </ESkeleton>
      <ESkeleton isLoading={isLoading} w={width}>
        <BMandobCountBoxt value={data?.data.manadeeb_sandoq_count || 0} />
      </ESkeleton>
      <ESkeleton isLoading={isLoading} w={width}>
        <FamilyCountBox value={data?.data.unique_last_names_count || 0} />
      </ESkeleton>
      <ESkeleton isLoading={isLoading} w={width}>
        <FamlilyMCountBox value={data?.data.total_voters || 0} />
      </ESkeleton>
      <ESkeleton isLoading={isLoading} w={width}>
        <MaleCountBox value={data?.data.male_voters || 0} />
      </ESkeleton>
      <ESkeleton isLoading={isLoading} w={width}>
        <FemaleCountBox value={data?.data.female_voters || 0} />
      </ESkeleton>
    </HStack>
  );
};

export default GeneralStats;
