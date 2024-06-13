/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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

const AccountsBarChart = ({
  data,
  tab,
}: {
  data: { [key: string]: number };
  tab: number;
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

  return (
    <Box>
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
                backgroundColor: tab === 1 ? "#efffee" : "#ffeeee",
                borderColor: tab === 1 ? "#96e2b9" : "#efa1a1",
                borderWidth: 2,
                barThickness: 70,
                borderRadius: 12,
              },
            ],
          }}
          height="400px"
          options={{
            responsive: true,
            maintainAspectRatio: false,
            devicePixelRatio: 3,
            plugins: {
              tooltip: {
                enabled: false,
              },
              legend: {
                display: false,
              },
            },
            scales: {
              x: { stacked: true },
              y: {},
            },
          }}
        />
      )}
      {!data && <ChartSkeleton type="Bar" noBars={11} />}
    </Box>
  );
};

export default AccountsBarChart;
