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
  ScriptableContext,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ActivityVote } from "@services/hooks/voters/Voters";

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

const ActivitiesLineChart = ({
  data,
  isLoading,
}: {
  data: ActivityVote[] | undefined;
  isLoading: boolean;
}) => {
  return (
    <Box m="auto" w="100%">
      {data && !isLoading && (
        <Line
          data={{
            labels: data.map((item) => item.label),
            datasets: [
              {
                data: data.map((item) => item.count),
                backgroundColor: (context: ScriptableContext<"line">) => {
                  const ctx = context.chart.ctx;
                  const gradient = ctx.createLinearGradient(0, 0, 0, 600);
                  gradient.addColorStop(0, "#2a8a6fa8");
                  gradient.addColorStop(1, "#fff");
                  return gradient;
                },
                borderWidth: 0,
                fill: true,
                tension: 0.2
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

export default ActivitiesLineChart;
