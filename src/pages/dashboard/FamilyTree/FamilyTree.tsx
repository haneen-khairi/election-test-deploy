import { Box, Button, Flex, Heading, Spacer, ButtonGroup } from "@chakra-ui/react";
import FamilyMenu from "./familyMenu";
import { FamilyFilter } from "./FamilyFilter"; 


const FamilyTree = () => {
    return (
        <>
            <Flex minWidth='max-content' alignItems='center' gap='2' mt={'30px'} background={'#fff'} p={'20px'} boxShadow={'1px 1px 10px #c1c1c1'} borderRadius={'10px'}>
                <Box p='2'>
                    <Heading size='md' color={'#000'}>انشاء شجرة عائلة جديدة                    </Heading>
                </Box>
                <Spacer />
                <Button colorScheme='primary' color={'#fff'} borderRadius={'30px'}>إنشاء قائمة جديدة</Button>
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
        </>
    );
};
export default FamilyTree;
