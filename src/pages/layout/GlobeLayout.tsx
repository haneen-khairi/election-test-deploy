import { Box } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  return (
    <Box dir="rtl" key={location.pathname}>
      <Outlet />
    </Box>
  );
};

export default Layout;
