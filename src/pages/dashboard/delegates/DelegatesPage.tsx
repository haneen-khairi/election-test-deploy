import { VStack } from "@chakra-ui/react";
import {
  FilterSection,
  TableSection,
} from "@components/content/Dashboard/Delegates";
import { Ebox } from "@components/core";

const DelegatesPage = () => {
  return (
    <VStack spacing="20px" align="stretch">
      <Ebox title="فلترة البحث">
        <FilterSection />
      </Ebox>

      <TableSection />
    </VStack>
  );
};

export default DelegatesPage;
