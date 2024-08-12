/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  HStack,
  Text,
  Radio,
  RadioGroup,
  Stack,
  Button,
} from "@chakra-ui/react";
import {
  FirstNameSelect,
  MiddleNameSelect,
  SecondNameSelect,
} from "@components/content/DropDown";
import { Input } from "@components/core";
import { CiSearch } from "react-icons/ci";
import { SlRefresh } from "react-icons/sl";
import { Controller, useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { FilterSchema } from "./FilterSchema";
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
import { usePermission } from "@services/hooks/auth/Permission";
import { yupResolver } from "@hookform/resolvers/yup";
import { FilterSchema } from "./FilterSchema";

interface Props {
  setFilter: (data: any) => void;
  filter: any;
  treePage?: boolean;
}
const FilterSection = ({ filter, setFilter, treePage = false }: Props) => {
  const [search, setSearch] = useState<string>();
  const dropDownObj = useGetVotingCentersDropdown(search);
  const { allowList } = usePermission();

  const {
    control,
    reset,
    setValue,
    watch,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FilterSchema),
    defaultValues: {
      full_name: undefined,
      first_name: undefined,
      second_name: undefined,
      third_name: undefined,
      last_name: undefined,
      nationality_id: undefined,
      electoral_district: undefined,
      voting_center: undefined,
      box: undefined,
      family_tree_id: undefined,
      place_of_residence: undefined,
      gender: undefined,
    },
  });

  const handleFilter = async () => {
    const newFilter: any = {};

    [
      "full_name",
      "first_name",
      "second_name",
      "third_name",
      "last_name",
      "nationality_id",
      "electoral_district",
      "voting_center",
      "box",
      "family_tree_id",
      "place_of_residence",
      "gender",
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
    <Box as="form">
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

        {allowList?.nationality && !treePage && (
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
        )}

        {!treePage ? (
          <>
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
          </>
        ) : (
          ""
        )}

        {allowList?.familyTree && !treePage && (
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
        )}

        {!treePage ? (
          <>
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
          </>
        ) : (
          ""
        )}
      </HStack>

      <Box mt="27px">
        <RadioGroup
          onChange={(d: any) => {
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
        <Button
          type="submit"
          onClick={handleSubmit(handleFilter)}
          w="150px"
          h="fit-content"
          py="10px"
          borderRadius="50px"
          bg="#318973"
          borderColor="#318973"
          color="#fff"
          fontSize="17px"
          display="flex"
          gap="10px"
        >
          <CiSearch size="20px" />
          <Text>بحث</Text>
        </Button>

        <Button
          w="150px"
          h="fit-content"
          py="10px"
          type="button"
          borderRadius="50px"
          bg={"transparent"}
          fontSize="17px"
          color="red"
          border="1px solid red"
          borderColor="red"
          onClick={() => {
            reset();
            setFilter({});
          }}
          display="flex"
          gap="10px"
        >
          <SlRefresh size="20px" />
          <Text>مسح الكل</Text>
        </Button>
      </HStack>
    </Box>
  );
};

export default FilterSection;
