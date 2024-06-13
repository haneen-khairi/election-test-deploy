import { useState } from "react";
import { FilterType } from "@components/content/Dashboard/PreliminaryResults/FilterSection/FilterType";
import { HStack, VStack } from "@chakra-ui/react";
import { Ebox } from "@components/core";
import { FilterSection } from "@components/content/Dashboard/PreliminaryResults";
import {
  DelegatesChart,
  TableSection,
  VotersChart,
} from "@components/content/Dashboard/TransportationStatistics";

const TransportationStatistics = () => {
  const [filter, SFilter] = useState<FilterType | undefined>(undefined);
  return (
    <VStack spacing="20px" align="stretch">
      <Ebox title="فلترة البحث">
        <FilterSection SFilter={SFilter} />
      </Ebox>
      <HStack spacing="20px" align="stretch">
        <Ebox title="اكثر المناديب وصولاً">
          <DelegatesChart filter={filter} />
        </Ebox>
        <Ebox title="تمثيل الناخبين في الدائرة الانتخابية">
          <VotersChart filter={filter} />
        </Ebox>
      </HStack>
      <Ebox title="الناخبين المضمونين" full>
        <TableSection filter={filter} />
      </Ebox>
    </VStack>
  );
};

export default TransportationStatistics;
