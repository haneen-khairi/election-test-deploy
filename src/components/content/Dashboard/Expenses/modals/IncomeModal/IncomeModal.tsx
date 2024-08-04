/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, HStack, useDisclosure, useToast } from "@chakra-ui/react";
import { GradientButton, Input, InputSelect, Popup } from "@components/core";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IncomeSchema } from "./IncomeSchema";
import {
  useAddIncome,
  useGetAddIncomeTypes,
} from "@services/hooks/expenses/useExpenses";
import { EToast } from "@constants/functions/toast";
import { useResetFormModal } from "@components/content/Dashboard/hooks";
import IncomeTypeModal from "../IncomeTypeModal/IncomeTypeModal";
import AccountsSelect from "@components/content/DropDown/AccountsSelect";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const IncomeModal = ({ isOpen, onClose }: Props) => {
  const { data: types, isLoading: isTypeLoading } = useGetAddIncomeTypes();
  const addIncomeType = useDisclosure();
  const addIncome = useAddIncome();
  const toast = useToast();

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(IncomeSchema),
    defaultValues: {},
  });

  const onSubmit = (values: any) => {
    addIncome
      .mutateAsync({
        ...values,
      })
      .then((res) => {
        if (res.error) {
          onClose();
          EToast({
            toast: toast,
            status: "error",
            title: "Error",
            description: Object.values(res.error)[0][0],
          });
        } else {
          EToast({
            toast: toast,
            status: "success",
            title: "نجاح العملية",
            description: "تمت الاضافة بنجاح",
          });
          onClose();
        }
      });
  };

  useResetFormModal(isOpen, reset);

  return (
    <>
      <Popup
        title="إضافة دخل"
        size="4xl"
        isOpen={isOpen}
        onClose={onClose}
        extraHeaderButton={true}
        extraHeaderButtonText="أضافة نوع دخل جديد"
        extraHeaderButtonOnClick={() => addIncomeType.onOpen()}
      >
        <IncomeTypeModal
          isOpen={addIncomeType.isOpen}
          onClose={addIncomeType.onClose}
        />

        <Box
          display="grid"
          gridTemplateColumns="repeat(6, 1fr)"
          width="100%"
          gap="30px"
        >
          <Box
            style={{
              gridColumn: "span 2",
            }}
          >
            <Controller
              control={control}
              name="to_account"
              render={({ field: { onChange, value } }) => (
                <AccountsSelect
                  onChange={onChange}
                  value={value}
                  error={errors?.to_account?.message as string}
                  key={value}
                  label="إلى حساب"
                  placeholder="اختر نوع الحساب"
                  isName={false}
                />
              )}
            />
          </Box>

          <Box
            style={{
              gridColumn: "span 2",
            }}
          >
            <Controller
              control={control}
              name="type"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  loading={isTypeLoading}
                  label="نوع الدخل"
                  options={
                    types?.data
                      ? types?.data.map((el: any) => ({
                          label: el.name || "",
                          value: el.id || 0,
                        }))
                      : []
                  }
                  multi={false}
                  placeholder="اختر نوع الدخل"
                  onChange={onChange}
                  value={value}
                  error={errors.type?.message}
                  size="lg"
                />
              )}
            />
          </Box>

          <Box
            style={{
              gridColumn: "span 2",
            }}
          >
            <Input
              label="القيمة"
              type="number"
              placeholder="ادخل القيمة"
              register={register("amount")}
              error={errors.amount?.message}
            />
          </Box>

          <Box
            style={{
              gridColumn: "span 3",
            }}
          >
            <Input
              label="التاريخ"
              type="date"
              placeholder="ادخل التاريخ"
              register={register("date")}
              error={errors.date?.message}
            />
          </Box>

          <Box
            style={{
              gridColumn: "span 3",
            }}
          >
            <Input
              label="الوقت"
              type="time"
              placeholder="ادخل الوقت"
              register={register("time")}
              error={errors.time?.message}
            />
          </Box>
        </Box>

        <HStack mt="24px" justifyContent="end">
          <GradientButton onClick={handleSubmit(onSubmit)}>
            إضافة
          </GradientButton>
        </HStack>
      </Popup>
    </>
  );
};

export default IncomeModal;
