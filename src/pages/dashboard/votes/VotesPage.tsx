import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import TabPage from "./TabPage";

const tabsData = [
  { label: "الأصوات المضمونة", status: "100" },
  { label: "الأصوات المتأرجحة", status: "50" },
];

const VotesPage = () => {
  return (
    <Tabs variant="soft-rounded" colorScheme="green" isLazy>
      <TabList
        bg="white"
        w="fit-content"
        p="2"
        fontWeight="400"
        rounded="12px"
        gap="16px"
      >
        {tabsData.map((tab, index) => (
          <Tab
            key={index}
            rounded="8px"
            h="40px"
            fontWeight="400"
            _selected={{
              bg: "linear-gradient(247.51deg, #2A8A6E 9.32%, #086259 96.8%)",
              color: "white",
              fontWeight: "500",
            }}
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {tabsData.map((tab, index) => (
          <TabPanel key={index} p="0" pt="22px">
            <TabPage status={tab.status} />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default VotesPage;
