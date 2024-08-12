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
import { useGetPerformance } from "@services/hooks/voters/useVoters";
import { useMemo } from "react";

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

const PerformanceBarChart = ({ filter }: { filter: any }) => {
  const { data } = useGetPerformance(filter={filter});

  const get24Format = (hours: number): string => {
    if (hours < 0 || hours > 24) return "--";

    return `${(hours % 12 || 12).toString()} ${hours >= 12 ? "م" : "ص"}`;
  };

  const filteredData = useMemo(
    () =>
      data
        ? (Object.entries(data) as any).reduce(
            (acc: any, curr: any) => {
              if (curr[1])
                return {
                  keys: [...acc.keys, get24Format(Number(curr[0]))],
                  values: [...acc.values, curr[1]],
                };
              else
                return {
                  keys: acc.keys,
                  values: acc.values,
                };
            },
            {
              keys: [],
              values: [],
            },
          )
        : [],
    [data],
  );

  return (
    <Box width="100%">
      {data && (
        <Bar
          style={{
            paddingTop: "20px",
          }}
          data={{
            labels: filteredData.keys,
            datasets: [
              {
                data: filteredData.values,
                backgroundColor: "#efffee",
                borderColor: "#96e2b9",
                borderWidth: 2,
                // backgroundColor: tab === 1 ? "#efffee" : "#ffeeee",
                // borderColor: tab === 1 ? "#96e2b9" : "#efa1a1",
                barThickness: 25,
                borderRadius: 5,
              },
            ],
          }}
          height="250px"
          options={{
            responsive: true,
            // maintainAspectRatio: false,
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
              // x: { stacked: true },
              y: {
                ticks: {
                  stepSize: 1,
                },
              },
            },
          }}
        />
      )}
      {!data && <ChartSkeleton type="Bar" noBars={11} />}
    </Box>
  );
};

export default PerformanceBarChart;
