/* eslint-disable @typescript-eslint/no-unused-vars */
import taskCss from "./tasks.module.css"
import { Box, Flex, Grid, Text, VStack } from "@chakra-ui/react";
import TasksFilterSection from "@components/content/Dashboard/Tasks/TasksFilterSection/TasksFilterSection";
import { Ebox } from "@components/core";
import { useEffect, useState } from "react";
import TasksCard from "./TasksCard";
import axios from "axios";
import useAuthStore from "@store/AuthStore";
import TaskCardStatistics from "./TaskCardStatistics";
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
  const colors = ["#EEB72A","#14B4D2"];

  const [_filter, setFilter] = useState<any>(undefined);
  console.log("🚀 ~ TasksPage ~ _filter:", _filter)
  const [tasks, setTasks] = useState([])
  const [statistics, setStatistics] = useState<any>()
  const {data} = useAuthStore()
  console.log("🚀 ~ TasksPage ~ token:", data?.tokens?.access)
  async function getTasks(){
    try {
      const response = await axios.get(`${import.meta.env.VITE_PRIVATE_API_URL}/task/tasks`, {
        headers: {
          'Authorization': `Bearer ${data?.tokens?.access}` 
        }
      })
      // console.log("🚀 ~ getTasks ~ response:", response.data.data)
      setTasks(response.data.data)
    } catch (error) {
      console.log("🚀 ~ getTasks ~ error:", error)
      
    }
  }
  async function getStatiticsData(date: string = "" , time: string = "", taskType: string = ""){
    try {
    const response = await axios.get(`${import.meta.env.VITE_PRIVATE_API_URL}/task/summary?task_type=${taskType}&date=${date}&time=${time}`, {
        headers: {
          'Authorization': `Bearer ${data?.tokens?.access}` 
        }
      })
      setStatistics(response.data.data)
      // console.log("🚀 ~ getStatiticsData ~ response:", response.data.data)
    } catch (error) {
      console.log("🚀 ~ getStatiticsData ~ error:", error)
      
    }
  }
  useEffect(() => {
    if(_filter === undefined){
      getTasks()
      getStatiticsData()
    }else{
      getStatiticsData(_filter?.date || "", _filter?.time || "", _filter?.type_of_tasks || "")

    }
    return () => {
      
    }
  }, [_filter])
  
  return (
    <VStack spacing="20px" align="stretch">
      <Ebox>
        <TasksFilterSection
          setFilter={setFilter}
          onReset={getStatiticsData}
          onSuccess={()=> {
            console.log("sucesss on filter")
            getStatiticsData(_filter?.date || "", _filter?.time || "", _filter?.type_of_tasks || "")
          }}
        />
      </Ebox>
      <Grid templateColumns="repeat(4, 1fr)" gap={'16px'}>
       
        <Box
        borderRadius={"16px"}
        boxShadow={"0px 3px 12px 0px #0000000F"}
        padding={"16px"}
        backgroundColor={"#fff"}
        >
            <Text>النسبة المئوية للمهام</Text>
          <Flex>
            <div className="">
            <Doughnut
              data={{
                labels: [
                  `منجزة`,
                  `قيد التنفيذ`,
                ],
                datasets: [
                  {
                    data: [statistics?.percentage?.done_percentage, statistics?.percentage?.in_process_percentage],
                    backgroundColor: colors,
                    borderColor: colors,
                  },
                ],
              }}
              height="250px"
              // width="100px"
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

            </div>
          </Flex>
        </Box>
        <TaskCardStatistics status="received" numberOfTasks={statistics?.statistics?.new_tasks?.count} numberOfMondobs={statistics?.statistics?.new_tasks?.mandobs_count}  nameOfCard="تم الإستلام"/>
        <TaskCardStatistics status="inProgress" numberOfTasks={statistics?.statistics?.in_process?.count} numberOfMondobs={statistics?.statistics?.in_process?.mandobs_count} nameOfCard="قيد التنفيذ" />
        <TaskCardStatistics status="done" numberOfTasks={statistics?.statistics.done?.count} numberOfMondobs={statistics?.
statistics?.done?.mandobs_count}  nameOfCard="منجزة"/>
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
        <Flex flexDirection={'column'} gap={'16px'}>
          {statistics?.new_tasks?.count ? statistics?.new_tasks?.tasks?.map((task: any) =><TasksCard
            key={task.id}
            status={task?.status?.name || ""}
            // title="مهمة 1"
            text={task.description}
            representative={task.mandob?.name}
            representativeType={task?.mandob?.group || ""}
            representativeMission={task?.type?.name || ""}
            date={task?.date || ""}
            time={task?.time || ""}
          />): ""}
        </Flex>
        <Flex flexDirection={'column'} gap={'16px'}>
          {statistics?.in_process?.count ? statistics?.in_process?.tasks?.map((task: any) =><TasksCard
            key={task.id}
            status={task?.status?.name || ""}
            // title="مهمة 1"
            text={task.description}
            representative={task.mandob?.name || ""}
            representativeType={task?.mandob?.group || ""}
            representativeMission={task?.type?.name || ""}
            date={task?.date || ""}
            time={task?.time || ""}
          />): ""}
        </Flex>
        <Flex flexDirection={'column'} gap={'16px'}>
          {statistics?.done?.count ? statistics?.done?.tasks?.map((task: any) =><TasksCard
            key={task.id}
            status={task?.status?.name || ""}
            // title="مهمة 1"
            text={task.description}
            representative={task.mandob?.name || ""}
            representativeType={task?.mandob?.group || ""}
            representativeMission={task?.type?.name || ""}
            date={task?.date || ""}
            time={task?.time || ""}
          />) : ""}
        </Flex>
        {/* {tasks?.length && tasks?.map((task: any) =><TasksCard
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
        />)} */}
        </Grid>
    </VStack>
  );
};

export default TasksPage;
