/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { VStack } from "@chakra-ui/react";
import MyVotesWindow from "@components/content/Dashboard/Home/MyVotesWindow/MyVotesWindow";
import VotersCountWindow from "@components/content/Dashboard/Home/VotersCountWindow/VotersCountWindow";
import { Ebox } from "@components/core";
import { useState } from "react";
import { HomeFilterSection } from "@components/content/Dashboard/Home";
import MyListsWindow from "@components/content/Dashboard/Home/MyListsWindow/MyListsWindow";
import ElectionDayWindow from "@components/content/Dashboard/Home/ElectionDayWindow/ElectionDayWindow";
import SupportersTable from "@components/content/Dashboard/Home/CompanionWindow/SupportersTable";

const HomePage = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [filter, setFilter] = useState<any>({});

  const getComponent = () => {
    if (activeTabIndex === 0)
      return <VotersCountWindow filter={filter} setFilter={setFilter} />;

    if (activeTabIndex === 1)
      return <MyVotesWindow homePage={true} filter={filter} setFilter={setFilter} />;

    if (activeTabIndex === 2) return <MyListsWindow />;

    if (activeTabIndex === 3)
      return (
        <Ebox full>
          <SupportersTable filter={filter} />
        </Ebox>
      );

    if (activeTabIndex === 4) return <ElectionDayWindow filter={filter} />;
  };

  console.log(filter);

  return (
    <VStack spacing="20px" align="stretch">
      <Ebox>
        <HomeFilterSection
          setFilter={setFilter}
          activeTabIndex={activeTabIndex}
          setActiveTabIndex={setActiveTabIndex}
        />
      </Ebox>

      {getComponent()}
    </VStack>
  );
};

export default HomePage;
