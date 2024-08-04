/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Control,
  Controller,
  FieldErrors,
  UseFormReset,
} from "react-hook-form";
import {
  FirstNameSelect,
  LastNameSelect,
  MiddleNameSelect,
  SecondNameSelect,
} from "../DropDown";
import { Btn } from "@components/core";
import { Box, Text } from "@chakra-ui/react";

const SupporterFilter = ({
  control,
  errors,
  handleSearch,
  reset,
  setFilter,
}: {
  errors: FieldErrors<any>;
  control: Control<any, any>;
  handleSearch: () => void;
  setFilter: any;
  reset: UseFormReset<any>;
}) => {
  return (
    <>
      <Box gridColumn="span 3">
        <Controller
          control={control}
          name="first_name"
          render={({ field: { onChange, value } }) => (
            <FirstNameSelect
              onChange={onChange}
              value={value}
              error={errors?.first_name?.message as string}
              key={value}
            />
          )}
        />
      </Box>

      <Box gridColumn="span 3">
        <Controller
          control={control}
          name="second_name"
          render={({ field: { onChange, value } }) => (
            <SecondNameSelect
              onChange={onChange}
              value={value}
              error={errors?.second_name?.message as string}
              key={value}
            />
          )}
        />
      </Box>

      <Box gridColumn="span 3">
        <Controller
          control={control}
          name="third_name"
          render={({ field: { onChange, value } }) => (
            <MiddleNameSelect
              onChange={onChange}
              value={value}
              error={errors?.third_name?.message as string}
              key={value}
            />
          )}
        />
      </Box>

      <Box gridColumn="span 9">
        <Controller
          control={control}
          name="last_name"
          render={({ field: { onChange, value } }) => (
            <LastNameSelect
              onChange={onChange}
              value={value}
              error={errors?.last_name?.message as string}
              key={value}
              multi={true}
            />
          )}
        />
      </Box>

      <Box gridColumn="span 2">
        <Btn
          h="fit-content"
          py="10px"
          type="solid"
          borderRadius="50px"
          iconPlacment="right"
          bg={"#318973"}
          borderColor={"#318973"}
          color="#fff"
          fontSize="17px"
          onClick={handleSearch}
        >
          <Text>بحث</Text>
        </Btn>
      </Box>

      <Box gridColumn="span 2">
        <Btn
          h="fit-content"
          py="10px"
          type="outlined"
          fontSize="17px"
          color="red"
          border="1px solid red"
          borderColor="red"
          borderRadius="50px"
          iconPlacment="right"
          _hover={{
            backgroundColor: "red",
            color: "white",
          }}
          onClick={() => {
            reset();
            setFilter({});
          }}
        >
          <Text>مسح الكل</Text>
        </Btn>
      </Box>
    </>
  );
};

export default SupporterFilter;
