/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, HStack, VStack, useToast } from "@chakra-ui/react";
import { GradientButton, Input, InputSelect, Popup } from "@components/core";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TransSchema } from "./TransSchema";
import { useResetFormModal } from "@components/content/Dashboard/hooks";
import {
  useGetAddIncomeAccounts,
  useTransBetweenAccounts,
} from "@services/hooks/expenses/useExpenses";
import { EToast } from "@constants/functions/toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const TransModal = ({ isOpen, onClose }: Props) => {
  const { data: accounts, isLoading: isAccountLoading } =
    useGetAddIncomeAccounts() as any;

  const makeTransaction = useTransBetweenAccounts();
  const toast = useToast();

  const {
    handleSubmit,
    reset,
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(TransSchema),
    defaultValues: {},
  });

  useResetFormModal(isOpen, reset);

  const onSubmit = (values: any) => {
    makeTransaction
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
            description: res.error,
          });
        } else {
          EToast({
            toast: toast,
            status: "success",
            title: "نجاح العملية",
            description: "تم التحويل بنجاح",
          });
          onClose();
        }
      });
  };

  return (
    <>
      <Popup
        title="تحويل بين حساباتي"
        size="sm"
        isOpen={isOpen}
        onClose={onClose}
      >
        <VStack width="100%">
          <Box width="100%">
            <Controller
              control={control}
              name="from_account"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  loading={isAccountLoading}
                  label="من حساب"
                  options={
                    accounts?.data?.data
                      ? accounts?.data?.data.map((el: any) => ({
                          label: el.name || "",
                          value: el.id || 0,
                        }))
                      : []
                  }
                  multi={false}
                  placeholder="اختر الحساب"
                  onChange={onChange}
                  value={value}
                  error={errors.from_account?.message}
                  size="lg"
                />
              )}
            />
          </Box>

          <Box width="100%">
            <Controller
              control={control}
              name="to_account"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  loading={isAccountLoading}
                  label="إلى حساب"
                  options={
                    accounts?.data?.data
                      ? accounts?.data?.data.map((el: any) => ({
                          label: el.name || "",
                          value: el.id || 0,
                        }))
                      : []
                  }
                  multi={false}
                  placeholder="اختر الحساب"
                  onChange={onChange}
                  value={value}
                  error={errors.to_account?.message}
                  size="lg"
                />
              )}
            />
          </Box>

          <Box width="100%">
            <Input
              label="القيمة"
              type="number"
              placeholder="ادخل القيمة"
              register={register("amount")}
              error={errors.amount?.message}
            />
          </Box>
        </VStack>

        <HStack mt="24px" justifyContent="end">
          <GradientButton onClick={handleSubmit(onSubmit)}>
            تحويل
          </GradientButton>
        </HStack>
      </Popup>
    </>
  );
};

export default TransModal;
