import { Box } from "@chakra-ui/react";
import { ChartSkeleton } from "@components/core";
import { useGetTopFamilies } from "@services/hooks/insights/useInsights";
import useDashboardFilter from "@store/DashboardFilter";
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
interface CustomChartElement {
  datasetIndex: number;
  index: number;
}

const FamilyBarChartSection = () => {
  const { data, isLoading } = useGetTopFamilies();
  const { setFilter } = useDashboardFilter();
  const filteredData = useFilterFamilyData(data);

  const handleBarClick = (
    _event: ChartEvent,
    chartElement: CustomChartElement[]
  ) => {
    if (chartElement.length > 0) {
      const index = chartElement[0].index;
      const clickedFamily = filteredData?.data[index].family;
      setFilter({ last_name: clickedFamily || "" });
    }
  };

  return (
    <Box>
      {filteredData?.data && !isLoading && (
        <Bar
          data={{
            labels: filteredData?.data.map((item) => item.family) || [],
            datasets: [
              {
                label: "عدد الأفراد",
                data: filteredData?.data.map((item) => item.count),
                backgroundColor: "#318973",
                barThickness: 50,
              },
            ],
          }}
          height="300px"
          options={{
            onClick: handleBarClick,
            responsive: true,
            maintainAspectRatio: false,
            devicePixelRatio: 3,
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
                type: "logarithmic",
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
      {isLoading && <ChartSkeleton type="Bar" noBars={11} />}
    </Box>
  );
};

export default FamilyBarChartSection;
