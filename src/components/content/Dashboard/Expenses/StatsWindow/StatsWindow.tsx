/* eslint-disable @typescript-eslint/no-explicit-any */
import { DBPlusIcon } from "@assets/icons";
import { Grid, HStack, Text, VStack } from "@chakra-ui/react";
import { Ebox } from "@components/core";
import { DBIcon, UpwardArrow } from "@assets/icons";
import { ReactNode } from "react";
import ExpensesTable from "../ExpensesTable/ExpensesTable";
import ExpensesLineChart from "../ExpensesLineChart/ExpensesLineChart";
import {
  useGetExpensesChart,
  useGetExpensesStats,
} from "@services/hooks/expenses/useExpenses";
import { displaySpinner } from "@services/utils/displaySpinner";
import DownloadButton from "@components/core/downloadButton/DownloadButton";

interface SideBox {
  text: string;
  icon: ReactNode;
  number: string | number | ReactNode;
}

const StatsWindow = () => {
  const { data: expensesStats, isLoading: isLoading1 } = useGetExpensesStats();
  const { data: expensesChart, isLoading: isLoading2 } = useGetExpensesChart();

  const rightSideBoxes: SideBox[] = [
    {
      text: "الرصيد الحالي",
      icon: <></>,
      number: displaySpinner(
        expensesStats?.data?.current_amount,
        isLoading1,
        "---",
      ),
    },
    {
      text: "الدخل",
      icon: <UpwardArrow />,
      number: displaySpinner(
        expensesStats?.data?.total_income,
        isLoading1,
        "---",
      ),
    },
    {
      text: "المصروفات",
      icon: <DBIcon />,
      number: displaySpinner(
        expensesStats?.data?.total_expenses,
        isLoading1,
        "---",
      ),
    },
  ];

  return (
    <VStack gap="16px">
      <Grid
        w="100%"
        gap="16px"
        templateColumns="30% auto"
        gridAutoRows="max-content"
      >
        <VStack justifyContent="space-between" gap="15px">
          {rightSideBoxes.map(({ icon, number, text }) => (
            <Ebox h="100%">
              <VStack py="16px" fontWeight={600} fontSize="20px">
                <HStack justifyContent="center" gap="14px">
                  {icon}
                  <Text lineHeight="22px">{text}</Text>
                </HStack>
                <Text>{number} JOD</Text>
              </VStack>
            </Ebox>
          ))}
        </VStack>

        <Ebox>
          <HStack w="100%" fontWeight={600} mb="20px">
            <Text ml="auto">جدول الدخل والمصروفات</Text>
            <DownloadButton
              url="expense/get_expenses_and_income_table"
              fileName="content.xlsx"
            />
          </HStack>

          <ExpensesTable />
        </Ebox>
      </Grid>

      <Ebox>
        <VStack>
          <HStack w="100%" fontWeight={600} mb="20px" alignItems="center">
            <DBPlusIcon />
            <Text ml="auto">الدخل والمصروفات</Text>
            <div
              style={{
                backgroundColor: "#12B76A",
                width: "10px",
                height: "10px",
                borderRadius: "100%",
              }}
            />
            <Text>الدخل</Text>
            <div
              style={{
                backgroundColor: "#D04343",
                width: "10px",
                height: "10px",
                borderRadius: "100%",
                marginRight: "10px",
              }}
            />
            <Text>المصروفات</Text>
          </HStack>

          <ExpensesLineChart
            data={expensesChart as any}
            isLoading={isLoading2}
          />
        </VStack>
      </Ebox>
    </VStack>
  );
};

export default StatsWindow;
