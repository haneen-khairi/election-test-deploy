import { Box, Button, Flex, Heading, Spacer, ButtonGroup, useDisclosure } from "@chakra-ui/react";
import FamilyMenu from "./familyMenu";
import { FamilyFilter } from "./FamilyFilter"; 
import useAuthStore from "@store/AuthStore";
import { useEffect, useState } from "react";
import axios from "axios";
import FamilyTreeCreateModal from "./ModalFamilyTreeCreate";


const FamilyTree = () => {
    const {data} = useAuthStore() 
    const {
        isOpen,
        onClose,
        onOpen
    } = useDisclosure()
    const [treeName, setTreeName] = useState<any[]>([])
    console.log("🚀 ~ FamilyTree ~ token:", data?.tokens?.access)
    async function getTreeNames() { 
        
        try{
            const res = await axios.get(`${import.meta.env.VITE_PRIVATE_API_URL}/family_tree/trees`, {
                headers: {
                    Authorization: `Bearer ${data?.tokens?.access}`
                }
            })
            console.log("🚀 ~ name ~ res:", res)
            setTreeName(res.data.data)
        } catch(error){
        console.log("🚀 ~ name ~ error:", error)

        }
    }
    useEffect(() => {
        getTreeNames()
    
      return () => {
        
      }
    }, [])
    
    return (
        <>
            <Flex minWidth='max-content' alignItems='center' gap='2' mt={'30px'} background={'#fff'} p={'20px'} boxShadow={'1px 1px 10px #c1c1c1'} borderRadius={'10px'}>
                <Box p='2'>
                    <Heading size='md' color={'#000'}>انشاء شجرة عائلة جديدة                    </Heading>
                </Box>
                <Spacer />
                <Button colorScheme='primary' color={'#fff'} borderRadius={'30px'} onClick={onOpen}>إنشاء قائمة جديدة</Button>
            </Flex>
            <FamilyFilter />
            <Flex minWidth='max-content' gap='2' mt={'30px'}>
                <FamilyMenu />
                <Spacer />
                {/* <AddFamilyMember /> */}
                <Box background={'#fff'} p={10} boxShadow={'1px 1px 10px #c1c1c1'} borderRadius={'10px'} w={'fit-content'}>
                    <ButtonGroup gap='5'>
                        <Button colorScheme='primary' color={'#fff'} borderRadius={'30px'}>اضافة عائلة
                        </Button>
                        <Button colorScheme='primary' color={'#fff'} borderRadius={'30px'}>اضافة اسماء
                        </Button>
                    </ButtonGroup>
                </Box>
            </Flex>
            <FamilyTreeCreateModal isOpen={isOpen} onClose={onClose} onSuccess={() => {
                onClose()
                getTreeNames()
            }} />
        </>
    );
};
export default FamilyTree;
