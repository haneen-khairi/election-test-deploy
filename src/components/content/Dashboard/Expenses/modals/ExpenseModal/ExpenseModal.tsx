/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Grid, HStack, useDisclosure, useToast } from "@chakra-ui/react";
import { GradientButton, Input, InputSelect, Popup } from "@components/core";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ExpenseSchema } from "./ExpenseSchema";
import { useResetFormModal } from "@components/content/Dashboard/hooks";
import {
  useAddExpense,
  useGetAddExpensesTypes,
  useGetAddIncomeAccounts,
} from "@services/hooks/expenses/useExpenses";
import { EToast } from "@constants/functions/toast";
import FileInput from "@components/core/FileInput/FileInput";
import { useState } from "react";
import ExpensesTypeModal from "../ExpensesTypeModal/ExpensesTypeModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ExpenseModal = ({ isOpen, onClose }: Props) => {
  const { data: types, isLoading: isTypeLoading } = useGetAddExpensesTypes();
  const { data: accounts, isLoading: isAccountLoading } =
    useGetAddIncomeAccounts() as any;

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const addExpenseType = useDisclosure();
  const addExpense = useAddExpense();
  const toast = useToast();

  const {
    handleSubmit,
    reset,
    control,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ExpenseSchema),
    defaultValues: {},
  });

  useResetFormModal(isOpen, reset);

  const onSubmit = (values: any) => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("from_account", values?.from_account);
    formData.append("amount", values?.amount);
    formData.append("type", values?.type);
    formData.append("date", values?.date);
    formData.append("time", values?.time);
    formData.append("notes", values?.notes);

    addExpense.mutateAsync(formData).then((res: any) => {
      if (res.error && Object.keys(res.error).length > 0) {
        onClose();
        EToast({
          toast: toast,
          status: "error",
          title: "Error",
          description: Object.values(res.error)[0] as any,
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

  return (
    <>
      <Popup
        title="إضافة مصروف"
        size="4xl"
        isOpen={isOpen}
        onClose={onClose}
        extraHeaderButton={true}
        extraHeaderButtonText="أضافة نوع مصروف جديد"
        extraHeaderButtonOnClick={() => addExpenseType.onOpen()}
      >
        <ExpensesTypeModal
          isOpen={addExpenseType.isOpen}
          onClose={addExpenseType.onClose}
        />

        <Grid gridTemplateColumns="50% auto" gap="15px">
          <Box
            style={{
              gridColumn: "1 / 2",
              gridRow: "span 3",
            }}
          >
            <FileInput
              selectedFile={selectedImage}
              setSelectedFile={setSelectedImage}
              type="image"
            />
          </Box>

          <Box>
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

          <Box>
            <Controller
              control={control}
              name="type"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  loading={isTypeLoading}
                  label="نوع المصروف"
                  options={
                    types?.data
                      ? types?.data.map((el: any) => ({
                          label: el.name || "",
                          value: el.id || 0,
                        }))
                      : []
                  }
                  multi={false}
                  placeholder="اختر نوع المصروف"
                  onChange={onChange}
                  value={value}
                  error={errors.type?.message}
                  size="lg"
                />
              )}
            />
          </Box>

          <Box>
            <Input
              label="القيمة"
              type="number"
              placeholder="ادخل القيمة"
              register={register("amount")}
              error={errors.amount?.message}
            />
          </Box>

          <Box>
            <Input
              label="التاريخ"
              type="date"
              placeholder="ادخل التاريخ"
              register={register("date")}
              error={errors.date?.message}
            />
          </Box>

          <Box>
            <Input
              label="الوقت"
              type="time"
              placeholder="ادخل الوقت"
              register={register("time")}
              error={errors.time?.message}
            />
          </Box>

          <Box
            style={{
              gridColumn: "span 2",
            }}
          >
            <Input
              label="ملاحظات"
              type="text"
              placeholder="ادخل الملاحظات"
              register={register("notes")}
              error={errors.notes?.message}
            />
          </Box>
        </Grid>

        <HStack mt="24px" justifyContent="end">
          <GradientButton onClick={handleSubmit(onSubmit)}>
            إضافة
          </GradientButton>
        </HStack>
      </Popup>
    </>
  );
};

export default ExpenseModal;
