/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { InputSelect } from "@components/core";
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
import { useEffect, useMemo } from "react";

interface Props {
  SFilter: any;
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
    watch("voting_center") || "",
  );

  const boxesData: any = useMemo(() => boxes?.data || [], [boxes]);

  const handleFilter = (values: FilterType) => {
    SFilter((prev: any) => ({
      ...prev,
      voting_center: values.voting_center,
      box_id: values.box_id,
    }));
  };

  useEffect(() => {
    setValue("box_id", "");
  }, [watch("voting_center")]);

  return (
    <Box as="form">
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
                  boxesData?.boxes
                    ? boxesData?.boxes.map((el: any) => ({
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
            SFilter({});
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
