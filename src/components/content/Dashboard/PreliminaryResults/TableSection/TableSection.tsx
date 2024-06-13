import { useMemo } from "react";
import { ETable } from "@components/core";
import useColumns from "../hooks/useColumns";
import { FilterType } from "../FilterSection/FilterType";
import { EmptyAsset, NotFound } from "../../../TableAssets";
import { useGetCandidates } from "@services/hooks/insights/useInsights";
import usePreliminaryStore from "@store/PreliminaryStore";

interface Props {
  filter?: FilterType;
}

const TableSection = ({ filter }: Props) => {
  const { data, isLoading, isFetching } = useGetCandidates(filter);
  const { setPage, page } = usePreliminaryStore();

  const candidates = useMemo(
    () => (isLoading ? [] : data?.data || []),
    [data?.data, isLoading]
  );

  const { columns } = useColumns();
  return (
    <>
      <ETable
        columns={columns}
        data={candidates}
        isFetching={isFetching}
        count={data?.count}
        setPage={setPage}
        page={page}
        withPagination
        pageSize={10}
        filter={filter}
        noDataElement={<EmptyAsset />}
        noDataFilterElement={<NotFound />}
      />
    </>
  );
};

export default TableSection;
