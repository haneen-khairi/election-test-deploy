/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ETable } from "@components/core";
import { useGetDelegatesVotes } from "@services/hooks/voters/useVoters";
import useVostersStore from "@store/VostersSotre";
import useColumns from "./useColumns";
import { useMemo } from "react";
import { DelegatesVotes } from "@services/hooks/voters/Voters";

const DelegatesTable = ({
  filter,
  setFilter,
}: {
  filter: any;
  setFilter: any;
}) => {
  const { setPage, page } = useVostersStore();
  const { data, isLoading, isFetching } = useGetDelegatesVotes(filter);

  const delegates: DelegatesVotes[] = useMemo(
    () => (isLoading ? [] : data?.data?.filter((item: any) => item.name) || []),
    [data, isLoading],
  );

  const { columns } = useColumns({ setFilter, filter });

  return (
    <ETable
      columns={columns}
      data={delegates}
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
