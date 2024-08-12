import { Button, } from "@chakra-ui/react";
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
    console.error(id);
  },
  isActive
}: Props) => {


  return (
    <Button
      onClick={() => onClick(family.id)} 
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
