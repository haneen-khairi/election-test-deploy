import { Box, Button, ButtonGroup } from "@chakra-ui/react";


const AddFamilyMember = () => {
 
        <>
            <Box background={'#fff'} p={10} boxShadow={'1px 1px 10px #c1c1c1'} borderRadius={'10px'}>
                <ButtonGroup gap='2'>
                    <Button  background='primary' color={'#fff'} borderRadius={'30px'}>اضافة عائلة
                    </Button>
                    <Button  colorScheme='primary' color={'#fff'} borderRadius={'30px'}>اضافة اسماء
                    </Button>
                </ButtonGroup>
            </Box>

        </> 
};

export default AddFamilyMember;
 