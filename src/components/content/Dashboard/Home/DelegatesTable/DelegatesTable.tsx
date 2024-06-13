/* eslint-disable @typescript-eslint/no-unused-vars */
import { ETable } from "@components/core";
import { useGetDelegatesVotes } from "@services/hooks/voters/useVoters";
import useVostersStore from "@store/VostersSotre";
import useColumns from "./useColumns";
import { useMemo } from "react";
import { DelegatesVotes } from "@services/hooks/voters/Voters";

const DelegatesTable = () => {
  const { setPage, page } = useVostersStore();
  const { data, isLoading, isFetching } = useGetDelegatesVotes();

  const voters: DelegatesVotes[] = useMemo(
    () => (isLoading ? [] : data?.data || []),
    [data, isLoading],
  );

  const { columns } = useColumns();

  return (
    <ETable
      columns={columns}
      data={voters}
      isFetching={isFetching}
      count={data?.count}
      setPage={setPage}
      page={page}
      withPagination
      pageSize={6}
    />
  );
};

export default DelegatesTable;
