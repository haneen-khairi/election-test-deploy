import { ElectionBrand } from "@assets/icons";
import { Center, VStack } from "@chakra-ui/react";
import SideLinks from "./Partials/SideLinks";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <VStack align="stretch">
      {/* Brand Logo */}
      <Center onClick={() => navigate("/")} cursor="pointer">
        <ElectionBrand />
      </Center>

      {/* links */}
      <SideLinks />
    </VStack>
  );
};

export default Sidebar;
