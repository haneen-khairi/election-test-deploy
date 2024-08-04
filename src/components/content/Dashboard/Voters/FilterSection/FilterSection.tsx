/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, HStack, Text, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import {
  FirstNameSelect,
  MiddleNameSelect,
  SecondNameSelect,
} from "@components/content/DropDown";
import { Btn, Input } from "@components/core";
import { CiSearch } from "react-icons/ci";
import { SlRefresh } from "react-icons/sl";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FilterSchema } from "./FilterSchema";
import ElectoralDistrictSelect from "@components/content/DropDown/ElectoralDistrictSelect";
import MultiSelect from "@components/core/multiSelect/MultiSelect";
import {
  useGetFamilyTreeDropdown,
  useGetLastNameDropdown,
  useGetplaceOfResidenceDropdown,
  useGetVotingCentersDropdown,
} from "@services/hooks/dropdown/useDropDown";
import { useState } from "react";
import CentersSelect from "@components/content/DropDown/CentersSelect";
import BoxesSelect from "@components/content/DropDown/BoxesSelect";

interface Props {
  setFilter: (data: any) => void;
  filter: any;
}
const FilterSection = ({ filter, setFilter }: Props) => {
  const [search, setSearch] = useState<string>();
  const dropDownObj = useGetVotingCentersDropdown(search);

  const {
    control,
    reset,
    setValue,
    watch,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FilterSchema),
    defaultValues: {
      family_tree_id: undefined,
      nationality_id: undefined,
      full_name: undefined,
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
      "nationality_id",
      "family_tree_id",
      "full_name",
      "first_name",
      "second_name",
      "third_name",
      "electoral_district",
      "gender",
      "box",
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
      {/* Dropdowns Select */}
      <HStack spacing="2%" gridGap="16px" mb="24px" flexWrap="wrap">
        <Box w="22%" flexGrow="1">
          <Controller
            control={control}
            name="full_name"
            render={({ field }) => (
              <Input
                type="text"
                placeholder="الإسم الكامل"
                register={register("full_name")}
                error={errors.full_name?.message}
                {...field}
              />
            )}
          />
        </Box>

        <Box w="22%">
          <Controller
            control={control}
            name="first_name"
            render={({ field: { onChange, value } }) => (
              <FirstNameSelect
                filter={{}}
                onChange={onChange}
                value={value}
                error={errors.first_name?.message}
                key={value}
              />
            )}
          />
        </Box>

        <Box w="22%">
          <Controller
            control={control}
            name="second_name"
            render={({ field: { onChange, value } }) => (
              <SecondNameSelect
                filter={{}}
                onChange={onChange}
                value={value}
                error={errors.second_name?.message}
                key={value}
              />
            )}
          />
        </Box>

        <Box w="22%">
          <Controller
            control={control}
            name="third_name"
            render={({ field: { onChange, value } }) => (
              <MiddleNameSelect
                onChange={onChange}
                filter={{}}
                value={value}
                error={errors.third_name?.message}
                key={value}
              />
            )}
          />
        </Box>

        <Box w="100%">
          <MultiSelect
            name="last_name"
            placeholder="إسم العائلة"
            filter={filter}
            control={control}
            fetchFunction={useGetLastNameDropdown}
          />
        </Box>

        <Box w="22%" flexGrow="1">
          <Controller
            control={control}
            name="nationality_id"
            render={({ field }) => (
              <Input
                type="number"
                placeholder="الرقم الوطني"
                register={register("nationality_id")}
                error={errors.nationality_id?.message}
                {...field}
              />
            )}
          />
        </Box>

        <Box w="22%" flexGrow="1">
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

        <Box w="22%" flexGrow="1">
          <Controller
            control={control}
            name="voting_center"
            render={({ field: { onChange, value } }) => (
              <CentersSelect
                dropDownObj={dropDownObj}
                setSearch={setSearch}
                onChange={onChange}
                value={value}
                error={errors?.voting_center?.message as string}
                key={value}
              />
            )}
          />
        </Box>

        <Box w="22%" flexGrow="1">
          <Controller
            control={control}
            name="box"
            render={({ field: { onChange, value } }) => (
              <BoxesSelect
                onChange={onChange}
                value={value}
                error={errors?.box?.message as string}
                key={value}
                voting_center={watch("voting_center") || null}
              />
            )}
          />
        </Box>

        <Box w="100%">
          <MultiSelect
            name="family_tree_id"
            placeholder="شجرة العائلة"
            filter={filter}
            control={control}
            isId={true}
            fetchFunction={useGetFamilyTreeDropdown}
          />
        </Box>

        <Box w="100%">
          <MultiSelect
            name="place_of_residence"
            placeholder="مكان الإقامة"
            filter={filter}
            control={control}
            fetchFunction={useGetplaceOfResidenceDropdown}
            isId={true}
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
