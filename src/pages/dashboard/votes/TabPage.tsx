import { VStack } from "@chakra-ui/react";
import { FilterType } from "@components/content/Dashboard/Voters/FilterSection/FilterType";
import {
  FilterSection,
  TableSection,
} from "@components/content/Dashboard/Votes";
import { Ebox } from "@components/core";
import useVostersStore from "@store/VostersSotre";
import { useEffect, useState } from "react";

interface Props {
  status: string;
}
const TabPage = ({ status }: Props) => {
  const [filter, SFilter] = useState<FilterType>();
  const { setPage } = useVostersStore();
  useEffect(() => {
    setPage(1);
    return () => {
      setPage(1);
    };
  }, [status]);
  return (
    <VStack spacing="20px" align="stretch">
      <Ebox title="فلترة البحث">
        <FilterSection SFilter={SFilter} />
      </Ebox>
        <TableSection filter={filter} status={status} />
    </VStack>
  );
};

export default TabPage;
