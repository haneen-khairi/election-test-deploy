import { Box, HStack, Text } from "@chakra-ui/react";
import { Btn, Input, InputSelect } from "@components/core";
import { CiSearch } from "react-icons/ci";
import { SlRefresh } from "react-icons/sl";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FilterSchema } from "./FilterSchema";
import { FilterType } from "./FilterType";
import { useGetDelegateTypes } from "@services/hooks/delegates/useGroups";
import { useGetTakTypes } from "@services/hooks/tasks/useTasks";
import { TaskStatusOptions } from "@constants/variables/Dashboard";

interface Props {
  SFilter: (data: FilterType | undefined) => void;
}

const FilterSection = ({ SFilter }: Props) => {
  const { data: mandobTypes, isLoading: isMandobTypesLoading } =
    useGetDelegateTypes();
  const { data: taskTypes, isLoading: isTaskTypesLoading } = useGetTakTypes();

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
      date: "",
      mandob_name: "",
      mandob_type: "",
      status: "",
      task_type: "",
      time: "",
    },
  });

  const handleFilter = (values: FilterType) => {
    SFilter({
      mandob_name: values.mandob_name,
      status: values.status,
      date: values.date,
      mandob_type: values.mandob_type,
      task_type: values.task_type,
      time: values.time,
    });
  };

  return (
    <Box>
      {/* Dropdowns Select */}
      <HStack spacing="2%" gridGap="16px" mb="24px" flexWrap="wrap">
        <Box w="32%" flexGrow="1">
          <Controller
            control={control}
            name="task_type"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                loading={isTaskTypesLoading}
                options={
                  taskTypes?.data
                    ? taskTypes?.data.map((el) => ({
                        label: el.name || "",
                        value: el.id || 0,
                      }))
                    : []
                }
                multi={false}
                placeholder="نوع المهمة"
                onChange={onChange}
                value={value}
                error={errors.task_type?.message}
                key={value}
              />
            )}
          />
        </Box>
        <Box w="32%" flexGrow="1">
          <Controller
            control={control}
            name="mandob_type"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                loading={isMandobTypesLoading}
                options={
                  mandobTypes?.data
                    ? mandobTypes?.data.map((el) => ({
                        label: el.name || "",
                        value: el.id || 0,
                      }))
                    : []
                }
                multi={false}
                placeholder="نوع المندوب"
                onChange={onChange}
                value={value}
                error={errors.mandob_type?.message}
                key={value}
              />
            )}
          />
        </Box>
        <Box w="32%" flexGrow="1">
          <Input
            type="text"
            placeholder="اسم المندوب"
            register={register("mandob_name")}
            error={errors.mandob_name?.message}
          />
        </Box>
        <Box w="32%" flexGrow="1">
          <Controller
            control={control}
            name="status"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                options={TaskStatusOptions?.map((el) => ({
                  label: el.title || "",
                  value: el.value || 0,
                }))}
                multi={false}
                placeholder="الحالة"
                onChange={onChange}
                value={value}
                error={errors.status?.message}
                key={value}
              />
            )}
          />
        </Box>
        <Box w="32%" flexGrow="1">
          <Input
            type="date"
            placeholder="التاريخ"
            register={register("date")}
            error={errors.date?.message}
            sx={{
              color: watch("date") ? "black" : "#718096",
            }}
          />
        </Box>
        <Box w="32%" flexGrow="1">
          <Input
            type="time"
            placeholder="الوقت"
            register={register("time")}
            error={errors.time?.message}
            sx={{
              color: watch("time") ? "black" : "#718096",
            }}
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
