/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, HStack, useToast } from "@chakra-ui/react";
import { GradientButton, Input, Popup } from "@components/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddAccount } from "@services/hooks/expenses/useExpenses";
import { EToast } from "@constants/functions/toast";
import { useResetFormModal } from "@components/content/Dashboard/hooks";
import { AccountSchema } from "./AccountSchema";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AccountModal = ({ isOpen, onClose }: Props) => {
  const addAccount = useAddAccount();
  const toast = useToast();

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AccountSchema),
    defaultValues: {},
  });

  const onSubmit = (values: any) => {
    addAccount.mutateAsync(values).then((res) => {
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
        title="إضافة حساب جديد"
        size="lg"
        isOpen={isOpen}
        onClose={onClose}
      >
        <Box>
          <Input
            label="إسم الحساب"
            type="text"
            placeholder="ادخل إسم الحساب"
            register={register("name")}
            error={errors.name?.message}
          />
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

export default AccountModal;
