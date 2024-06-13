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

const VotersChart = ({ filter }: Props) => {
  const { data, isLoading } = useGetTransportationInsight(filter);
  const colors = ["#318973", "#36A88B"];

  return (
    <Box>
      {data?.data && !isLoading && (
        <Pie
          data={{
            labels: [
              `عدد الناخبين الذين تم نقلهم (${data?.data.voters.total_number_of_delivered_voters})`,
              `اجمالي الناخبين (${data?.data.voters.total_number_of_voters})`,
            ],
            datasets: [
              {
                label: "العدد",
                data: [
                  data?.data.voters.total_number_of_delivered_voters,
                  data?.data.voters.total_number_of_voters,
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

export default VotersChart;
