import { Box, HStack, Text, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import {
  FirstNameSelect,
  LastNameSelect,
  MiddleNameSelect,
  PlaceOfResidenceSelect,
  SecondNameSelect,
} from "@components/content/DropDown";
import { Btn } from "@components/core";
import { CiSearch } from "react-icons/ci";
import { SlRefresh } from "react-icons/sl";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FilterSchema } from "./FilterSchema";
import { FilterType } from "./FilterType";
import { useEffect } from "react";
import useFilterStore from "@store/FilterStore";
import ElectoralDistrictSelect from "@components/content/DropDown/ElectoralDistrictSelect";

interface Props {
  SFilter: (data: FilterType) => void;
}
const FilterSection = ({ SFilter }: Props) => {
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(FilterSchema),
    defaultValues: {
      first_name: undefined,
      second_name: undefined,
      third_name: undefined,
      last_name: undefined,
      place_of_residence: undefined,
      electoral_district: undefined,
      gender: undefined,
    },
  });

  const handleFilter = (values: FilterType) => {
    SFilter(values);
  };

  const {
    first_name,
    last_name,
    second_name,
    third_name,
    electoral_district,
    place_of_residence,
    gender,
  } = watch();

  const { setFilter } = useFilterStore();

  useEffect(() => {
    if (isDirty) {
      setFilter({
        first_name,
        last_name,
        second_name,
        third_name,
        electoral_district,
        place_of_residence,
        gender,
      });
    }
  }, [
    first_name,
    last_name,
    second_name,
    third_name,
    electoral_district,
    place_of_residence,
    gender,
    isDirty,
    setFilter,
  ]);

  return (
    <Box>
      {/* Dropdowns Select */}
      <HStack spacing="2%" gridGap="16px" mb="24px" flexWrap="wrap">
        <Box w="32%" flexGrow="1">
          <Controller
            control={control}
            name="first_name"
            render={({ field: { onChange, value } }) => (
              <FirstNameSelect
                onChange={onChange}
                value={value}
                error={errors.first_name?.message}
                key={value}
              />
            )}
          />
        </Box>
        <Box w="32%" flexGrow="1">
          <Controller
            control={control}
            name="second_name"
            render={({ field: { onChange, value } }) => (
              <SecondNameSelect
                onChange={onChange}
                value={value}
                error={errors.second_name?.message}
                key={value}
              />
            )}
          />
        </Box>
        <Box w="32%" flexGrow="1">
          <Controller
            control={control}
            name="third_name"
            render={({ field: { onChange, value } }) => (
              <MiddleNameSelect
                onChange={onChange}
                value={value}
                error={errors.third_name?.message}
                key={value}
              />
            )}
          />
        </Box>
        <Box w="32%" flexGrow="1">
          <Controller
            control={control}
            name="last_name"
            render={({ field: { onChange, value } }) => (
              <LastNameSelect
                onChange={onChange}
                value={value}
                error={errors.last_name?.message}
                key={value}
              />
            )}
          />
        </Box>
        <Box w="32%" flexGrow="1">
          <Controller
            control={control}
            name="place_of_residence"
            render={({ field: { onChange, value } }) => (
              <PlaceOfResidenceSelect
                onChange={onChange}
                value={value}
                error={errors.place_of_residence?.message}
                key={value}
              />
            )}
          />
        </Box>
        <Box w="32%" flexGrow="1">
          <Controller
            control={control}
            name="electoral_district"
            render={({ field: { onChange, value } }) => (
              <ElectoralDistrictSelect
                onChange={onChange}
                value={value}
                error={errors.electoral_district?.message}
                key={value}
              />
            )}
          />
        </Box>
      </HStack>
      <Box mt="27px">
        <RadioGroup
          onChange={(d) => {
            setValue("gender", d);
          }}
        >
          <Stack direction="row">
            <Text>النوع</Text>
            <Radio value="M" colorScheme="green">
              ذكر
            </Radio>
            <Radio value="F" colorScheme="green">
              انثى
            </Radio>
          </Stack>
        </RadioGroup>
      </Box>
      {/* Buttons */}
      <HStack justifyContent="flex-end">
        <Btn
          w="fit-content"
          type="solid"
          icon={<CiSearch size="20px" />}
          iconPlacment="right"
          onClick={handleSubmit(handleFilter)}
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
            setFilter({
              first_name: undefined,
              last_name: undefined,
              second_name: undefined,
              third_name: undefined,
              place_of_residence: undefined,
              gender: undefined,
            });
            handleSubmit(handleFilter)();
          }}
        >
          <Text>مسح الكل</Text>
        </Btn>
      </HStack>
    </Box>
  );
};

export default FilterSection;
