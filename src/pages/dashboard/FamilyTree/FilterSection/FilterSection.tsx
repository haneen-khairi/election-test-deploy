import {
  Box, HStack, Text,
} from "@chakra-ui/react";

import { Btn } from "@components/core";
import { CiSearch } from "react-icons/ci";
import { SlRefresh } from "react-icons/sl";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FilterSchema } from "./FilterSchema";

interface Props {
  setFilter: (data: any) => void;
  filter?: any;
}
const FilterSection = ({ setFilter }: Props) => {

  const {
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(FilterSchema),
    defaultValues: {
      first_name: undefined,
      second_name: undefined,
      third_name: undefined,
      last_name: undefined,
      place_of_residence: undefined,
      electoral_district: undefined,
      voting_center: undefined,
      gender: undefined,
    },
  });

  const handleFilter = () => {
    const newFilter: any = {};

    [
      "first_name",
      "second_name",
      "third_name",
      "electoral_district",
      "gender",
      "place_of_residence",
      "last_name",
      "voting_center",
    ].forEach((field) => {
      const item = watch(field as any);
      if (item) newFilter[field] = item;
    });



    setFilter((prev: any) => ({
      ...prev,
      ...newFilter,
    }));
  };

  return (
    <Box>
      <HStack spacing="2%" gridGap="16px" mb="24px" flexWrap="wrap">

        <Box w="100%" color={'#000'} flexGrow="1">

        </Box>



      </HStack>


      <HStack justifyContent="flex-end">
        <Btn
          w="fit-content"
          type="solid"
          icon={<CiSearch size="20px" />}
          iconPlacment="right"
          onClick={handleFilter}
        >
          <Text>بحث</Text>
        </Btn>

        <Btn
          w="fit-content"
          type="outlined"
          icon={<SlRefresh />}
          iconPlacment="right"
          onClick={() => {
            reset();
            setFilter({});
          }}
        >
          <Text>مسح الكل</Text>
        </Btn>
      </HStack>
    </Box>
  );
};

export default FilterSection;
