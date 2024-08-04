import { Box, SimpleGrid, Button, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";

type Props = {
    families: Family[],
}

type Family = {
    first_name: string,
    id: string
}

const FamilyNames = ({ families }: Props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(families.length / itemsPerPage);

    const currentData = families.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <>
            <Box background={'#fff'} p={10} borderRadius={'10px'}>
                <SimpleGrid columns={1} spacing={5} minW={'250px'}>
                    {currentData.length ? currentData.map((family: Family) => (
                        <Box borderBottom={'1px solid #c2c2c2'} w={'100%'} mt={5} height='30px' color={'#000'}>{family.first_name}</Box> 
                    )) : ""}
                </SimpleGrid>
                <HStack mt={5} justifyContent="space-between">
                    <Button onClick={handlePrevPage} isDisabled={currentPage === 1}>السابق</Button>
                    <Text>الصفحة {currentPage} of {totalPages}</Text>
                    <Button onClick={handleNextPage} isDisabled={currentPage === totalPages}>التالي</Button>
                </HStack>
            </Box>
        </>
    );
};

export default FamilyNames;
