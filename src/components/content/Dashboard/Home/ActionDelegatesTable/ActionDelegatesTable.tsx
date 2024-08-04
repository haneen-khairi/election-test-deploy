/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ETable } from "@components/core";
import { useGetDelegatesVotes } from "@services/hooks/voters/useVoters";
import useVostersStore from "@store/VostersSotre";
import useColumns from "./useColumns";
import { VotingDelegate } from "@services/hooks/insights/Insights";

const ActionDelegatesTable = ({
  filter,
  setFilter,
  votingDelegates,
}: {
  filter: any;
  setFilter: any;
  votingDelegates: VotingDelegate[];
}) => {
  const { setPage, page } = useVostersStore();
  const { data, isFetching } = useGetDelegatesVotes(filter);

  // const voters: DelegatesVotes[] = useMemo(
  //   () => (isLoading ? [] : data?.data || []),
  //   [data, isLoading],
  // );

  const { columns } = useColumns({ setFilter, filter });

  return (
    <ETable
      columns={columns}
      data={votingDelegates}
      isFetching={isFetching}
      count={data?.count}
      setPage={setPage}
      page={page}
      withPagination
      pageSize={6}
    />
  );
};

export default ActionDelegatesTable;
