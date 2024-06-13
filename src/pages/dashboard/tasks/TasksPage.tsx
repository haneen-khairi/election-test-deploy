/* eslint-disable @typescript-eslint/no-unused-vars */
import { VStack } from "@chakra-ui/react";
import TasksFilterSection from "@components/content/Dashboard/Tasks/TasksFilterSection/TasksFilterSection";
import { Ebox } from "@components/core";
import { useState } from "react";

const TasksPage = () => {
  const [filter, setFilter] = useState(undefined);
  return (
    <VStack spacing="20px" align="stretch">
      <Ebox>
        <TasksFilterSection
          setFilter={setFilter}
        />
      </Ebox>

      {/* <TableSection filter={filter} /> */}
    </VStack>
  );
};

export default TasksPage;
