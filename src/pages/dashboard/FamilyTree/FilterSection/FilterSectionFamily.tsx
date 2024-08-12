import { Box, HStack, Text, Stack } from "@chakra-ui/react";
import { Btn } from "@components/core";
import { CiSearch } from "react-icons/ci";
import { SlRefresh } from "react-icons/sl";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FilterSchema } from "./FilterSchema";
import MultiSelect from "@components/core/multiSelect/MultiSelect";
import { useGetLastNameDropdown } from "@services/hooks/dropdown/useDropDown";
import { useState } from "react";

interface Props {
  setFilter: (data: any) => void;
  filter: any;
}

const FilterSectionFamily = ({ filter, setFilter }: Props) => {
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const {
    control,
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

  // Placeholder for the last name list (Replace this with actual data fetching)
 
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

    // Include selected names in filter
    if (selectedNames.length) {
      newFilter.selected_names = selectedNames;
    }

    setFilter((prev: any) => ({
      ...prev,
      ...newFilter,
    }));
  };

  // const handleNameSelection = (name: string) => {
  //   setSelectedNames((prev) =>
  //     prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
  //   );
  // };

  return (
    <Box>
      {/* Dropdowns Select */}
      <HStack spacing="2%" gridGap="16px" mb="24px" flexWrap="wrap">
        <Box w="100%" color={'#000'} flexGrow="1">
          <MultiSelect
            name="last_name"
            placeholder="إسم العائلة"
            filter={filter}
            control={control}
            fetchFunction={useGetLastNameDropdown}
          />
        </Box>
      </HStack>

      {/* Table with checkboxes */}
      <Box mb="24px">
        <Text mb="8px">اختر الأسماء:</Text>
        <Stack spacing="4">
        
        </Stack>
      </Box>

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
            setSelectedNames([]);
          }}
        >
          <Text>مسح الكل</Text>
        </Btn>
      </HStack>
    </Box>
  );
};

export default FilterSectionFamily;
