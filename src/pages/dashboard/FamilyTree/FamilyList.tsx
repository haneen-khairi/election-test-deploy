import { Button, } from "@chakra-ui/react";
import { useState } from "react";
type Props = {
  family: FamilyObject;
  onClick: (id: string) => void;
  isActive: boolean;

};

type FamilyObject = {
  name: string;
  id: string;
};

export const FamilyList = ({
  family,
  onClick = (id: string) => {
    console.log(id);
  },
  isActive
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (id: string) => {
    // setIsOpen((prev) => !prev);  
    onClick(id);
  };

  return (
    <Button
      onClick={() => handleClick(family.id)} 
      bg={isActive ? "primary.500" : "#fff"}
      color={isActive ? "#fff" : "#000"}
      borderBottom="1px solid #c2c2c2"
      w="100%"
      mt={5}
      height="30px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      transition="background-color 0.3s, color 0.3s"
      _hover={{ bg: "primary.600" }}
      // _active={{ bg: "#c2c2c2", color: "#000" }}
    >
      {family.name}
    </Button>
  );
};
