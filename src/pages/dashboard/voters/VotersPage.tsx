import { VStack } from "@chakra-ui/react";
import {
  FilterSection,
  TableSection,
} from "@components/content/Dashboard/Voters";
import { FilterType } from "@components/content/Dashboard/Voters/FilterSection/FilterType";
import { Ebox } from "@components/core";
import { useState } from "react";

const VotersPage = () => {
  const [filter, SFilter] = useState<FilterType>();
  return (
    <VStack spacing="20px" align="stretch">
      <Ebox title="فلترة البحث">
        <FilterSection SFilter={SFilter} />
      </Ebox>
      <TableSection filter={filter} />
    </VStack>
  );
};

export default VotersPage;
