/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilerIcon } from "@assets/icons";
import { Box, Text } from "@chakra-ui/react";
import {
  LastNameSelect,
  MiddleNameSelect,
  PlaceOfResidenceSelect,
  SecondNameSelect,
} from "@components/content/DropDown";
import BoxesSelect from "@components/content/DropDown/BoxesSelect";
import CentersSelect from "@components/content/DropDown/CentersSelect";
import CompanionNameSelect from "@components/content/DropDown/CompanionNameSelect";
import ElectoralDistrictSelect from "@components/content/DropDown/ElectoralDistrictSelect";
import { Btn } from "@components/core";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormReset,
} from "react-hook-form";
import { SlRefresh } from "react-icons/sl";

const Filters = ({
  control,
  errors,
  reset,
  handleSearch,
}: {
  reset: UseFormReset<any>;
  errors: FieldErrors<any>;
  control: Control<any, any>;
  isDirty: boolean;
  handleSearch: () => void;
}) => {
  return (
    <>
      <>
        <Box>
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

        <Box>
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
      </>

      <>
        <Box>
          <Controller
            control={control}
            name="boxes"
            render={({ field: { onChange, value } }) => (
              <BoxesSelect
                onChange={onChange}
                value={value}
                error={errors?.boxes?.message as string}
                key={value}
              />
            )}
          />
        </Box>

        <Box>
          <Controller
            control={control}
            name="centers"
            render={({ field: { onChange, value } }) => (
              <CentersSelect
                onChange={onChange}
                value={value}
                error={errors?.centers?.message as string}
                key={value}
              />
            )}
          />
        </Box>
      </>

      <Btn
        h="100%"
        type="outlined"
        fontSize="17px"
        color="red"
        border="1px solid red"
        borderColor="red"
        borderRadius="50px"
        icon={<SlRefresh />}
        iconPlacment="right"
        _hover={{
          backgroundColor: "red",
          color: "white",
        }}
        onClick={() => {
          reset();
        }}
      >
        <Text>مسح الكل</Text>
      </Btn>

      <>
        <Box>
          <Controller
            control={control}
            name="last_name"
            render={({ field: { onChange, value } }) => (
              <LastNameSelect
                onChange={onChange}
                value={value}
                error={errors?.last_name?.message as string}
                key={value}
              />
            )}
          />
        </Box>

        <Box>
          <Controller
            control={control}
            name={"companion_name"}
            render={({ field: { onChange, value } }) => (
              <CompanionNameSelect
                onChange={onChange}
                value={value}
                error={errors?.companion_name?.message as string}
                key={value}
              />
            )}
          />
        </Box>
      </>

      <Box>
        <Controller
          control={control}
          name="district"
          render={({ field: { onChange, value } }) => (
            <ElectoralDistrictSelect
              onChange={onChange}
              value={value}
              error={errors.district?.message as any}
              key={value}
            />
          )}
        />
      </Box>

      <Box>
        <Controller
          control={control}
          name="place_of_residence"
          render={({ field: { onChange, value } }) => (
            <PlaceOfResidenceSelect
              onChange={onChange}
              value={value}
              error={errors?.place_of_residence?.message as string}
              key={value}
            />
          )}
        />
      </Box>

      <Btn
        h="100%"
        type="solid"
        borderRadius="50px"
        icon={<FilerIcon />}
        iconPlacment="right"
        bg="#318973"
        color="#fff"
        fontSize="17px"
        onClick={handleSearch}
      >
        <Text>فلترة</Text>
      </Btn>
    </>
  );
};

export default Filters;
