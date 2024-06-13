import { HStack, Text } from "@chakra-ui/react";
import { links } from "@constants/variables/SideBar";
import { useLocation } from "react-router-dom";
import { AvatarMenu } from "./partials/AvatarMenu";

const Header = () => {
  const location = useLocation();
  const getTitle = () => {
    return links.find((link) => link.url == location.pathname)?.name;
  };

  return (
    <HStack justifyContent="space-between">
      {/* Title */}
      <Text fontSize="24px" fontWeight="700">
        {getTitle()}
      </Text>
      {/* Menu */}
      <AvatarMenu />
    </HStack>
  );
};

export default Header;
