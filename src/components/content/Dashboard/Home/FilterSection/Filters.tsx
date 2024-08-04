/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilerIcon } from "@assets/icons";
import { Text } from "@chakra-ui/react";
import {
  FirstNameSelect,
  MiddleNameSelect,
  SecondNameSelect,
} from "@components/content/DropDown";
import BoxesSelect from "@components/content/DropDown/BoxesSelect";
import CentersSelect from "@components/content/DropDown/CentersSelect";
import SupporterNameSelect from "@components/content/DropDown/SupporterNameSelect";
import ElectoralDistrictSelect from "@components/content/DropDown/ElectoralDistrictSelect";
import RepresentativesNameSelect from "@components/content/DropDown/RepresentativesNameSelect";
import { Btn } from "@components/core";
import RadioCardGroup from "@components/core/RadioCardButton/RadioCardButton";
import {
  useGetLastNameDropdown,
  useGetplaceOfResidenceDropdown,
  useGetVotingCentersDropdown,
} from "@services/hooks/dropdown/useDropDown";
import { useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormReset,
} from "react-hook-form";
import { SlRefresh } from "react-icons/sl";
import StatusSelect from "@components/content/DropDown/StatusSelect";
import FilterBox from "./FilterBox";
import MultiSelect from "@components/core/multiSelect/MultiSelect";

const Filters = ({
  control,
  errors,
  activeTabIndex,
  handleSearch,
  reset,
  setFilter,
  filter,
  watch,
}: {
  setFilter: any;
  reset: UseFormReset<any>;
  errors: FieldErrors<any>;
  control: Control<any, any>;
  isDirty: boolean;
  activeTabIndex: number;
  handleSearch: () => void;
  filter: any;
  watch: any;
}) => {
  const [search, setSearch] = useState<string>();
  const dropDownObj = useGetVotingCentersDropdown(search);

  return (
    <>
      <FilterBox name="gender" tab={activeTabIndex}>
        <RadioCardGroup
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
        />
      </FilterBox>

      <FilterBox name="first_name" tab={activeTabIndex}>
        <Controller
          control={control}
          name="first_name"
          render={({ field: { onChange, value } }) => (
            <FirstNameSelect
              filter={filter}
              onChange={onChange}
              value={value}
              error={errors?.first_name?.message as string}
              key={value}
            />
          )}
        />
      </FilterBox>

      <FilterBox name="second_name" tab={activeTabIndex}>
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
            />
          )}
        />
      </FilterBox>

      <FilterBox name="third_name" tab={activeTabIndex}>
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
            />
          )}
        />
      </FilterBox>

      <FilterBox name="last_name" tab={activeTabIndex}>
        <MultiSelect
          name="last_name"
          placeholder="إسم العائلة"
          filter={filter}
          control={control}
          fetchFunction={useGetLastNameDropdown}
        />

        {/* <Controller
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
            />
          )}
        /> */}
      </FilterBox>

      <FilterBox name="status" tab={activeTabIndex}>
        <Controller
          control={control}
          name="status"
          render={({ field: { onChange, value } }) => (
            <StatusSelect
              onChange={onChange}
              value={value}
              error={errors?.status?.message as string}
              key={value}
            />
          )}
        />
      </FilterBox>

      <FilterBox name="supporter_name" tab={activeTabIndex}>
        <Controller
          control={control}
          name={activeTabIndex === 3 ? "supporter_name" : "mandoub_main"}
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
                error={errors?.mandoub_main?.message as string}
                key={value}
              />
            )
          }
        />
      </FilterBox>

      <FilterBox name="electoral_district" tab={activeTabIndex}>
        <Controller
          control={control}
          name="electoral_district"
          render={({ field: { onChange, value } }) => (
            <ElectoralDistrictSelect
              onChange={onChange}
              value={value}
              error={errors.electoral_district?.message as any}
              key={value}
            />
          )}
        />
      </FilterBox>

      <FilterBox name="box" tab={activeTabIndex}>
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
      </FilterBox>

      <FilterBox name="voting_center" tab={activeTabIndex}>
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
      </FilterBox>

      <FilterBox name="place_of_residence" tab={activeTabIndex}>
        <MultiSelect
          name="place_of_residence"
          placeholder="مكان الإقامة"
          filter={filter}
          control={control}
          fetchFunction={useGetplaceOfResidenceDropdown}
          isId={true}
        />

        {/* <Controller
          control={control}
          name="place_of_residence"
          render={({ field: { onChange, value } }) => (
            <PlaceOfResidenceSelect
              onChange={onChange}
              value={value}
              error={errors?.place_of_residence?.message as string}
              key={value}
              multi={true}
            />
          )}
        /> */}
      </FilterBox>

      <FilterBox name="filter" tab={activeTabIndex}>
        <Btn
          h="fit-content"
          py="10px"
          type="solid"
          borderRadius="50px"
          icon={<FilerIcon />}
          iconPlacment="right"
          bg={"#318973"}
          borderColor={"#318973"}
          color="#fff"
          fontSize="17px"
          onClick={handleSearch}
        >
          <Text>فلترة</Text>
        </Btn>
      </FilterBox>

      <FilterBox name="clear" tab={activeTabIndex}>
        <Btn
          h="fit-content"
          py="10px"
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
            setFilter({});
          }}
        >
          <Text>مسح الكل</Text>
        </Btn>
      </FilterBox>
    </>
  );
};

export default Filters;
