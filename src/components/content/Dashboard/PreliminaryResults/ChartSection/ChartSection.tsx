import { Box } from "@chakra-ui/react";
import { ChartSkeleton } from "@components/core";
import { useGetCandidatesPN } from "@services/hooks/insights/useInsights";

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
import { FilterType } from "../FilterSection/FilterType";

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
const ChartSection = ({ filter }: Props) => {
  const { data, isFetching } = useGetCandidatesPN(filter);

  return (
    <Box>
      {data?.data && !isFetching && (
        <Bar
          data={{
            labels: data?.data.map((item) => item.candidate_name) || [],
            datasets: [
              {
                label: "عدد الأصوات",
                data: data?.data.map((item) => item.total_votes),
                backgroundColor: "#318973",
                barThickness: 50,
              },
            ],
          }}
          height="300px"
          options={{
            responsive: true,
            maintainAspectRatio: false,
            devicePixelRatio: 3,
            skipNull: true,
            plugins: {
              legend: {
                labels: {
                  font: {
                    family: "Aljazeera",
                  },
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
                title: {
                  display: false,
                  text: "Family",
                },
                grid: {
                  display: false,
                },
                ticks: {
                  font: {
                    family: "Aljazeera",
                  },
                },
              },
              y: {
                type: "linear",
                title: {
                  display: false,
                  text: "Count (log scale)",
                },
                grid: {
                  display: true,
                  color: "#eee",
                },
                ticks: {
                  font: {
                    family: "Aljazeera",
                  },
                },
              },
            },
          }}
        />
      )}
      {isFetching && <ChartSkeleton type="Bar" noBars={11} />}
    </Box>
  );
};

export default ChartSection;
