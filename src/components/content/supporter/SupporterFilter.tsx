/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm } from "react-hook-form";
import {
  FirstNameSelect,
  LastNameSelect,
  MiddleNameSelect,
  SecondNameSelect,
} from "../DropDown";
import { Btn } from "@components/core";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import useSupportersStore from "@store/SupportersStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { filterSchemas } from "./FilterSchemas";
import { useParams } from "react-router-dom";

const SupporterFilter = React.memo(() => {
  const { setFilter, filter } = useSupportersStore();
  const { id } = useParams<{ id: string }>();

  const {
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(filterSchemas),
    defaultValues: {
      first_name: undefined,
      second_name: undefined,
      third_name: undefined,
      last_name: undefined,
    },
  });

  const handleSearch = () => {
    const values = getValues();
    setFilter({ ...values });
  };

  const handleClear = () => {
    setFilter({}, true);
    reset();
  };

  return (
    <>
      <Box gridColumn={{ base: "span 9", lg: "span 3" }}>
        <Controller
          control={control}
          name="first_name"
          render={({ field: { onChange, value } }) => (
            <FirstNameSelect
              onChange={onChange}
              filter={filter}
              value={value}
              error={errors?.first_name?.message as string}
              key={value}
              token={id}
            />
          )}
        />
      </Box>

      <Box gridColumn={{ base: "span 9", lg: "span 3" }}>
        <Controller
          control={control}
          name="second_name"
          render={({ field: { onChange, value } }) => (
            <SecondNameSelect
              filter={filter}
              onChange={onChange}
              value={value}
              error={errors?.second_name?.message as string}
              key={value}
              token={id}
            />
          )}
        />
      </Box>

      <Box gridColumn={{ base: "span 9", lg: "span 3" }}>
        <Controller
          control={control}
          name="third_name"
          render={({ field: { onChange, value } }) => (
            <MiddleNameSelect
              filter={filter}
              onChange={onChange}
              value={value}
              error={errors?.third_name?.message as string}
              key={value}
              token={id}
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
              filter={filter}
              onChange={onChange}
              value={value}
              error={errors?.last_name?.message as string}
              key={value}
              multi={true}
              token={id}
            />
          )}
        />
      </Box>

      <Box gridColumn={{ base: "span 4", lg: "span 2" }}>
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

      <Box gridColumn={{ base: "span 5", lg: "span 2" }}>
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
          onClick={handleClear}
        >
          <Text>مسح الكل</Text>
        </Btn>
      </Box>
    </>
  );
});

export default SupporterFilter;
