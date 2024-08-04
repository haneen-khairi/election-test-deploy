import { Box } from "@chakra-ui/react";
import FilterSection from "./FilterSection/FilterSection";
import { useState } from "react";

export const FamilyFilter = () => {
    const [filter, setFilter] = useState<any>({});


    return (
        <>
            <Box mt={30} background={'#fff'} p={10} borderRadius={12} boxShadow={'1px 1px 10px #c2c2c2'}>
                <FilterSection setFilter={setFilter} filter={filter} />
            </Box>
        </>
    );
};


