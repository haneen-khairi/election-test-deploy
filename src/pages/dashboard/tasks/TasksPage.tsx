/* eslint-disable @typescript-eslint/no-unused-vars */
import taskCss from "./tasks.module.css"
import { Grid, VStack } from "@chakra-ui/react";
import TasksFilterSection from "@components/content/Dashboard/Tasks/TasksFilterSection/TasksFilterSection";
import { Ebox } from "@components/core";
import { useEffect, useState } from "react";
import TasksCard from "./TasksCard";
import axios from "axios";
import useAuthStore from "@store/AuthStore";

const TasksPage = () => {
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
