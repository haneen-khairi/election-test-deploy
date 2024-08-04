/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetNamesWithOthers } from "@services/hooks/voters/useVoters";
import useNamesStore from "@store/NamesStore";
import { useMemo } from "react";
import useColumns from "./useColumns";
import { Ebox, ETable } from "@components/core";

const NamesWithOthersPage = () => {
  const { setPage, page } = useNamesStore();
  const { data, isLoading, isFetching } = useGetNamesWithOthers();

  const names = useMemo(
    () => (isLoading ? [] : data?.data || []),
    [data, isLoading],
  );

  const { columns } = useColumns(page || 0);

  return (
    <Ebox>
      <ETable
        columns={columns}
        data={names}
        isFetching={isFetching}
        count={data?.count}
        setPage={setPage}
        page={page}
        withPagination
        pageSize={20}
      />
    </Ebox>
  );
};

export default NamesWithOthersPage;
