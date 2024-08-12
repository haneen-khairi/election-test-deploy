import { VStack } from "@chakra-ui/react";
import {
  FilterSection,
  TableSection,
} from "@components/content/Dashboard/Delegates";
import { Ebox } from "@components/core";
import { usePermission } from "@services/hooks/auth/Permission";

const DelegatesPage = () => {
  usePermission("/delegates");

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
