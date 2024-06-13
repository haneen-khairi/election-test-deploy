import {
  BarsIcon,
  DBIcon,
  PlusIcon,
  SwitchIcon,
  UpwardArrow,
} from "@assets/icons";
import { Box, HStack, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { FilterType } from "@components/content/Dashboard/Voters/FilterSection/FilterType";
import TabsContainer from "@components/core/tabsContainer/TabsContainer";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuthStore from "@store/AuthStore";
import { useForm } from "react-hook-form";
import { FilterSchema } from "./FilterSchema";
import { Btn } from "@components/core";

const ExpensesFilterSection = ({
  activeTabIndex,
  setActiveTabIndex,
}: {
  activeTabIndex: number;
  setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;
  setFilter: React.Dispatch<React.SetStateAction<FilterType | undefined>>;
}) => {
  const { data } = useAuthStore();

  const { watch } = useForm({
    resolver: yupResolver(FilterSchema),
    defaultValues: {
      date: "",
    },
  });

  return (
    <VStack>
      <HStack w="100%" justifyContent="space-between">
        <VStack alignItems="start">
          <Heading size="md" display="flex" gap="10px">
            <Text>مرحبا</Text>
            <Text>{data?.user?.name || "الاسم غير معروف,"}</Text>
          </Heading>
          <Text fontSize="md">
            هذه هي صفحة النفقات الخاصة بك حيث يمكنك إدارة وتتبع جميع المصروفات
            والتكاليف المتعلقة بانتخابات عام 2024.
          </Text>

          <TabsContainer
            setActiveTabIndex={setActiveTabIndex}
            tabs={[
              {
                text: "إحصائيات عامه",
                icon: (
                  <BarsIcon color={activeTabIndex === 0 ? "#318973" : "#000"} />
                ),
              },
              {
                text: "الدخل",
                icon: (
                  <UpwardArrow
                    color={activeTabIndex === 1 ? "#318973" : "#000"}
                  />
                ),
              },
              {
                text: "مصروفاتي",
                icon: (
                  <DBIcon color={activeTabIndex === 2 ? "#318973" : "#000"} />
                ),
              },
            ]}
            mt="15px"
          />
        </VStack>

        <HStack>
          {activeTabIndex === 0 && (
            <Box w="240px" mb="auto">
              <Input
                type="date"
                placeholder="التاريخ"
                name="date"
                sx={{
                  color: watch("date") ? "black" : "#718096",
                }}
              />
            </Box>
          )}

          {activeTabIndex === 1 && (
            <>
              <Btn
                type="solid"
                borderRadius="50px"
                icon={<PlusIcon />}
                iconPlacment="right"
                bg="#318973"
                color="#fff"
                fontSize="17px"
                onClick={() => {}}
              >
                <Text>أضافة دخل</Text>
              </Btn>

              <Btn
                type="solid"
                borderRadius="50px"
                icon={<SwitchIcon />}
                iconPlacment="right"
                color="#318973"
                border="1px solid #318973"
                borderColor="1px solid #318973"
                bg="#fff"
                _hover={{
                  opacity: 0.7,
                }}
                fontSize="17px"
                onClick={() => {}}
              >
                <Text>تحويل بين حساباتي</Text>
              </Btn>
            </>
          )}

          {activeTabIndex === 2 && (
            <Btn
              type="solid"
              borderRadius="50px"
              icon={<PlusIcon />}
              iconPlacment="right"
              bg="#c02323"
              color="#fff"
              fontSize="17px"
              _hover={{
                bg: "#c02323",
                opacity: 0.7,
              }}
              onClick={() => {}}
            >
              <Text>أضافة دخل</Text>
            </Btn>
          )}
        </HStack>
      </HStack>
    </VStack>
  );
};

export default ExpensesFilterSection;
