import { Box, Heading, SimpleGrid, Button, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FamilyList } from "./FamilyList";

type Props = {
    families: Family[],
    onClick: (id: string) => void
}

type Family = {
    name: string,
    id: string
}

const FamilyMenu = ({ families, onClick }: Props) => {
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
            <Box background={'#fff'} p={10} boxShadow={'1px 1px 10px #c1c1c1'} borderRadius={'10px'}>
                <Heading size='md' color={'#000'}>شجرة العائلة</Heading>
                <SimpleGrid columns={1} spacing={5} minW={'250px'}>
                    {currentData.length ? currentData.map((family: Family) => (
                        <FamilyList key={family.id} family={family} onClick={onClick} />
                    )) : ""}
                </SimpleGrid>
                <HStack mt={5} justifyContent="space-between">
                <Button onClick={handlePrevPage} isDisabled={currentPage === 1}>السابق</Button>
                    <Text> {currentPage} - {totalPages}</Text>
                    <Button onClick={handleNextPage} isDisabled={currentPage === totalPages}>التالي</Button>
                </HStack>
            </Box>
        </>
    );
};

export default FamilyMenu;
