/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, HStack, Text,
  //  Radio, RadioGroup, Stack 
  } from "@chakra-ui/react";
// import {
//   FirstNameSelect,
//   MiddleNameSelect,
//   SecondNameSelect,
// } from "@components/content/DropDown";
import { Btn } from "@components/core";
import { CiSearch } from "react-icons/ci";
import { SlRefresh } from "react-icons/sl";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FilterSchema } from "./FilterSchema";
// import ElectoralDistrictSelect from "@components/content/DropDown/ElectoralDistrictSelect";
// import MultiSelect from "@components/core/multiSelect/MultiSelect";
import {
  // useGetLastNameDropdown,
  // useGetplaceOfResidenceDropdown,
  useGetVotingCentersDropdown,
} from "@services/hooks/dropdown/useDropDown";
import { useState } from "react";
// import CentersSelect from "@components/content/DropDown/CentersSelect";

interface Props {
  setFilter: (data: any) => void;
  filter?: any;
}
const FilterSection = ({ setFilter }: Props) => {
  // const [search, setSearch] = useState<string>();
  // const dropDownObj = useGetVotingCentersDropdown(search);

  const {
    // control,
    reset,
    // setValue,
    watch,
    // formState: { errors },
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

    // ["place_of_residence", "last_name"].forEach((field) => {
    //   const item = watch(field as any) as string[];
    //   if (item) newFilter[field] = item.join(",");
    // });

    setFilter((prev: any) => ({
      ...prev,
      ...newFilter,
    }));
  };

  return (
    <Box>
      {/* Dropdowns Select */}
      <HStack spacing="2%" gridGap="16px" mb="24px" flexWrap="wrap">
        
        <Box w="100%" color={'#000'} flexGrow="1">
          {/*
          <MultiSelect
            name="last_name"
            placeholder="إسم العائلة"
            filter={filter}
            control={control}
            fetchFunction={useGetLastNameDropdown}
          />
          */}
        </Box>

       
 
      </HStack>

     

      {/* Buttons */}
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
