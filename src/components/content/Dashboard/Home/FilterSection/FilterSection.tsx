/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Grid,
  HStack,
  Heading,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { PlaceOfResidenceSelect } from "@components/content/DropDown";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { filterSectionSchema } from "./FilterSectionSchemas";
import useAuthStore from "@store/AuthStore";
import Filters from "./Filters";
import TabsContainer from "@components/core/tabsContainer/TabsContainer";
import {
  CalenderIcon,
  CompanionIcon,
  DownloadIcon,
  PeopleIcon,
  StackIcon,
} from "@assets/icons";
import { Btn } from "@components/core";
import ElectoralDistrictSelect from "@components/content/DropDown/ElectoralDistrictSelect";
import CompanionModal from "../modals/CompanionModal/CompanionModal";
import { useEffect } from "react";
import { SlRefresh } from "react-icons/sl";

const HomeFilterSection = ({
  activeTabIndex,
  setActiveTabIndex,
  setFilter,
}: {
  activeTabIndex: number;
  setFilter: React.Dispatch<React.SetStateAction<any | undefined>>;
  setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { data } = useAuthStore();
  const companion = useDisclosure();

  const {
    control,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(filterSectionSchema),
    defaultValues: {
      district: undefined,
      representative_name: undefined,
      companion_name: undefined,
      gender: "M",
      first_name: undefined,
      second_name: undefined,
      third_name: undefined,
      last_name: undefined,
      place_of_residence: undefined,
      electoral_district: undefined,
      boxes: undefined,
      centers: undefined,
    },
  });

  const { place_of_residence, district } = watch();

  const handleSearch = () => {
    const newFilter: any = {};

    [
      "gender",
      "first_name",
      "second_name",
      "third_name",
      "last_name",
      "representative_name",
      "district",
      "place_of_residence",
      // ---
      "boxes",
      "centers",
    ].forEach((field) => {
      const item = watch(field as any);
      if (item) newFilter[field] = item;
    });

    setFilter((prev: any) => ({
      ...prev,
      ...newFilter,
    }));
  };

  useEffect(() => {
    const newFilter: any = {};

    ["place_of_residence", "district"].forEach((field) => {
      const item = watch(field as any);
      if (item) newFilter[field] = item;
    });

    setFilter((prev: any) => ({
      ...prev,
      ...newFilter,
    }));
  }, [place_of_residence, district]);

  return (
    <VStack w="100%" alignItems="start">
      <HStack w="100%" justifyContent="space-between">
        <VStack alignItems="start" w="50%">
          <Heading size="md" display="flex" gap="10px">
            <Text>مرحبا</Text>
            <Text>{data?.user?.name || "الاسم غير معروف,"}</Text>
          </Heading>
          <Text fontSize="md">
            هذه هي لوحة التحكم الخاصة بك حيث يمكنك عرض إحصائيات أصواتك لانتخابات
            عام 2024
          </Text>

          <CompanionModal
            isOpen={companion.isOpen}
            onClose={companion.onClose}
          />
        </VStack>

        {activeTabIndex === 0 && (
          <HStack gap="12px" w="50%">
            <Controller
              control={control}
              name="place_of_residence"
              render={({ field: { onChange, value } }) => (
                <PlaceOfResidenceSelect
                  key={value}
                  value={value}
                  onChange={onChange}
                  error={errors.place_of_residence?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="district"
              render={({ field: { onChange, value } }) => (
                <ElectoralDistrictSelect
                  key={value}
                  value={value}
                  onChange={onChange}
                  error={errors.district?.message}
                />
              )}
            />

            <Btn
              w="100%"
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
          </HStack>
        )}

        {activeTabIndex === 3 && (
          <Btn
            type="solid"
            borderRadius="50px"
            iconPlacment="right"
            bg="#318973"
            color="#fff"
            fontSize="17px"
            onClick={() => companion.onOpen()}
            padding="20px 25px"
            mb="auto"
          >
            <Text>لجان المؤازرة</Text>
          </Btn>
        )}

        {activeTabIndex === 2 && (
          <Btn
            type="solid"
            borderRadius="50px"
            icon={<DownloadIcon />}
            iconPlacment="right"
            bg="#318973"
            color="#fff"
            fontSize="17px"
            onClick={() => {}}
            padding="20px 25px"
            mb="auto"
          >
            <Text>تحميل ملف Excel</Text>
          </Btn>
        )}
      </HStack>

      <Box>
        <TabsContainer
          setActiveTabIndex={setActiveTabIndex}
          tabs={[
            {
              text: " عدد الناخبين",
              icon: (
                <PeopleIcon color={activeTabIndex === 0 ? "#318973" : "#000"} />
              ),
            },
            {
              text: "أصواتي",
              icon: (
                <StackIcon color={activeTabIndex === 1 ? "#318973" : "#000"} />
              ),
            },
            {
              text: "قوائمي",
              icon: (
                <PeopleIcon color={activeTabIndex === 2 ? "#318973" : "#000"} />
              ),
            },
            {
              text: "مؤازرة",
              icon: (
                <CompanionIcon
                  color={activeTabIndex === 3 ? "#318973" : "#000"}
                />
              ),
            },
            {
              text: "اليوم الانتخابي",
              icon: (
                <CalenderIcon
                  color={activeTabIndex === 4 ? "#318973" : "#000"}
                />
              ),
            },
          ]}
          mt="15px"
        />
      </Box>

      {activeTabIndex !== 0 && (
        <Grid
          templateColumns={
            activeTabIndex !== 4
              ? "repeat(4, 1fr) 150px"
              : "repeat(2, 1fr) 150px"
          }
          templateRows="repeat(2, 1fr)"
          mt="20px"
          gap="16px"
          w="100%"
        >
          <Filters
            handleSearch={handleSearch}
            control={control}
            errors={errors}
            reset={reset}
            isDirty={isDirty}
            activeTabIndex={activeTabIndex}
          />
        </Grid>
      )}
    </VStack>
  );
};

export default HomeFilterSection;
