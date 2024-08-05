/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { HStack, Text, VStack } from "@chakra-ui/react";
import { Ebox, GradientButton } from "@components/core";
import {
  ChartSection,
  FilterSection,
  TableSection,
} from "@components/content/Dashboard/PreliminaryResults";
import { GoDownload } from "react-icons/go";
import { useExportCandidates } from "@services/hooks/insights/useInsights";
import { saveXLSXFile } from "@constants/functions/SaveXLSX";
const PreliminaryResultsPage = () => {
  const [filter, SFilter] = useState<any>({});
  const ex = useExportCandidates();

  const handleExport = () => {
    ex.mutateAsync({}).then((res) => {
      saveXLSXFile(res, "candidates.xlsx");
    });
  };

  return (
    <VStack spacing="20px" align="stretch">
      <Ebox title="فلترة البحث">
        <FilterSection SFilter={SFilter} />
      </Ebox>

      <Ebox
        title="عدد الاصوات"
        element={
          <GradientButton
            h="40px"
            w="100px"
            rounded="8px"
            onClick={handleExport}
            fontWeight="500"
            isLoading={ex.isPending}
          >
            <HStack justifyContent="space-between" alignItems="center">
              <GoDownload />
              <Text>تصدير</Text>
            </HStack>
          </GradientButton>
        }
      >
        <ChartSection filter={filter} />
      </Ebox>
      <Ebox title="المرشحين" full>
        <TableSection filter={filter} />
      </Ebox>
    </VStack>
  );
};

export default PreliminaryResultsPage;
