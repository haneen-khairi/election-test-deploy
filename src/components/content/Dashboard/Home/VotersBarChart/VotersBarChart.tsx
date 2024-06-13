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
import { useGetMyVotesStats } from "@services/hooks/voters/useVoters";
import { VotesStats } from "@services/hooks/voters/Voters";

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

const VotersBarChart = ({ filter }: { filter: any }) => {
  const { data, isLoading } = useGetMyVotesStats(filter);
  const sortedData = ((data?.data || []) as VotesStats[]).sort(
    (a, b) => b.status - a.status,
  );

  const colors = [
    "#EEB72A",
    "#1C8FA6",
    "#50B698",
    "#EE882A",
    "#D62C2C",
    "#9F9F9F",
  ];

  return (
    <Box w="100%">
      {sortedData && !isLoading && (
        <Bar
          data={{
            labels: sortedData?.map((item) => item.count) || [],
            datasets: [
              {
                data: sortedData?.map((item) => item.status) || [],
                backgroundColor: colors,
                borderColor: colors,
                barThickness: 16,
                borderRadius: 50,
              },
            ],
          }}
          height="400px"
          options={{
            // onClick: handleBarClick,
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            devicePixelRatio: 3,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const label = context.dataset.label;

                    return label;
                  },
                },
              },
            },
            scales: {
              x: {
                reverse: true,
              },
            },
          }}
        />
      )}
      {isLoading && <ChartSkeleton type="Bar" noBars={11} />}
    </Box>
  );
};

export default VotersBarChart;
