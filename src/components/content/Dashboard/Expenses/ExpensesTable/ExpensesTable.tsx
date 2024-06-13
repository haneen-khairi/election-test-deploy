/* eslint-disable @typescript-eslint/no-unused-vars */
import { ETable } from "@components/core";
import useColumns from "./useColumns";
import { useMemo } from "react";
import { useGetExpensesTable } from "@services/hooks/expenses/useExpenses";
import { ExpenseItem } from "@services/hooks/expenses/Expenses";
import useExpensesStore from "@store/ExpensesStore";

const ExpensesTable = () => {
  const { setPage, page } = useExpensesStore();
  const { data, isLoading, isFetching } = useGetExpensesTable();

  const expenses: ExpenseItem[] = useMemo(
    () => (isLoading ? [] : data?.data || []),
    [data, isLoading],
  );

  const { columns } = useColumns();

  return (
    <ETable
      columns={columns}
      data={expenses}
      isFetching={isFetching}
      count={data?.count}
      setPage={setPage}
      page={page}
      withPagination
      pageSize={8}
    />
  );
};

export default ExpensesTable;
