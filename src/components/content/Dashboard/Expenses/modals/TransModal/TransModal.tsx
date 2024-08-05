/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, HStack, VStack, useToast } from "@chakra-ui/react";
import { GradientButton, Input, Popup } from "@components/core";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TransSchema } from "./TransSchema";
import { useResetFormModal } from "@components/content/Dashboard/hooks";
import { useTransBetweenAccounts } from "@services/hooks/expenses/useExpenses";
import { EToast } from "@constants/functions/toast";
import AccountsSelect from "@components/content/DropDown/AccountsSelect";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const TransModal = ({ isOpen, onClose }: Props) => {
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
            description:
              typeof res.error === "string"
                ? res.error
                : (Object.values(res.error as any)[0] as any)[0],
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
                <AccountsSelect
                  onChange={onChange}
                  value={value}
                  error={errors?.to_account?.message as string}
                  key={value}
                  label="من حساب"
                  placeholder="اختر الحساب"
                  isName={false}
                />
              )}
            />
          </Box>

          <Box width="100%">
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
                  placeholder="اختر الحساب"
                  isName={false}
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
