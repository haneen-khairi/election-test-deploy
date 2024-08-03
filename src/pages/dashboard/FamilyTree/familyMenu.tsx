import { Box, Heading} from "@chakra-ui/react";
import { FamilyList } from "./FamilyList";


const FamilyMenu = () => {

    return (
        <>
            <Box background={'#fff'} p={10} boxShadow={'1px 1px 10px #c1c1c1'} borderRadius={'10px'}>
                <Heading size='md' color={'#000'}>شجرة العائلة</Heading>
                <FamilyList />
            </Box>

        </>
    );
};

export default FamilyMenu;
