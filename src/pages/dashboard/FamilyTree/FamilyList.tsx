import { Box, SimpleGrid } from "@chakra-ui/react";


export const FamilyList = () => {

    return (
        <>
            <SimpleGrid columns={1} spacing={5} minW={'250px'} >
                <Box borderBottom={'1px solid #c2c2c2'} w={'100%'} mt={5} height='30px' color={'#000'}>the name should appear here</Box> 
                <Box borderBottom={'1px solid #c2c2c2'} w={'100%'} mt={1} height='30px' color={'#000'}>the name should appear here</Box> 
                <Box borderBottom={'1px solid #c2c2c2'} w={'100%'} mt={1} height='30px' color={'#000'}>the name should appear here</Box> 
                <Box borderBottom={'1px solid #c2c2c2'} w={'100%'} mt={1} height='30px' color={'#000'}>the name should appear here</Box> 
                <Box borderBottom={'1px solid #c2c2c2'} w={'100%'} mt={1} height='30px' color={'#000'}>the name should appear here</Box> 
                <Box borderBottom={'1px solid #c2c2c2'} w={'100%'} mt={1} height='30px' color={'#000'}>the name should appear here</Box> 
            </SimpleGrid>

        </>
    );
};


