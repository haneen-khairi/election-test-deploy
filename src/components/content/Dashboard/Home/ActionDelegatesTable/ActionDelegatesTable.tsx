/* eslint-disable @typescript-eslint/no-unused-vars */
import { ETable } from "@components/core";
import { useGetDelegatesVotes } from "@services/hooks/voters/useVoters";
import useVostersStore from "@store/VostersSotre";
import useColumns from "./useColumns";
import { VotingDelegate } from "@services/hooks/insights/Insights";

const ActionDelegatesTable = ({
  votingDelegates,
}: {
  votingDelegates: VotingDelegate[];
}) => {
  const { setPage, page } = useVostersStore();
  const { data, isFetching } = useGetDelegatesVotes();

  // const voters: DelegatesVotes[] = useMemo(
  //   () => (isLoading ? [] : data?.data || []),
  //   [data, isLoading],
  // );

  const { columns } = useColumns();

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
