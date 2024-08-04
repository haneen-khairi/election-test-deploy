import {
  BarsIcon,
  DBIcon,
  PlusIcon,
  SwitchIcon,
  UpwardArrow,
} from "@assets/icons";
import {
  Box,
  HStack,
  Heading,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import TabsContainer from "@components/core/tabsContainer/TabsContainer";
import useAuthStore from "@store/AuthStore";
import { Btn } from "@components/core";
import IncomeModal from "../modals/IncomeModal/IncomeModal";
import ExpenseModal from "../modals/ExpenseModal/ExpenseModal";
import TransModal from "../modals/TransModal/TransModal";
import AccountModal from "../modals/AccountModal/AccountModal";

const ExpensesFilterSection = ({
  activeTabIndex,
  setActiveTabIndex,
}: {
  activeTabIndex: number;
  setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { data } = useAuthStore();

  const addIncome = useDisclosure();
  const addAccount = useDisclosure();
  const transBetweenAccounts = useDisclosure();
  const addExpense = useDisclosure();

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

        <IncomeModal isOpen={addIncome.isOpen} onClose={addIncome.onClose} />
        <AccountModal isOpen={addAccount.isOpen} onClose={addAccount.onClose} />
        <ExpenseModal isOpen={addExpense.isOpen} onClose={addExpense.onClose} />
        <TransModal
          isOpen={transBetweenAccounts.isOpen}
          onClose={transBetweenAccounts.onClose}
        />

        <HStack>
          {activeTabIndex === 1 && (
            <Box display="grid" gridTemplateColumns="auto auto" gap="10px">
              <Btn
                type="solid"
                borderRadius="50px"
                icon={<PlusIcon />}
                iconPlacment="right"
                bg="#318973"
                color="#fff"
                fontSize="17px"
                onClick={() => addIncome.onOpen()}
              >
                <Text>أضافة دخل</Text>
              </Btn>

              <Btn
                type="solid"
                borderRadius="50px"
                icon={<PlusIcon />}
                iconPlacment="right"
                bg="#318973"
                color="#fff"
                fontSize="17px"
                onClick={() => addAccount.onOpen()}
              >
                <Text>أضافة حساب</Text>
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
                gridColumn="span 2"
                _hover={{
                  opacity: 0.7,
                }}
                fontSize="17px"
                onClick={() => transBetweenAccounts.onOpen()}
              >
                <Text>تحويل بين حساباتي</Text>
              </Btn>
            </Box>
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
              onClick={() => addExpense.onOpen()}
            >
              <Text>أضافة مصروف</Text>
            </Btn>
          )}
        </HStack>
      </HStack>
    </VStack>
  );
};

export default ExpensesFilterSection;
