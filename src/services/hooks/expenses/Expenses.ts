export type CostType = {
  id: number;
  name: string;
};

export type ExpensesStats = {
  total_income: number;
  total_expenses: number;
  current_amount: number;
};

export type ExpensesChart = {
  income: { [key: string]: number };
  expenses: { [key: string]: number };
};

type ExpenseItemData = null | {
  id: number;
  name: string;
};

export type ExpenseItem = {
  id: number;
  to_account: ExpenseItemData;
  from_account: ExpenseItemData;
  type: ExpenseItemData;
  amount: string;
  image: string;
  date: string;
  time: string;
  is_in: boolean;
};

export type GetExpensesType = {
  id: number;
  cost: CostType;
  name: string;
  amount: string;
  date: string;
  time: string;
};

export type PostPutExpensesType = {
  cost?: number;
  name?: string;
  amount?: string;
  date?: string;
  time?: string;
};

export type IncomeSummary = {
  total_income: number;
  total_income_mandoob: number;
  total_income_candidate: number;
};

export type ExpenseSummary = {
  total_expenses: number;
  total_expenses_mandoob: number;
  total_expenses_candidate: number;
};

export type IncomeAccountsData = {
  income_by_my_accounts: { [key: string]: number };
  income_by_mandoob: { [key: string]: number };
};

export type ExpenseAccountsData = {
  expenses_by_my_accounts: { [key: string]: number };
  expenses_by_mandoob: { [key: string]: number };
};

export type IncomeExpensesType = { [key: string]: number };

export type FinancialIncomeData = {
  id: number;
  from_main_account: string;
  to_main_account: string;
  from_sub_account: string;
  to_sub_account: string;
  amount: string;
  date: string;
  time: string;
};

export type FinancialExpenseData = {
  id: number;
  from_main_account: string;
  to_main_account: string;
  from_sub_account: string;
  to_sub_account: string;
  amount: string;
  date: string;
  time: string;
};
