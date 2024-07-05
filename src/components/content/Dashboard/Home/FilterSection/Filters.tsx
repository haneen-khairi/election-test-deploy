/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilerIcon } from "@assets/icons";
import { Box, Text } from "@chakra-ui/react";
import {
  FirstNameSelect,
  LastNameSelect,
  MiddleNameSelect,
  PlaceOfResidenceSelect,
  SecondNameSelect,
} from "@components/content/DropDown";
import BoxesSelect from "@components/content/DropDown/BoxesSelect";
import CentersSelect from "@components/content/DropDown/CentersSelect";
import SupporterNameSelect from "@components/content/DropDown/SupporterNameSelect";
import ElectoralDistrictSelect from "@components/content/DropDown/ElectoralDistrictSelect";
import RepresentativesNameSelect from "@components/content/DropDown/RepresentativesNameSelect";
import { Btn } from "@components/core";
import RadioCardGroup from "@components/core/RadioCardButton/RadioCardButton";
import { useGetVotingCentersDropdown } from "@services/hooks/dropdown/useDropDown";
import { useState } from "react";
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
  activeTabIndex,
  handleSearch,
  onResetSearch = () => {},
  forMessagePage = false
}: {
  forMessagePage: boolean,
  reset: UseFormReset<any>;
  errors: FieldErrors<any>;
  control: Control<any, any>;
  isDirty: boolean;
  activeTabIndex: number;
  onResetSearch?: () => void;
  handleSearch: () => void;
}) => {
  const [search, setSearch] = useState<string>();
  const dropDownObj = useGetVotingCentersDropdown(search);

  return (
    <>
      {activeTabIndex !== 4 ? (
        <>
          {!forMessagePage &&<RadioCardGroup
            options={[
              {
                label: "ذكر",
                value: "M",
                color: "#2a8a6e",
              },
              {
                label: "أنثى",
                value: "F",
                color: "#ac37ac",
              },
            ]}
            name="gender"
            control={control}
          />}

          <Box>
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
      ) : (
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
                  circlesData={dropDownObj?.data || {}}
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
                  dropDownObj={dropDownObj}
                  setSearch={setSearch}
                  onChange={onChange}
                  value={value}
                  error={errors?.centers?.message as string}
                  key={value}
                />
              )}
            />
          </Box>
        </>
      )}

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
          onResetSearch()
          reset();
        }}
      >
        <Text>مسح الكل</Text>
      </Btn>

      {activeTabIndex !== 4 && (
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
              name={
                activeTabIndex === 3 ? "supporter_name" : "representative_name"
              }
              render={({ field: { onChange, value } }) =>
                activeTabIndex === 3 ? (
                  <SupporterNameSelect
                    onChange={onChange}
                    value={value}
                    error={errors?.supporter_name?.message as string}
                    key={value}
                  />
                ) : (
                  <RepresentativesNameSelect
                    onChange={onChange}
                    value={value}
                    error={errors?.representative_name?.message as string}
                    key={value}
                  />
                )
              }
            />
          </Box>
        </>
      )}

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
