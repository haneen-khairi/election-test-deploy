/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DBTabs,
  DownloadDB,
  GoldBars,
  MoneyCoins,
  UpwardArrow,
} from "@assets/icons";
import { Box, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import { Ebox } from "@components/core";
import { ReactNode, useState } from "react";
import ExpensesBarChart from "../ExpensesBarChart/ExpensesBarChart";
import TabsContainer from "@components/core/tabsContainer/TabsContainer";
import AccountsBarChart from "../AccountsBarChart/AccountsBarChart";
import FinancialTable from "../FinancialTable/FinancialTable";

import { displaySpinner } from "@services/utils/displaySpinner";
import {
  useGetFinancialIncomeData,
  useGetIncomeAccountsData,
  useGetIncomeSummary,
  useGetIncomeTypes,
} from "@services/hooks/expenses/useExpenses";

interface SideBox {
  text: string;
  icon: ReactNode;
  number: string | number | ReactNode;
}

const IncomeWindow = () => {
  const { data: incomeSummary, isLoading: isLoading1 } = useGetIncomeSummary();
  const { data: incomeAccountsData } = useGetIncomeAccountsData();
  const { data: incomeTypes } = useGetIncomeTypes();
  const { data: financialData } = useGetFinancialIncomeData();

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const topBoxes: SideBox[] = [
    {
      text: "أجمالي الدخل",
      icon: <UpwardArrow color="#12B76A" />,
      number: displaySpinner(
        incomeSummary?.data?.total_income,
        isLoading1,
        "---",
      ),
    },
    {
      text: "حساباتي",
      icon: <GoldBars />,
      number: displaySpinner(
        incomeSummary?.data?.total_income_candidate,
        isLoading1,
        "---",
      ),
    },
    {
      text: "حسابات المناديب",
      icon: <MoneyCoins />,
      number: displaySpinner(
        incomeSummary?.data?.total_income_mandoob,
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
                  color={"#12B76A"}
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
              {<UpwardArrow color="#12B76A" />}
              <Text ml="auto">{"دخل الجهات"}</Text>
            </HStack>

            <ExpensesBarChart tab={1} data={incomeTypes?.data || {}} />
          </VStack>
        </Ebox>

        <Ebox>
          <HStack w="100%" fontWeight={600} mb="20px" alignItems="center">
            <DBTabs color={"#12B76A"} />
            <Text ml="auto">{"الدخل"}</Text>
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
              color={"#318973"}
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
            tab={1}
            data={
              activeTabIndex === 1
                ? incomeAccountsData?.data?.income_by_my_accounts || {}
                : incomeAccountsData?.data?.income_by_mandoob || {}
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

        <FinancialTable tab={1} data={financialData?.data} />
      </Ebox>
    </VStack>
  );
};

export default IncomeWindow;
