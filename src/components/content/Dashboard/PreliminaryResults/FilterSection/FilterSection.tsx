import { Box, HStack, Text } from "@chakra-ui/react";
import { Btn, InputSelect } from "@components/core";
import { CiSearch } from "react-icons/ci";
import { SlRefresh } from "react-icons/sl";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FilterSchema } from "./FilterSchema";
import { FilterType } from "./FilterType";
import {
  useGetBoxesDropDown2,
  useGetVotingCenterDropDown,
} from "@services/hooks/dropdown/useDropDown";
import { useEffect } from "react";

interface Props {
  SFilter: (data: FilterType | undefined) => void;
}

const FilterSection = ({ SFilter }: Props) => {
  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(FilterSchema),
    defaultValues: {
      voting_center: "",
      box_id: "",
    },
  });
  const { data: centers, isLoading: isCentersLoading } =
    useGetVotingCenterDropDown();
  const { data: boxes, isLoading: isBoxesLoading } = useGetBoxesDropDown2(
    Number(watch("voting_center"))
  );

  const handleFilter = (values: FilterType) => {
    SFilter({
      voting_center: values.voting_center,
      box_id: values.box_id,
    });
  };

  useEffect(() => {
    setValue("box_id", "");
  }, [watch("voting_center")]);

  return (
    <Box>
      {/* Dropdowns Select */}
      <HStack spacing="2%" gridGap="16px" mb="24px" flexWrap="wrap">
        <Box w="32%" flexGrow="1">
          <Controller
            control={control}
            name="voting_center"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                loading={isCentersLoading}
                options={
                  centers?.data
                    ? centers?.data.map((el) => ({
                        label: el.name || "",
                        value: el.id || 0,
                      }))
                    : []
                }
                multi={false}
                placeholder="مركز الإقتراع"
                onChange={onChange}
                value={value}
                error={errors.voting_center?.message}
                key={value}
              />
            )}
          />
        </Box>
        <Box w="32%" flexGrow="1">
          <Controller
            control={control}
            name="box_id"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                loading={isBoxesLoading}
                options={
                  boxes?.data
                    ? boxes?.data.map((el) => ({
                        label: el.name || "",
                        value: el.id || 0,
                      }))
                    : []
                }
                multi={false}
                placeholder="رقم الصندوق"
                onChange={onChange}
                value={value}
                error={errors.box_id?.message}
                key={value}
              />
            )}
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
