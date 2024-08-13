import { Box, Button, HStack, Text, Icon, Flex, useToast } from "@chakra-ui/react";
import axios from "axios";
import useAuthStore from "@store/AuthStore";
import { BsTrash } from "react-icons/bs";
import { EToast } from "@constants/functions/toast";
type Props = {

    families: Family[],
    nextPage: number,
    count: number,
    family_tree_id: string,
    onPaginate: (action: string) => void,
    onSuccess: () => void
}

type Family = {
    first_name: string,
    second_name: string,
    third_name: string,
    last_name: string,
    id: string,

}

const FamilyNames = ({ families, nextPage, count, onPaginate, family_tree_id, onSuccess }: Props) => {
    console.log("🚀 ~ FamilyNames ~ nextPage:", nextPage)
    console.log("🚀 ~ FamilyNames ~ nextPage:", family_tree_id)
    const { data } = useAuthStore();
    const toast = useToast();

    const handleDelete = async (id: string) => {
        const isConfirmed = window.confirm("Are you sure you want to delete?");
        
        if (!isConfirmed) {
            return; // If the user cancels, do nothing
        }
    
        try {
            const response = await axios.delete(`${import.meta.env.VITE_PRIVATE_API_URL}/family_tree/trees/${family_tree_id}/`, {
                data: {
                    voter_ids: [id]
                },
    
                headers: {
                    Authorization: `Bearer ${data?.tokens?.access}`,
                },
            });
    
            console.log(families);
            console.log('Deleted:', response.data);
    
            if(response.data.status === "voters removed"){
                onSuccess();
                EToast({
                    toast: toast,
                    status: "success",
                    title: "نجاح العملية",
                    description: "تم الحذف بنجاح",
                });
            }
    
            // Handle the response or update UI as needed
        } catch (error) {
            console.error('Error deleting the family tree:', error);
        }
    };
    
    return (
        <>
            <Box background={'#fff'} p={10} borderRadius={'10px'}>
                {/* <SimpleGrid columns={2} spacing={0} minW={'250px'}> */}
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
                                <Flex alignItems={'center'} justify={'space-between'}>

                                <Text>
                                    {family.first_name} {family.second_name} {family.third_name} {family.last_name}
                                    </Text> 
                                    <Button key={family.id} onClick={() => handleDelete(family.id)}>
                                    <Icon as={BsTrash} />
                                </Button>
                                </Flex>
                            </Box>
                            {/* <Box
                                key={family.id}
                                borderBottom={'1px solid #c2c2c2'}
                                w={'100%'}
                                mt={5}
                                height='30px'
                                color={'#000'}
                                textAlign={"left"}
                            >
                                

                            </Box> */}
                        </>
                    )) : ""}
                {/* </SimpleGrid> */}
                <HStack mt={5} justifyContent="space-between">
                    <Button onClick={() => onPaginate('prev')} isDisabled={nextPage === 2}>السابق</Button>
                    <Text> {nextPage - 1} - {Math.ceil(count / 20)}</Text>
                    <Button onClick={() => onPaginate('next')} >التالي</Button>
                </HStack>
            </Box>
        </>
    );
};

export default FamilyNames;
