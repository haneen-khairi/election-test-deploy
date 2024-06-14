/* eslint-disable @typescript-eslint/no-unused-vars */
import { ETable } from "@components/core";
import useVostersStore from "@store/VostersSotre";
import useColumns from "./useColumns";

const PlaceBasedVotesTable = ({
  withCharts = true,
}: {
  withCharts?: boolean;
}) => {
  const { setPage, page } = useVostersStore();
  // const { data, isLoading, isFetching } = useGetDelegatesVotes();

  // const voters: DelegatesVotes[] = useMemo(
  //   () => (isLoading ? [] : data?.data || []),
  //   [data, isLoading],
  // );

  const { columns } = useColumns(withCharts);

  return (
    <ETable
      columns={columns}
      data={[]}
      // data={voters}
      // isFetching={isFetching}
      // count={data?.count}
      setPage={setPage}
      page={page}
      withPagination
      pageSize={6}
    />
  );
};

export default PlaceBasedVotesTable;
