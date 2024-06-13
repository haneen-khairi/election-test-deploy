import { Box, HStack, Text } from "@chakra-ui/react";
import { Btn, Input, InputSelect } from "@components/core";
import { CiSearch } from "react-icons/ci";
import { SlRefresh } from "react-icons/sl";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FilterSchema } from "./FilterSchema";
import { FilterType } from "./FilterType";
import { useEffect } from "react";
import useDelegatesStore from "@store/DelegatesStore";
import { useGetDelegateTypes } from "@services/hooks/delegates/useGroups";

interface Props {
  SFilter: (data: FilterType | undefined) => void;
}
const FilterSection = ({ SFilter }: Props) => {
  const { data, isLoading } = useGetDelegateTypes();
  const {
    handleSubmit,
    control,
    reset,
    register,
    watch,
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
    SFilter(values);
  };

  const { group, mobile_number, name } = watch();
  const { setFilter } = useDelegatesStore();

  useEffect(() => {
    if (isDirty) {
      setFilter({
        group,
        mobile_number,
        name,
      });
    }
  }, [group, mobile_number, name, isDirty, setFilter]);

  return (
    <Box>
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
                    ? data?.data.map((el) => ({
                        label: el.name || "",
                        value: el.id || 0,
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
            SFilter(undefined);
          }}
          disabled={!isDirty}
        >
          <Text>مسح الكل</Text>
        </Btn>
      </HStack>
    </Box>
  );
};

export default FilterSection;
