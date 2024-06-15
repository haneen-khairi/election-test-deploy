/* eslint-disable @typescript-eslint/no-unused-vars */
import taskCss from "./tasks.module.css"
import { Box, Flex, Grid, Tag, TagLabel, Text, VStack } from "@chakra-ui/react";
import TasksFilterSection from "@components/content/Dashboard/Tasks/TasksFilterSection/TasksFilterSection";
import { Ebox } from "@components/core";
import { useEffect, useState } from "react";
import TasksCard from "./TasksCard";
import axios from "axios";
import useAuthStore from "@store/AuthStore";
import TaskCardStatistics from "./TaskCardStatistics";
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
const TasksPage = () => {
  const colors = ["#14B4D2", "#EEB72A"];

  const [_filter, setFilter] = useState(undefined);
  const [tasks, setTasks] = useState([])
  const {data} = useAuthStore()
  async function getTasks(){
    try {
      const response = await axios.get(`${import.meta.env.VITE_PRIVATE_API_URL}/task/tasks`, {
        headers: {
          'Authorization': `Bearer ${data?.tokens?.access}` 
        }
      })
      console.log("🚀 ~ getTasks ~ response:", response.data.data)
      setTasks(response.data.data)
    } catch (error) {
      console.log("🚀 ~ getTasks ~ error:", error)
      
    }
  }
  useEffect(() => {
    getTasks()
  
    return () => {
      
    }
  }, [])
  
  return (
    <VStack spacing="20px" align="stretch">
      <Ebox>
        <TasksFilterSection
          setFilter={setFilter}
          onSuccess={getTasks}
        />
      </Ebox>
      <Grid templateColumns="repeat(3, 1fr)" gap={'16px'}>
        {/* <Box borderRadius={'16px'} boxShadow={'0px 3px 12px 0px #0000000F'} padding={'16px'} backgroundColor={'#fff'}>
          <Tag
            borderRadius='full'
            variant='solid'
            backgroundColor='#2F80ED1A'
            borderColor={'#14B4D2'}
          >
            <TagLabel color={'#15B2CE'}>قيد التنفيذ</TagLabel>
          </Tag>
          <Grid templateColumns="repeat(2, 1fr)">
            <div className="">
              <Text textAlign={'center'} mb={'24px'}>عدد المهام</Text>
              <Text textAlign={'center'}>4</Text>

            </div>
            <div className="">
              <Text textAlign={'center'} mb={'24px'}>عدد المناديب</Text>
              <Text textAlign={'center'}>4</Text>

            </div>
          </Grid>
        </Box> */}
        {/* <Box
        borderRadius={"16px"}
        boxShadow={"0px 3px 12px 0px #0000000F"}
        padding={"16px"}
        backgroundColor={"#fff"}
        >
          <Flex>
            <Text>النسبة المئوية للمهام</Text>
            <Doughnut
          data={{
            labels: [
              ` منجزة`,
              ` قيد التنفيذ`,
            ],
            datasets: [
              {
                data: [75, 15],
                backgroundColor: colors,
                borderColor: colors,
              },
            ],
          }}
          height="250px"
          width="250px"
          options={{
            // onClick: handleBarClick,
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
          </Flex>
        </Box> */}
        <TaskCardStatistics status="received" numberOfTasks={0} numberOfMondobs={4}  nameOfCard="تم الإستلام"/>
        <TaskCardStatistics status="inProgress" numberOfTasks={0} numberOfMondobs={4} nameOfCard="قيد التنفيذ" />
        <TaskCardStatistics status="done" numberOfTasks={0} numberOfMondobs={4}  nameOfCard="منجزة"/>
      </Grid>
      <Grid  templateColumns="repeat(3, 1fr)" gap={'16px'}>
        <div className={`${taskCss.card} ${taskCss.election__type} ${taskCss.new}`}>
          <div className={taskCss.card__body}>
            <h4 className={taskCss.election__type__header}>مهام جديدة </h4> 
          </div>
        </div>
        <div className={`${taskCss.card} ${taskCss.election__type} ${taskCss.to_do}`}>
          <div className={taskCss.card__body}>
            <h4 className={taskCss.election__type__header}>قيد التنفيذ</h4> 
          </div>
        </div>
        <div className={`${taskCss.card} ${taskCss.election__type} ${taskCss.completed}`}>
          <div className={taskCss.card__body}>
            <h4 className={taskCss.election__type__header}>مهام منجزة</h4> 
          </div>
        </div>
      </Grid>
      <Grid  templateColumns="repeat(3, 1fr)" gap={'16px'}>
        {tasks?.length && tasks?.map((task: any) =><TasksCard
          key={task.id}
          status={task?.status?.name || ""}
          title="مهمة 1"
          text={task.description}
          representative={task?.mondob?.name || ""}
          representativeType={task?.type?.name || ""}
          representativeMission="مهمة 1"
          date={task?.date || ""}
          time={task?.time || ""}
        />)}
        </Grid>

      {/* <TableSection filter={filter} /> */}
    </VStack>
  );
};

export default TasksPage;
