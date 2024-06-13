import { Box } from "@chakra-ui/react";
import { ChartSkeleton } from "@components/core";
import { useGetTransportationInsight } from "@services/hooks/insights/useInsights";

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
import { FilterType } from "../../PreliminaryResults/FilterSection/FilterType";
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

interface Props {
  filter?: FilterType;
}

const DelegatesChart = ({ filter }: Props) => {
  const { data, isLoading } = useGetTransportationInsight(filter);
  const colors = [
    "#F765A3",
    "#81D4FA",
    "#55A7F3",
    "#FF991F",
    "#F7B465",
    "#318973",
    "#313A89",
    "#1870B0",
    "#318973",
    "#36A88B",
    "#CB65F7",
  ];

  return (
    <Box>
      {data?.data && !isLoading && (
        <Pie
          data={{
            labels: data.data.mandeeb.map(
              (item) => item.name + ` (${item.delivered_percentage})`
            ),
            datasets: [
              {
                label: "النسبة (%)",
                data: data.data.mandeeb.map((item) =>
                  parseFloat(
                    item.delivered_percentage.toString().replace("%", "")
                  )
                ),
                backgroundColor: colors,
                borderColor: colors,
              },
            ],
          }}
          height="300px"
          width="300px"
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
      {isLoading && <ChartSkeleton type="Pie" noLabels={10} />}
    </Box>
  );
};

export default DelegatesChart;
