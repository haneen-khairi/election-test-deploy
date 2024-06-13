/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tab, TabIndicator, TabList, Tabs, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

const TabsContainer: any = ({
  setActiveTabIndex,
  tabs,
  color = "#318973",
  ...rest
}: {
  setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;
  color?: string;
  tabs: {
    text: string;
    icon?: ReactNode;
  }[];
}) => {
  const handleChange = (index: number) => {
    setActiveTabIndex(index);
  };

  return (
    <Tabs
      position="relative"
      variant="unstyled"
      onChange={handleChange}
      {...rest}
    >
      <TabList w="100%" display="flex" justifyContent="space-evenly">
        {tabs.map(({ text, icon }) => (
          <Tab
            display="flex"
            px="0px"
            gap="8px"
            ml="40px"
            _selected={{
              color,
            }}
          >
            {icon}
            <Text fontSize="16px" fontWeight={600}>
              {text}
            </Text>
          </Tab>
        ))}
      </TabList>

      <TabIndicator
        mt="-6px"
        height="6px"
        bg={color}
        borderRadius="70px 70px 0px 0px"
      />
    </Tabs>
  );
};

export default TabsContainer;
