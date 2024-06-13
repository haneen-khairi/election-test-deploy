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
import { Doughnut } from "react-chartjs-2";
import { GeneralStats } from "@services/hooks/insights/Insights";
import { ChartEvent } from "chart.js";
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

interface CustomChartElement {
  datasetIndex: number;
  index: number;
}

const FamilyDonutChart = ({
  data,
  isLoading,
  setFilter,
}: {
  data: GeneralStats | undefined;
  isLoading: boolean;
  setFilter: any;
}) => {
  const colors = ["#EE882A", "#2A8A6E"];

  const handleBarClick = (
    _event: ChartEvent,
    chartElement: CustomChartElement[],
  ) => {
    if (chartElement.length > 0) {
      const index = chartElement[0].index;
      setFilter((prev: any) => ({ ...prev, gender: index === 0 ? "M" : "F" }));
    }
  };

  return (
    <Box m="auto">
      {data && !isLoading && (
        <Doughnut
          data={{
            labels: [
              `(${data?.male_percentage}) ذكر`,
              `(${data?.female_percentage}) انثى`,
            ],
            datasets: [
              {
                data: [data?.male_voters, data?.female_voters],
                backgroundColor: colors,
                borderColor: colors,
              },
            ],
          }}
          height="250px"
          width="250px"
          options={{
            onClick: handleBarClick,
            responsive: true,
            maintainAspectRatio: false,
            devicePixelRatio: 3,
            plugins: {
              legend: {
                position: "left",
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
      {isLoading && <ChartSkeleton type="Pie" noLabels={10} />}
    </Box>
  );
};

export default FamilyDonutChart;
