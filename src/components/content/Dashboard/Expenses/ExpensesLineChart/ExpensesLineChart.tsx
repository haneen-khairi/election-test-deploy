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
  LogarithmicScale,
  LineController,
  LineElement,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ExpensesChart } from "@services/hooks/expenses/Expenses";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
  LineElement,
  LogarithmicScale,
  Filler,
);

const ExpensesLineChart = ({
  data,
  isLoading,
}: {
  data: ExpensesChart | undefined;
  isLoading: boolean;
}) => {
  const labels = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو ",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];

  return (
    <Box m="auto" w="100%">
      {data?.income && data?.expenses && !isLoading && (
        <Line
          data={{
            labels,
            datasets: [
              {
                data: Object.values(data?.income),
                borderColor: "#2a8a6fa8",
                borderWidth: 3,
                tension: 0.3
              },
              {
                data: Object.values(data?.expenses),
                borderColor: "#C02323",
                borderWidth: 3,
                tension: 0.3
              },
            ],
          }}
          height="500px"
          options={{
            responsive: true,
            maintainAspectRatio: false,
            devicePixelRatio: 3,
            plugins: {
              legend: {
                display: false,
                labels: {
                  font: {
                    family: "Aljazeera",
                    weight: "normal",
                    size: 16,
                  },
                  pointStyleWidth: 10,
                  boxHeight: 7,
                  boxWidth: 9,
                  padding: 14,
                  color: "black",
                  usePointStyle: true,
                  pointStyle: "rectRounded",
                },
              },
            },
            scales: {
              x: {},
              y: { beginAtZero: true },
            },
          }}
        />
      )}
      {isLoading && <ChartSkeleton type="Bar" noLabels={10} />}
    </Box>
  );
};

export default ExpensesLineChart;
