/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BankIcon,
  CashIcon,
  DBIcon,
  DBTabs,
  DownloadDB,
  ExpensesSquare,
  GoldBars,
  MoneyCoins,
  UpwardArrow,
} from "@assets/icons";
import { Box, Grid, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import { Ebox } from "@components/core";
import { ReactNode, useState } from "react";
import ExpensesBarChart from "../ExpensesBarChart/ExpensesBarChart";
import TabsContainer from "@components/core/tabsContainer/TabsContainer";
import AccountsBarChart from "../AccountsBarChart/AccountsBarChart";
import FinancialTable from "../FinancialTable/FinancialTable";
import {
  ExpenseAccountsData,
  ExpenseSummary,
  FinancialExpenseData,
  IncomeExpensesType,
} from "@services/hooks/expenses/Expenses";
import { displaySpinner } from "@services/utils/displaySpinner";
import {
  useGetExpenseAccountsData,
  useGetExpenseSummary,
  useGetExpensesTypes,
  useGetFinancialExpenseData,
} from "@services/hooks/expenses/useExpenses";

interface SideBox {
  text: string;
  icon: ReactNode;
  number: string | number | ReactNode;
}

const ExpensesWindow = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const { data: expenseSummary, isLoading: isLoading1 } =
    useGetExpenseSummary();
  const { data: expenseAccountsData } = useGetExpenseAccountsData();
  const { data: expensesTypes } = useGetExpensesTypes();
  const { data: financialData } = useGetFinancialExpenseData();

  const topBoxes: SideBox[] = [
    {
      text: "اجمالي المصروفات",
      icon: <CashIcon />,
      number: displaySpinner(
        expenseSummary?.data?.total_expenses,
        isLoading1,
        "---",
      ),
    },
    {
      text: "مصروفات حساباتي",
      icon: <BankIcon />,
      number: displaySpinner(
        expenseSummary?.data?.total_expenses_candidate,
        isLoading1,
        "---",
      ),
    },
    {
      text: "مصروفات المناديب",
      icon: <ExpensesSquare />,
      number: displaySpinner(
        expenseSummary?.data?.total_expenses_mandoob,
        isLoading1,
        "---",
      ),
    },
  ];

  return (
    <VStack gap="16px">
      <HStack justifyContent="space-between" gap="16px" w="100%">
        {topBoxes.map(({ icon, number, text }) => (
          <Ebox>
            <VStack py="16px">
              <HStack justifyContent="center" gap="14px">
                {icon}
                <Text
                  lineHeight="22px"
                  fontWeight={600}
                  fontSize="18px"
                  color={"#C02323"}
                >
                  {text}
                </Text>
              </HStack>
              <Text>{number}</Text>
            </VStack>
          </Ebox>
        ))}
      </HStack>

      <Grid
        templateColumns="auto 35%"
        gridAutoRows="max-content"
        w="100%"
        gap="16px"
        fontSize="18px"
      >
        <Ebox>
          <VStack>
            <HStack w="100%" fontWeight={600}>
              {<DBIcon color="#C02323" />}
              <Text ml="auto">{"أنواع المصاريف"}</Text>
            </HStack>

            <ExpensesBarChart tab={2} data={expensesTypes?.data || {}} />
          </VStack>
        </Ebox>

        <Ebox>
          <HStack w="100%" fontWeight={600} mb="20px" alignItems="center">
            <DBTabs color={"#C02323"} />
            <Text ml="auto">{"مصروفاتي"}</Text>
          </HStack>

          <Box
            display="flex"
            m="auto"
            w="100%"
            justifyContent="center"
            border="1px solid #00000033"
            borderRadius="15px"
            bg="#f8f8f8"
          >
            <TabsContainer
              setActiveTabIndex={setActiveTabIndex}
              color={"#C02323"}
              tabs={[
                {
                  text: "حساباتي",
                },
                {
                  text: "حسابات المناديب",
                },
              ]}
              w="100%"
            />
          </Box>

          <AccountsBarChart
            tab={2}
            data={
              activeTabIndex === 1
                ? expenseAccountsData?.data?.expenses_by_my_accounts || {}
                : expenseAccountsData?.data?.expenses_by_mandoob || {}
            }
          />
        </Ebox>
      </Grid>

      <Ebox>
        <HStack w="100%" fontWeight={600} mb="20px" fontSize="18px">
          <Text ml="auto">المعاملات المالية</Text>
          <DownloadDB />
          <Text color="#318973">تحميل</Text>
        </HStack>

        <FinancialTable tab={2} data={financialData?.data} />
      </Ebox>
    </VStack>
  );
};

export default ExpensesWindow;
