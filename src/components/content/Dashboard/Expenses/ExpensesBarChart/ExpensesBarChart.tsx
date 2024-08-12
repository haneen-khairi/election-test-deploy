import { Box } from "@chakra-ui/react";
import { ChartSkeleton } from "@components/core";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  BarController,
  BarElement,
  LogarithmicScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import { IncomeExpensesType } from "@services/hooks/expenses/Expenses";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  BarController,
  BarElement,
  LogarithmicScale,
);

const ExpensesBarChart = ({
  tab,
  data,
}: {
  tab: 1 | 2;
  data: IncomeExpensesType;
}) => {
  const { names, amounts }: { names: string[]; amounts: number[] } =
    Object.entries(data).reduce(
      (acc, [name, amount]) => {
        return {
          names: [...acc.names, name],
          amounts: [...acc.amounts, amount],
        };
      },
      {
        names: [],
        amounts: [],
      } as { names: string[]; amounts: number[] },
    );

  // const maxCount =
  //   amounts.reduce((acc, curr) => (curr > acc ? curr : acc), 0) || 0;

  return (
    <Box w="100%">
      {names && amounts && (
        <Bar
          style={{
            paddingTop: "20px",
          }}
          data={{
            labels: names,
            datasets: [
              {
                data: amounts,
                backgroundColor: tab === 1 ? "#318973" : "#C02323",
                barThickness: 17,
                borderRadius: 50,
              },
            ],
          }}
          height="450px"
          options={{
            responsive: true,
            maintainAspectRatio: false,
            devicePixelRatio: 3,
            plugins: {
              // tooltip: {
              //   enabled: false,
              // },
              legend: {
                display: false,
              },
            },
            scales: {
              x: {},
              y: {},
            },
          }}
        />
      )}
      {!data && <ChartSkeleton type="Bar" noBars={11} />}
    </Box>
  );
};

export default ExpensesBarChart;
