/* eslint-disable @typescript-eslint/no-explicit-any */
import { VStack } from "@chakra-ui/react";
import MyVotesWindow from "@components/content/Dashboard/Home/MyVotesWindow/MyVotesWindow";
import VotersCountWindow from "@components/content/Dashboard/Home/VotersCountWindow/VotersCountWindow";
import { Ebox } from "@components/core";
import { useState } from "react";
import { HomeFilterSection } from "@components/content/Dashboard/Home";
import MyListsWindow from "@components/content/Dashboard/Home/MyListsWindow/MyListsWindow";
import ElectionDayWindow from "@components/content/Dashboard/Home/ElectionDayWindow/ElectionDayWindow";
import SupportersTable from "@components/content/Dashboard/Home/CompanionWindow/SupportersTable";
import { usePermission } from "@services/hooks/auth/Permission";

const HomePage = () => {
  const { allowList } = usePermission();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [filter, setFilter] = useState<any>({});

  const getComponents = () => {
    if (allowList?.candidate) {
      if (activeTabIndex === 0)
        return <VotersCountWindow filter={filter} setFilter={setFilter} />;

      if (activeTabIndex === 1)
        return (
          <MyVotesWindow
            homePage={true}
            filter={filter}
            setFilter={setFilter}
          />
        );

      if (activeTabIndex === 2) return <MyListsWindow />;

      if (activeTabIndex === 3)
        return (
          <Ebox full>
            <SupportersTable filter={filter} />
          </Ebox>
        );

      if (activeTabIndex === 4)
        return <ElectionDayWindow filter={filter} setFilter={setFilter} />;
    } else {
      if (activeTabIndex === 0)
        return (
          <MyVotesWindow
            homePage={true}
            filter={filter}
            setFilter={setFilter}
          />
        );

      if (activeTabIndex === 1) return <MyListsWindow />;
    }
  };

  return (
    <VStack spacing="20px" align="stretch">
      <Ebox>
        <HomeFilterSection
          setFilter={setFilter}
          filter={filter}
          activeTabIndex={activeTabIndex}
          setActiveTabIndex={setActiveTabIndex}
        />
      </Ebox>

      {getComponents()}
    </VStack>
  );
};

export default HomePage;
