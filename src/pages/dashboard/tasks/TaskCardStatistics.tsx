import React from "react";
import { Box, Grid, Tag, TagLabel, Text, VStack } from "@chakra-ui/react";

export default function TaskCardStatistics({
    status,
    numberOfTasks = 0,
    numberOfMondobs = 0,
    nameOfCard= ""
}: {
    status: string,
    numberOfTasks: number,
    numberOfMondobs: number,
    nameOfCard: string
}) {
  return (
    <Box
      borderRadius={"16px"}
      boxShadow={"0px 3px 12px 0px #0000000F"}
      padding={"16px"}
      backgroundColor={"#fff"}
    >
      <Tag
        borderRadius="full"
        variant="solid"
        backgroundColor={status === "received" ? "#12B76A1A" : status === "inProgress" ? "#F0FDFF" : "#FFFAEE"}
        borderColor={status === "received" ? "#00BF6C" : status === "inProgress" ? "#14B4D2" : "#EEB72A"}
        mb={'12px'}
        margin={'0 auto 12px'}
        display={'block'}
        width={'75%'}
        padding={'8px 16px'}
      >
        <TagLabel color={status === "received" ? "#12B76A" : status === "inProgress" ? "#14B4D2" : "#EEB72A"} textAlign={'center'} className="tasks__badge">{nameOfCard}</TagLabel>
      </Tag>
      <Grid padding={'16px 12px'} templateColumns="repeat(2, 1fr)">
        <div className="">
          <Text className="tasks__statistics--title" textAlign={"center"} mb={"24px"}>
            عدد المهام
          </Text>
          <Text textAlign={"center"} className="tasks__statistics--number">{numberOfTasks}</Text>
        </div>
        <div className="">
          <Text className="tasks__statistics--title" textAlign={"center"} mb={"24px"}>
            عدد المناديب
          </Text>
          <Text textAlign={"center"} className="tasks__statistics--number">{numberOfMondobs}</Text>
        </div>
      </Grid>
    </Box>
  );
}
