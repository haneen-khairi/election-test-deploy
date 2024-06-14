/* eslint-disable @typescript-eslint/no-unused-vars */
import taskCss from "./tasks.module.css"
import { Grid, VStack } from "@chakra-ui/react";
import TasksFilterSection from "@components/content/Dashboard/Tasks/TasksFilterSection/TasksFilterSection";
import { Ebox } from "@components/core";
import { useState } from "react";
import TasksCard from "./TasksCard";

const TasksPage = () => {
  const [_filter, setFilter] = useState(undefined);
  return (
    <VStack spacing="20px" align="stretch">
      <Ebox>
        <TasksFilterSection
          setFilter={setFilter}
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
        <TasksCard
          title="مهمة 1"
          text="تم تنفيذ المهمة"
          representative="مندوب 1"
          representativeType="مندوب عام"
          representativeMission="مهمة 1"
          date="12/12/2021"
          time="12:00"
        />
        </Grid>

      {/* <TableSection filter={filter} /> */}
    </VStack>
  );
};

export default TasksPage;
