import { Box, SimpleGrid, Button, HStack, Text } from "@chakra-ui/react";
type Props = {
    families: Family[],
    nextPage: number,
    count: number,
    onPaginate: (action:string) => void
}

type Family = {
    first_name: string,
    second_name: string,
    third_name: string,
    last_name: string,
    id: string
}

const FamilyNames = ({ families, nextPage, count,  onPaginate }: Props) => {
    console.log("🚀 ~ FamilyNames ~ nextPage:", nextPage)
 

    return (
        <>
            <Box background={'#fff'} p={10} borderRadius={'10px'}>
                <SimpleGrid columns={1} spacing={5} minW={'250px'}>
                {families.length ? families.map((family: Family) => (
                        <Box 
                            key={family.id}
                            borderBottom={'1px solid #c2c2c2'} 
                            w={'100%'} 
                            mt={5} 
                            height='30px' 
                            color={'#000'}
                        >
                            {family.first_name} {family.second_name} {family.third_name} {family.last_name}
                        </Box> 
                    )) : ""}
                </SimpleGrid>
                <HStack mt={5} justifyContent="space-between">
                <Button onClick={()=> onPaginate('prev')} isDisabled={nextPage === 2}>السابق</Button>
                    <Text> {nextPage - 1} - {Math.ceil(count / 20)}</Text>
                    <Button onClick={()=> onPaginate('next')} >التالي</Button>
                     </HStack>
            </Box>
        </>
    );
};

export default FamilyNames;
