/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@chakra-ui/react";
import { ChartSkeleton } from "@components/core";
import { useGetTopFamilies } from "@services/hooks/insights/useInsights";
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
  ChartEvent,
  LogarithmicScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import useFilterFamilyData from "../../Delegates/hooks/useFilterFamilyData";
import "chartjs-plugin-datalabels";

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

const FamilyRepBarChart = ({
  filter,
  setFilter,
}: {
  filter: any;
  setFilter: any;
}) => {
  const { data, isLoading } = useGetTopFamilies(filter);
  const filteredData = useFilterFamilyData(data);

  const handleBarClick = (
    _event: ChartEvent,
    chartElement: CustomChartElement[],
  ) => {
    if (chartElement?.length > 0) {
      const index = chartElement[0].index;
      const clickedFamily = filteredData?.data[index].family;

      setFilter((prev: any) => ({
        ...prev,
        last_name: clickedFamily || "",
        selectedBarIndex: index,
      }));
    }
  };

  // const maxCount = useMemo(
  //   () =>
  //     filteredData?.data.reduce(
  //       (acc, curr) => (curr.count > acc ? curr.count : acc),
  //       0,
  //     ) || 0,
  //   [filteredData],
  // );

  const createChartData = () => {
    const backgroundColors = filteredData?.data.map((_item, index) => {
      if (!filter?.selectedBarIndex && filter?.selectedBarIndex !== 0)
        return "#318973";

      return index !== filter?.selectedBarIndex ? "#aaaaaa84" : "#318973";
    });

    return {
      labels: filteredData?.data.map((item) => item.family) || [],
      datasets: [
        {
          data: filteredData?.data.map((item) => item.count),
          backgroundColor: backgroundColors,
          barThickness: 17,
          borderRadius: 50,
        },
      ],
    };
  };

  return (
    <Box>
      {filteredData?.data && !isLoading && (
        <Bar
          style={{ paddingTop: "20px" }}
          data={createChartData()}
          height="400px"
          options={{
            onClick: handleBarClick,
            responsive: true,
            maintainAspectRatio: false,
            devicePixelRatio: 3,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              x: { stacked: true },
              y: {},
            },
          }}
        />
      )}
      {isLoading && <ChartSkeleton type="Bar" noBars={11} />}
    </Box>
  );
};

export default FamilyRepBarChart;
