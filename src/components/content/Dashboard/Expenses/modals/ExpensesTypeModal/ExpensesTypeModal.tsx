/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, HStack, useToast } from "@chakra-ui/react";
import { GradientButton, Input, Popup } from "@components/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddIncomeType } from "@services/hooks/expenses/useExpenses";
import { EToast } from "@constants/functions/toast";
import { useResetFormModal } from "@components/content/Dashboard/hooks";
import { ExpensesTypeSchema } from "./ExpensesTypeSchema";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ExpensesTypeModal = ({ isOpen, onClose }: Props) => {
  const addIncomeType = useAddIncomeType();
  const toast = useToast();

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ExpensesTypeSchema),
    defaultValues: {},
  });

  const onSubmit = (values: any) => {
    addIncomeType.mutateAsync({ ...values, in_or_out: "out" }).then((res) => {
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
      <Popup title="إضافة نوع جديد" size="lg" isOpen={isOpen} onClose={onClose}>
        <Box>
          <Input
            label="إسم النوع"
            type="text"
            placeholder="ادخل إسم النوع"
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

export default ExpensesTypeModal;
