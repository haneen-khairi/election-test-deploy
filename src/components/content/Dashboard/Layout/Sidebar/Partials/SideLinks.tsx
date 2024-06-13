import { HStack, Text, VStack } from "@chakra-ui/react";
import { links } from "@constants/variables/SideBar";
import { Link, useLocation } from "react-router-dom";

const SideLinks = () => {
  const location = useLocation();

  const getLinkStyles = (index: number, url: string) => {
    const isActive =
      (index === 0 && location.pathname === url) ||
      (location.pathname.includes(url) && url !== "" && index > 0);

    return {
      background: isActive
        ? "linear-gradient(247.51deg, #2A8A6E 9.32%, #086259 96.8%)"
        : "none",
      color: isActive ? "white" : "black",
      transition: "background 0.3s", // Add transition property here
    };
  };

  return (
    <VStack align="stretch" mt="24px" spacing="6px">
      {links.map((link, index) => (
        <HStack
          key={index}
          as={Link}
          to={link.url}
          {...getLinkStyles(index, link.url)}
          cursor="pointer"
          p="12px"
          rounded="8px"
          fontSize="16px"
          fontWeight="600"
          _hover={{
            background:
              "linear-gradient(247.51deg, #2A8A6E 9.32%, #086259 96.8%)",
            color: "white",
          }}
        >
          <Text>{link.icon({ size: 20 })}</Text>
          <Text>{link.name}</Text>
        </HStack>
      ))}
    </VStack>
  );
};

export default SideLinks;
