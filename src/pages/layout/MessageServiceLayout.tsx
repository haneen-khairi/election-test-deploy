import { Box } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";

const MessageServiceLayout = () => {
  const location = useLocation();
  return (
    <Box dir="rtl" key={location.pathname}>
      <Outlet />
    </Box>
  );
};

export default MessageServiceLayout;
