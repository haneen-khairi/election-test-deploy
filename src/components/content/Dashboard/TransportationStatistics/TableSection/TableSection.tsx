import { useMemo } from "react";
import { ETable } from "@components/core";
import useColumns from "../hooks/useColumns";
import { EmptyAsset, NotFound } from "../../../TableAssets";
import { useGetGuaranteedVoters } from "@services/hooks/insights/useInsights";
import { FilterType } from "../../PreliminaryResults/FilterSection/FilterType";
import useTransportationStore from "@store/TransportationStore";

interface Props {
  filter?: FilterType;
}

const TableSection = ({ filter }: Props) => {
  const { data, isLoading, isFetching } = useGetGuaranteedVoters(filter);
  const { setPage, page } = useTransportationStore();

  const GuaranteedVoters = useMemo(
    () => (isLoading ? [] : data?.data || []),
    [data?.data, isLoading]
  );

  const { columns } = useColumns();
  return (
    <>
      <ETable
        columns={columns}
        data={GuaranteedVoters}
        isFetching={isFetching}
        count={data?.count}
        setPage={setPage}
        page={page}
        withPagination
        pageSize={6}
        filter={filter}
        noDataElement={<EmptyAsset />}
        noDataFilterElement={<NotFound />}
      />
    </>
  );
};

export default TableSection;
