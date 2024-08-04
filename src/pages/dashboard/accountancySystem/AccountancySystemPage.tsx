/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { VStack } from "@chakra-ui/react";
import { ExpensesFilterSection } from "@components/content/Dashboard/Expenses";
import { Ebox } from "@components/core";
import { useState } from "react";
import StatsWindow from "@components/content/Dashboard/Expenses/StatsWindow/StatsWindow";
import IncomeWindow from "@components/content/Dashboard/Expenses/IncomeWindow/IncomeWindow";
import ExpensesWindow from "@components/content/Dashboard/Expenses/ExpensesWindow/ExpensesWindow";

const AccountancySystemPage = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const getComponent = () => {
    if (activeTabIndex === 0) return <StatsWindow />;
    if (activeTabIndex === 1) return <IncomeWindow />;
    if (activeTabIndex === 2) return <ExpensesWindow />;
  };

  return (
    <VStack spacing="20px" align="stretch">
      <Ebox>
        <ExpensesFilterSection
          activeTabIndex={activeTabIndex}
          setActiveTabIndex={setActiveTabIndex}
        />
      </Ebox>

      {getComponent()}
    </VStack>
  );
};

export default AccountancySystemPage;
