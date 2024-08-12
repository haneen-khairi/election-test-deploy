/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElectionBrand } from "@assets/icons";
import { Box } from "@chakra-ui/react";
import SupporterFilter from "@components/content/supporter/SupporterFilter";
import React from "react";
import SupporterTables from "@components/content/supporter/SupporterTables";

const SupportersPage = React.memo(() => {
  return (
    <Box
      w="100%"
      p="20px"
      position="relative"
      display="grid"
      gap="20px"
      gridTemplateColumns="repeat(9, 1fr)"
      as="form"
    >
      <Box gridColumn="span 9" h="60px">
        <ElectionBrand />
      </Box>

      <SupporterFilter />

      <SupporterTables />
    </Box>
  );
});

export default SupportersPage;
