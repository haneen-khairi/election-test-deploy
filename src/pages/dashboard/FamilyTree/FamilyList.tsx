import { Box, SimpleGrid } from "@chakra-ui/react";

type props = {
    family: familyObject,
    onClick: (id: string) => void
}
type familyObject = {
    name: string,
    id: string
}
export const FamilyList = ({
    family,
    onClick = (id: string) => {}
}: props) => {

    return (
        <Box onClick={()=> onClick(family.id)} borderBottom={'1px solid #c2c2c2'} w={'100%'} mt={5} height='30px' color={'#000'}>{family.name}</Box> 
    );
};


