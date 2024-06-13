/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
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
import { FaPlus } from "react-icons/fa";

const TasksFilterSection = ({
  setFilter,
}: {
  setFilter: React.Dispatch<React.SetStateAction<any | undefined>>;
}) => {
  const { data } = useAuthStore();
  const add = useDisclosure();

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

  const handleSearch = () => {
    setFilter((prev: any) => ({
      ...prev,
      district: watch("district"),
      representative_name: watch("representative_name"),
      gender: watch("gender"),
      first_name: watch("first_name"),
      second_name: watch("second_name"),
      third_name: watch("third_name"),
      last_name: watch("last_name"),
      place_of_residence: watch("place_of_residence"),
      electoral_district: watch("electoral_district"),
      boxes: watch("boxes"),
      centers: watch("centers"),
    }));
  };

  return (
    <VStack>
      <HStack w="100%" justifyContent="space-between">
        <VStack alignItems="start">
          <Heading size="md" display="flex" gap="10px">
            <Text>مرحبا</Text>
            <Text>{data?.user?.name || "الاسم غير معروف,"}</Text>
          </Heading>
          <Text fontSize="md">
            هذه هي صفحة المهام الخاصة بك حيث يمكنك إدارة وتتبع جميع الأنشطة
            والواجبات المتعلقة بانتخابات عام 2024.
          </Text>
        </VStack>

        <Btn
          type="solid"
          borderRadius="50px"
          iconPlacment="right"
          bg="#318973"
          color="#fff"
          fontSize="17px"
          onClick={add.onOpen}
          padding="20px 25px"
          mb="auto"
          icon={<FaPlus />}
        >
          <Text>اضافة مهام</Text>
        </Btn>
      </HStack>

      <Grid
        templateColumns={"repeat(4, 1fr) 150px"}
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
        />
      </Grid>
    </VStack>
  );
};

export default TasksFilterSection;
