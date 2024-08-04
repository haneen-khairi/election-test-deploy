/* eslint-disable @typescript-eslint/no-explicit-any */
import APIClient from "@services/api";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  CostType,
  ExpenseAccountsData,
  ExpenseItem,
  ExpenseSummary,
  ExpensesStats,
  IncomeExpensesType,
  GetExpensesType,
  IncomeAccountsData,
  IncomeSummary,
  PostPutExpensesType,
  ExpensesChart,
  FinancialIncomeData,
  FinancialExpenseData,
} from "./Expenses";
import useExpensesStore from "@store/ExpensesStore";
import { ItemResponse } from "@services/structure";

export const useGetCosts = () => {
  const api = new APIClient<CostType>("expense/costs");
  return useQuery({
    queryKey: ["Costs"],
    queryFn: () => api.getList(),
  });
};

export const useGetExpensesStats = () => {
  const api = new APIClient<ExpensesStats>("expense/transaction_summary");
  return useQuery({
    queryKey: ["ExpensesStats"],
    queryFn: () => api.getItem(),
  });
};

export const useGetExpensesChart = () => {
  const api = new APIClient<ExpensesChart>(
    "expense/get_expenses_and_income_chart_data",
  );
  return useQuery({
    queryKey: ["ExpensesChart"],
    queryFn: () => api.getItem(),
  });
};

export const useGetExpensesTable = () => {
  const { page } = useExpensesStore();

  const api = new APIClient<ExpenseItem>(
    "expense/get_expenses_and_income_table",
  );
  return useQuery({
    queryKey: ["ExpensesTable", page],
    queryFn: () =>
      api.getPageintaed({
        params: {
          page: page,
        },
      }),
  });
};

export const useGetAddIncomeAccounts = () => {
  const api = new APIClient<any>("expense/accounts");
  return useQuery({
    queryKey: ["AddIncomeAccounts", "GetAddIncomeTypes"],
    queryFn: () => api.getList(),
  });
};

export const useGetAddIncomeTypes = () => {
  const api = new APIClient<any>("expense/types/in");
  return useQuery({
    queryKey: ["GetAddIncomeTypes"],
    queryFn: () => api.getList(),
  });
};

export const useGetAddExpensesTypes = () => {
  const api = new APIClient<any>("expense/types/out");
  return useQuery({
    queryKey: ["AddExpensesTypes"],
    queryFn: () => api.getList(),
  });
};

export const useGetExpenses = (filter?: any) => {
  const { page } = useExpensesStore();
  const api = new APIClient<GetExpensesType>("expense/expenses");
  return useQuery({
    queryKey: ["Expenses", page, filter],
    queryFn: () =>
      api.getPageintaed({
        params: {
          page: page,
          name: filter?.name,
        },
      }),
    placeholderData: keepPreviousData,
  });
};

export const useGetIncomeSummary = () => {
  const api = new APIClient<IncomeSummary>("expense/income_summary");

  return useQuery({
    queryKey: ["IncomeSummary"],
    queryFn: () => api.getItem(),
  });
};

export const useGetExpenseSummary = () => {
  const api = new APIClient<ExpenseSummary>("expense/expenses_summary");
  return useQuery({
    queryKey: ["ExpenseSummary"],
    queryFn: () => api.getItem(),
  });
};

export const useGetIncomeAccountsData = () => {
  const api = new APIClient<IncomeAccountsData>("expense/income_for_accounts");
  return useQuery({
    queryKey: ["IncomeAccountsData"],
    queryFn: () => api.getItem(),
  });
};

export const useGetExpenseAccountsData = () => {
  const api = new APIClient<ExpenseAccountsData>(
    "expense/get_expenses_for_accounts",
  );
  return useQuery({
    queryKey: ["ExpenseAccountsData"],
    queryFn: () => api.getItem(),
  });
};

export const useGetIncomeTypes = () => {
  const api = new APIClient<IncomeExpensesType>("expense/types_income");

  return useQuery({
    queryKey: ["IncomeTypes"],
    queryFn: () => api.getItem(),
  });
};

export const useGetExpensesTypes = () => {
  const api = new APIClient<IncomeExpensesType>("expense/get_types_expenses");
  return useQuery({
    queryKey: ["ExpensesTypes"],
    queryFn: () => api.getItem(),
  });
};

export const useGetFinancialIncomeData = () => {
  const api = new APIClient<FinancialIncomeData>(
    "expense/get_transaction_income_table",
  );
  return useQuery({
    queryKey: ["FinancialIncomeData"],
    queryFn: () => api.getList(),
  });
};

export const useGetFinancialExpenseData = () => {
  const api = new APIClient<FinancialExpenseData>(
    "expense/get_transaction_expenses_table",
  );
  return useQuery({
    queryKey: ["FinancialExpenseData"],
    queryFn: () => api.getList(),
  });
};

export const useGetExpense = (id: string, isEnabled: boolean) => {
  const api = new APIClient<GetExpensesType>(`expense/expenses/${id}`);
  return useQuery({
    queryKey: ["Expense", id],
    queryFn: () => api.getItem(),
    enabled: !!isEnabled,
  });
};

export const usePutExpense = (id: string) => {
  const clientQuery = useQueryClient();
  const api = new APIClient<PostPutExpensesType>(`expense/expenses/${id}`);
  return useMutation<ItemResponse<string>, Error, PostPutExpensesType>({
    mutationFn: async (data: PostPutExpensesType) => {
      const response = (await api.put(data)) as ItemResponse<string>;
      return response;
    },
    onSuccess: async () => {
      clientQuery.resetQueries({
        queryKey: ["Expenses"],
      });
      clientQuery.resetQueries({
        queryKey: ["Expense"],
        type: "active",
      });
      return "Added";
    },
    onError: (error: Error) => {
      if (error) return error;
    },
  });
};

export const usePostExpense = () => {
  const clientQuery = useQueryClient();
  const api = new APIClient<PostPutExpensesType>(`expense/expenses`);
  return useMutation<ItemResponse<string>, Error, PostPutExpensesType>({
    mutationFn: async (data: PostPutExpensesType) => {
      const response = (await api.post(data)) as ItemResponse<string>;
      return response;
    },
    onSuccess: async () => {
      clientQuery.resetQueries({
        queryKey: ["Expenses"],
      });
      clientQuery.resetQueries({
        queryKey: ["Expense"],
        type: "active",
      });
      return "Added";
    },
    onError: (error: Error) => {
      if (error) return error;
    },
  });
};

export const useAddIncome = () => {
  const clientQuery = useQueryClient();
  const api = new APIClient<any>(`expense/transaction_in`);

  return useMutation<ItemResponse<string>, Error, any>({
    mutationFn: async (data: any) => {
      const response = (await api.post(data)) as ItemResponse<string>;
      return response;
    },
    onSuccess: async () => {
      clientQuery.resetQueries({
        queryKey: ["AddIncome"],
      });
      clientQuery.invalidateQueries({
        queryKey: [
          "IncomeSummary",
          "IncomeAccountsData",
          "IncomeTypes",
          "FinancialIncomeData",
        ],
      });
    },
    onError: (error: Error) => {
      if (error) return error;
    },
  });
};

export const useAddIncomeType = () => {
  const clientQuery = useQueryClient();
  const api = new APIClient<any>(`expense/types`);

  return useMutation<ItemResponse<string>, Error, any>({
    mutationFn: async (data: any) => {
      const response = (await api.post(data)) as ItemResponse<string>;
      return response;
    },
    onSuccess: async () => {
      clientQuery.resetQueries({
        queryKey: ["AddIncomeType", "GetAddIncomeTypes"],
      });
    },
    onError: (error: Error) => {
      if (error) return error;
    },
  });
};

export const useAddAccount = () => {
  const clientQuery = useQueryClient();
  const api = new APIClient<any>(`expense/accounts`);

  return useMutation<ItemResponse<string>, Error, any>({
    mutationFn: async (data: any) => {
      const response = (await api.post(data)) as ItemResponse<string>;
      return response;
    },
    onSuccess: async () => {
      clientQuery.invalidateQueries({
        queryKey: ["IncomeAccountsData", "ExpenseAccountsData"],
      });
    },
    onError: (error: Error) => {
      if (error) return error;
    },
  });
};

export const useAddExpense = () => {
  const clientQuery = useQueryClient();
  const api = new APIClient<any>(`expense/transaction_out`);

  return useMutation<ItemResponse<string>, Error, any>({
    mutationFn: async (data: any) => {
      const response = (await api.post(data)) as any;
      return response;
    },
    onSuccess: async () => {
      clientQuery.invalidateQueries({
        queryKey: [
          "ExpenseSummary",
          "ExpenseAccountsData",
          "ExpensesTypes",
          "FinancialExpenseData",
        ],
      });
    },
    onError: (error: Error) => {
      if (error) return error;
    },
  });
};

export const useTransBetweenAccounts = () => {
  const clientQuery = useQueryClient();
  const api = new APIClient<any>(`expense/transaction`);

  return useMutation<ItemResponse<string>, Error, any>({
    mutationFn: async (data: any) => {
      const response = (await api.post(data)) as ItemResponse<string>;
      return response;
    },
    onSuccess: async () => {
      clientQuery.resetQueries({
        queryKey: ["TransBetweenAccounts"],
      });
    },
    onError: (error: Error) => {
      if (error) return error;
    },
  });
};

export const useDeleteExpense = (id: string) => {
  const clientQuery = useQueryClient();
  const url = new APIClient(`expense/expenses/${id}`);
  return useMutation({
    mutationFn: async () => {
      const response = await url.delete();
      return response;
    },
    onSuccess: async () => {
      clientQuery.resetQueries({
        queryKey: ["Expenses"],
      });

      return "Deleted";
    },
    onError: (error: Error) => {
      if (error) return error;
    },
  });
};
