/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ETable } from "@components/core";
import useColumns from "./useColumns";
import { useGetPlaceBasedVotes } from "@services/hooks/voters/useVoters";
import { useMemo } from "react";
import usePlaceVotersStore from "@store/PlaceVostersStore";

const PlaceBasedVotesTable = ({
  filter,
  withCharts = true,
  setFilter,
}: {
  filter: any;
  setFilter: any;
  withCharts?: boolean;
}) => {
  const { setPage, page } = usePlaceVotersStore();
  const { data, isLoading, isFetching } = useGetPlaceBasedVotes(filter);

  const votes: any[] = useMemo(
    () => (isLoading ? [] : data?.data || []),
    [data, isLoading],
  );

  const { columns } = useColumns({ withCharts, setFilter,filter });

  return (
    <ETable
      columns={columns}
      data={votes}
      isFetching={isFetching}
      count={data?.count}
      setPage={setPage}
      page={page}
      withPagination
      pageSize={6}
    />
  );
};

export default PlaceBasedVotesTable;
