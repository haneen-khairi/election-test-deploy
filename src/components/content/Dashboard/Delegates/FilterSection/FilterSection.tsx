import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { Input, InputSelect } from "@components/core";
import { CiSearch } from "react-icons/ci";
import { SlRefresh } from "react-icons/sl";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FilterSchema } from "./FilterSchema";
import { FilterType } from "./FilterType";
import useDelegatesStore from "@store/DelegatesStore";
import { useGetDelegateTypes } from "@services/hooks/delegates/useGroups";

const FilterSection = () => {
  const { data, isLoading } = useGetDelegateTypes();
  const { setFilter } = useDelegatesStore();

  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(FilterSchema),
    defaultValues: {
      name: "",
      group: "",
      mobile_number: "",
    },
  });

  const handleFilter = (values: FilterType) => {
    setFilter(values);
  };

  return (
    <Box as="form">
      {/* Dropdowns Select */}
      <HStack spacing="2%" gridGap="16px" mb="24px" flexWrap="wrap">
        <Box w="32%" flexGrow="1">
          <Input
            type="text"
            placeholder="الإسم كاملاً"
            register={register("name")}
            error={errors.name?.message}
          />
        </Box>
        <Box w="32%" flexGrow="1">
          <Controller
            control={control}
            name="group"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                loading={isLoading}
                options={
                  data?.data
                    ? data?.data?.map((el) => ({
                        label: el.name || "",
                        value: el.id || "",
                      }))
                    : []
                }
                multi={false}
                placeholder="نوع المندوب"
                onChange={onChange}
                value={value}
                error={errors.group?.message}
                key={value}
              />
            )}
          />
        </Box>
        <Box w="32%" flexGrow="1">
          <Input
            type="number"
            placeholder="رقم الموبايل"
            register={register("mobile_number")}
            error={errors.mobile_number?.message}
          />
        </Box>
      </HStack>

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
          disabled={!isDirty}
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
