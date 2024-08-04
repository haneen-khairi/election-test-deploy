/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ETable } from "@components/core";
import useIncomeColumns from "./useIncomeColumns";
import { useMemo } from "react";
import { DelegatesVotes } from "@services/hooks/voters/Voters";
import useExpensesColumns from "./useExpensesColumns";
import useExpensesStore from "@store/ExpensesStore";

const FinancialTable = ({ tab, data }: { tab: 1 | 2; data: any }) => {
  const { setPage, page } = useExpensesStore();

  const financialData: DelegatesVotes[] = useMemo(() => data || [], [data]);

  const { incomeColumns } = useIncomeColumns();
  const { expensesColumns } = useExpensesColumns();

  return (
    <ETable
      columns={tab === 1 ? incomeColumns : expensesColumns}
      data={financialData}
      count={data?.count}
      setPage={setPage}
      page={page}
      withPagination
      pageSize={6}
    />
  );
};

export default FinancialTable;
