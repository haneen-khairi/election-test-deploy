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
  ChartEvent,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useGetMyVotesStats } from "@services/hooks/voters/useVoters";
import { VotesStats } from "@services/hooks/voters/Voters";

interface CustomChartElement {
  datasetIndex: number;
  index: number;
}

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

const initialData: {
  status: number;
  count: number;
  percentage: number;
}[] = [100, 80, 60, 40, 20, 0].map((num) => {
  return {
    status: num,
    count: 0,
    percentage: 0,
  };
});

const VotersBarChart = ({
  filter,
  setFilter,
}: {
  filter: any;
  setFilter: any;
}) => {
  const { data, isLoading } = useGetMyVotesStats(filter);

  const sortedData = (
    (data?.data
      ? initialData.map((item) => {
          const curr = data?.data?.filter(
            ({ status }: { status: number }) => status === item.status,
          );

          if (curr.length > 0) {
            return {
              ...item,
              ...curr[0],
            };
          }
          return {
            ...item,
          };
        })
      : []) as VotesStats[]
  ).sort((a, b) => b.status - a.status);

  const colors = [
    "#EEB72A",
    "#1C8FA6",
    "#50B698",
    "#EE882A",
    "#D62C2C",
    "#9F9F9F",
  ];

  const handleBarClick = (
    _event: ChartEvent,
    chartElement: CustomChartElement[],
  ) => {
    if (chartElement.length > 0) {
      const index = chartElement[0].index;
      const clickedStatus = sortedData[index].status;

      setFilter((prev: any) => ({
        ...prev,
        status: clickedStatus || "",
        selectedBarIndex: index,
      }));
    }
  };

  const createChartData = () => {
    const isUndefined =
      !filter?.selectedBarIndex && filter?.selectedBarIndex !== 0;

    const backgroundColors = sortedData?.map((_item, index) => {
      if (isUndefined) return colors;

      return index !== filter?.selectedBarIndex
        ? "#aaaaaa84"
        : colors[filter.selectedBarIndex];
    });

    return {
      labels: sortedData?.map((item) => item.status) || [],
      datasets: [
        {
          data: sortedData?.map((item) => item.count),
          backgroundColor: !isUndefined ? backgroundColors : colors,
          borderColor: !isUndefined ? backgroundColors : colors,
          barThickness: 16,
          borderRadius: 50,
        },
      ],
    };
  };

  return (
    <Box w="100%">
      {sortedData && !isLoading && (
        <Bar
          data={createChartData() as any}
          height="400px"
          options={{
            onClick: handleBarClick,
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            devicePixelRatio: 3,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {},
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
