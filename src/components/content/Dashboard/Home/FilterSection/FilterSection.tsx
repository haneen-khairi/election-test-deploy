/* eslint-disable react-hooks/exhaustive-deps */
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
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
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
import SupporterModal from "../modals/CompanionModal/SupporterModal";
import { useEffect, useState } from "react";
import { useDownloadMyLists } from "@services/hooks/excel/useExcel";
import { saveXLSXFile } from "@constants/functions/SaveXLSX";
import { Link } from "react-router-dom";

const HomeFilterSection = ({
  activeTabIndex,
  setActiveTabIndex,
  setFilter,
  filter,
}: {
  activeTabIndex: number;
  filter: any;
  setFilter: React.Dispatch<React.SetStateAction<any | undefined>>;
  setActiveTabIndex?: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { data } = useAuthStore();
  const companion = useDisclosure();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const {
    control,
    reset,
    watch,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(filterSectionSchema),
    defaultValues: {
      mandoub_main: undefined,
      gender: undefined,
      first_name: undefined,
      second_name: undefined,
      third_name: undefined,
      last_name: undefined,
      place_of_residence: undefined,
      electoral_district: undefined,
      box: undefined,
      voting_center: undefined,
      supporter_name: undefined,
      status: undefined,
    },
  });

  console.log(errors);
  

  const handleSearch = () => {
    const newFilter: any = {};

    [
      "gender",
      "first_name",
      "second_name",
      "third_name",
      "mandoub_main",
      "supporter_name",
      "electoral_district",
      "status",
      "place_of_residence",
      "last_name",
      // ---
      "boxes",
      "voting_center",
    ].forEach((field) => {
      const item = watch(field as any);
      if (item) newFilter[field] = item;
    });

    setFilter((prev: any) => ({
      ...prev,
      ...newFilter,
    }));
  };

  const downloadMyLists = useDownloadMyLists();

  const getFiltersLayout = () => {
    if (activeTabIndex === 0)
      return {
        columns: "repeat(12, 1fr)",
        rows: "repeat(3, auto)",
      };

    if (activeTabIndex === 4)
      return {
        columns: "repeat(12, 1fr)",
        rows: "repeat(5, auto)",
      };

    return {
      columns: "repeat(12, 1fr)",
      rows: "repeat(3, auto)",
    };
  };

  const handleExport = async () => {
    setIsFetching(true);

    downloadMyLists
      .mutateAsync({})
      .then((res) => {
        saveXLSXFile(res, "candidates.xlsx");
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  useEffect(() => {
    setFilter({});
    reset();
  }, [activeTabIndex]);

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

          <SupporterModal
            isOpen={companion.isOpen}
            onClose={companion.onClose}
          />
        </VStack>

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
          <VStack>
            <Btn
              type="solid"
              borderRadius="50px"
              icon={<DownloadIcon />}
              iconPlacment="right"
              bg={isFetching ? "#63636357" : "#318973"}
              borderColor={isFetching ? "transparent" : "#318973"}
              color="#fff"
              disabled={isFetching}
              fontSize="17px"
              onClick={handleExport}
              padding="20px 25px"
              mb="auto"
            >
              <Text>{isFetching ? "جاري التنزيل ..." : "تحميل ملف Excel"}</Text>
            </Btn>

            <HStack
              as={Link}
              to="/names-with-others"
              cursor="pointer"
              p="12px"
              rounded="8px"
              fontSize="16px"
              fontWeight="600"
              transition="0.3s ease"
              _hover={{
                textDecoration: "underline",
              }}
            >
              <Text>أسامي مع مناديب آخرين</Text>
            </HStack>
          </VStack>
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

      {activeTabIndex !== 2 && (
        <Grid
          as={"form"}
          templateColumns={getFiltersLayout().columns}
          templateRows={getFiltersLayout().rows}
          mt="20px"
          gap="16px"
          w="100%"
        >
          <Filters
            handleSearch={handleSubmit(handleSearch)}
            control={control}
            errors={errors}
            reset={reset}
            isDirty={isDirty}
            activeTabIndex={activeTabIndex}
            setFilter={setFilter}
            filter={filter}
            watch={watch}
          />
        </Grid>
      )}
    </VStack>
  );
};

export default HomeFilterSection;
