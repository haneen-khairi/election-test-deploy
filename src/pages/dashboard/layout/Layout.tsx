import { Box, Flex, SlideFade } from "@chakra-ui/react";
import { Sidebar, Header } from "@components/content/Dashboard/Layout";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Flex h="100vh">
      {/* Sidebar */}
      <Box
        width="288px"
        p="48px 24px"
        position="fixed"
        height="100%"
        overflowY="auto"
        boxShadow="10px 10px 20px 0px #D3D3D3"
        bg="white"
        zIndex={5}
        css={{
          "&::-webkit-scrollbar": {
            width: 0,
          },
          scrollbarWidth: "none", // For Firefox
        }}
      >
        {/* Your sidebar content goes here */}
        <Sidebar />
      </Box>

      {/* Main content area */}
      <Flex
        flexDirection="column"
        flex="1"
        overflowY="auto"
        marginRight="288px"
      >
        {/* Header */}
        <Box as="header" p="20px 32px 20px 48px" boxShadow="lg">
          {/* Your header content goes here */}
          <Header />
        </Box>

        {/* Main content outlet */}
        <Box p="32px" bg="#f7f7f8" flex="1">
          <SlideFade in={true} offsetY="100px">
            <Outlet />
          </SlideFade>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;
