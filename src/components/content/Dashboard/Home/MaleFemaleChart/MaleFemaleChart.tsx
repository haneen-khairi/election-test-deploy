import { Box } from "@chakra-ui/react";
import { ChartSkeleton } from "@components/core";

import { useGetGeneralStats } from "@services/hooks/insights/useInsights";

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
import { Pie } from "react-chartjs-2";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  BarController,
  BarElement,
  LogarithmicScale
);

const MaleFemaleChart = () => {
  const { data, isLoading } = useGetGeneralStats();
  const colors = ["#318973", "#36A88B"];

  return (
    <Box>
      {data?.data && !isLoading && (
        <Pie
          data={{
            labels: [
              `اناث (${data?.data.female_percentage})`,
              `ذكور (${data?.data.male_percentage})`,
            ],
            datasets: [
              {
                label: "النسبة(%)",
                data: [
                  parseFloat(data?.data.female_percentage.replace("%", "")),
                  parseFloat(data?.data.male_percentage.replace("%", "")),
                ],
                backgroundColor: colors,
                borderColor: colors,
              },
            ],
          }}
          height="300px"
          options={{
            responsive: true,
            maintainAspectRatio: false,
            devicePixelRatio: 3,
            plugins: {
              legend: {
                position: "right",
                labels: {
                  font: {
                    family: "Aljazeera",
                    weight: "normal",
                    size: 10,
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
              tooltip: {
                bodyFont: {
                  family: "Aljazeera",
                },
                titleFont: {
                  family: "Aljazeera",
                },
              },
            },
            scales: {
              x: {
                display: false,
              },
              y: {
                display: false,
              },
            },
          }}
        />
      )}

      {isLoading && <ChartSkeleton type="Pie" noLabels={2} />}
    </Box>
  );
};

export default MaleFemaleChart;
