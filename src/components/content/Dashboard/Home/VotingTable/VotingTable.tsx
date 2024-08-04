/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ETable } from "@components/core";
import { useGetDelegatesVotes } from "@services/hooks/voters/useVoters";
import useVostersStore from "@store/VostersSotre";
import useColumns from "./useColumns";
import { DeliveringVote } from "@services/hooks/insights/Insights";

const VotingTable = ({
  filter,
  setFilter,
  deliveringVoters,
}: {
  filter: any;
  setFilter: any;
  deliveringVoters: DeliveringVote;
}) => {
  const { setPage, page } = useVostersStore();
  const { data, isFetching } = useGetDelegatesVotes(filter);

  const { columns } = useColumns({ filter, setFilter });

  return (
    <ETable
      columns={columns}
      data={deliveringVoters}
      isFetching={isFetching}
      count={data?.count}
      setPage={setPage}
      page={page}
      withPagination
      pageSize={6}
    />
  );
};

export default VotingTable;
