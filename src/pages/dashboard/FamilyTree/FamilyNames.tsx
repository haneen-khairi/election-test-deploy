import { Box, SimpleGrid, Button, HStack, Text, Icon } from "@chakra-ui/react";
import axios from "axios";
import useAuthStore from "@store/AuthStore";
import { BsTrash } from "react-icons/bs";
type Props = {

    families: Family[],
    nextPage: number,
    count: number,
    family_tree_id :string,
    onPaginate: (action:string) => void
}

type Family = {
    first_name: string,
    second_name: string,
    third_name: string,
    last_name: string,
    id: string, 

}

const FamilyNames = ({ families, nextPage, count,  onPaginate, family_tree_id }: Props) => {
    console.log("🚀 ~ FamilyNames ~ nextPage:", nextPage)
    console.log("🚀 ~ FamilyNames ~ nextPage:", family_tree_id)
    const { data } = useAuthStore();
    const handleDelete = async (id :  string) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_PRIVATE_API_URL}/family_tree/trees/${family_tree_id}/`, {
                data:{
                    voter_ids: [id]
                },
                
                    headers: {
                      Authorization: `Bearer ${data?.tokens?.access}`,
                    },
            });
            console.log(families);
            console.log('Deleted:', response.data);
            // Handle the response or update UI as needed
        } catch (error) {
            console.error('Error deleting the family tree:', error);
        }
    };
    return (
        <>
            <Box background={'#fff'} p={10} borderRadius={'10px'}>
                <SimpleGrid columns={2} spacing={0} minW={'250px'}>
                {families.length ? families.map((family: Family) => (
                       <>
                    
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
                        <Box 
                            key={family.id}
                            borderBottom={'1px solid #c2c2c2'} 
                            w={'100%'} 
                            mt={5} 
                            height='30px' 
                            color={'#000'}
                            textAlign={"left"}
                        >
                        <Button key={family.id} onClick={() => handleDelete(family.id)}>
                <Icon as={BsTrash} />
            </Button>

                        </Box>
                        </>
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
