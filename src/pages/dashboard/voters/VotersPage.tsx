/* eslint-disable @typescript-eslint/no-explicit-any */
import { VStack } from "@chakra-ui/react";
import {
  FilterSection,
  TableSection,
} from "@components/content/Dashboard/Voters";
import { Ebox } from "@components/core";
import { useState } from "react";

const VotersPage = () => {
  const [filter, setFilter] = useState<any>({});

  return (
    <VStack spacing="20px" align="stretch">
      <Ebox title="فلترة البحث">
        <FilterSection setFilter={setFilter} filter={filter} />
      </Ebox>

      <TableSection filter={filter} />
    </VStack>
  );
};

export default VotersPage;
