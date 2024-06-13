import { VStack } from "@chakra-ui/react";
import {
  FilterSection,
  TableSection,
} from "@components/content/Dashboard/Delegates";
import { FilterType } from "@components/content/Dashboard/Delegates/FilterSection/FilterType";
import { Ebox } from "@components/core";
import { useState } from "react";

const DelegatesPage = () => {
  const [filter, SFilter] = useState<FilterType | undefined>(undefined);
  return (
    <VStack spacing="20px" align="stretch">
      <Ebox title="فلترة البحث">
        <FilterSection SFilter={SFilter} />
      </Ebox>

      <TableSection filter={filter} />
    </VStack>
  );
};

export default DelegatesPage;
