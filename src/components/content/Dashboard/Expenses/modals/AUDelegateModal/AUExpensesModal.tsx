import { Box, HStack, VStack, useDisclosure, useToast } from "@chakra-ui/react";
import {
  GradientButton,
  Input,
  InputSelect,
  Loader,
  Popup,
} from "@components/core";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AUExpensesSchema } from "./AUExpensesSchema";
import { useEffect } from "react";
import { EToast } from "@constants/functions/toast";
import { useResetFormModal } from "@components/content/Dashboard/hooks";
import { InfoModal } from "@components/content/Dashboard/Modals";
import {
  useGetCosts,
  useGetExpense,
  usePostExpense,
  usePutExpense,
} from "@services/hooks/expenses/useExpenses";
import { PostPutExpensesType } from "@services/hooks/expenses/Expenses";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  recordID?: number;
}

const AUExpensesModal = ({ isOpen, onClose, recordID }: Props) => {
  const alert = useDisclosure();
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    register,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: yupResolver(AUExpensesSchema),
  });

  const { data: costs, isLoading: isCostsLoading } = useGetCosts();

  const { data, isLoading } = useGetExpense(
    recordID || 0,
    (recordID || 0) !== 0 && isOpen
  );
  const toast = useToast();
  const addExpense = usePostExpense();
  const updateExpense = usePutExpense(Number(recordID));

  // Reset Form When Close
  useResetFormModal(isOpen, reset);

  const onSubmit = (values: PostPutExpensesType) => {
    if (recordID) {
      if (isDirty) {
        updateExpense
          .mutateAsync({
            name: values.name,
            amount: values.amount,
            cost: values.cost,
            date: values.date,
            time: values.time,
          })
          .then((res) => {
            if (res.error) {
              alert.onClose();
              const errorMessages = Object.values(res.error).join("; ");
              EToast({
                toast: toast,
                status: "error",
                title: "Error",
                description: errorMessages,
              });
            } else {
              EToast({
                toast: toast,
                status: "success",
                title: "نجاح العملية",
                description: "تم التعديل بنجاح",
              });
              alert.onClose();
              onClose();
            }
          });
      } else {
        onClose();
      }
    } else {
      addExpense
        .mutateAsync({
          name: values.name,
          amount: values.amount,
          cost: values.cost,
          date: values.date,
          time: values.time,
        })
        .then((res) => {
          if (res.error) {
            alert.onClose();
            const errorMessages = Object.values(res.error).join("; ");
            EToast({
              toast: toast,
              status: "error",
              title: "Error",
              description: errorMessages,
            });
          } else {
            EToast({
              toast: toast,
              status: "success",
              title: "نجاح العملية",
              description: "تم الحفظ بنجاح",
            });
            alert.onClose();
            onClose();
          }
        });
    }
  };

  useEffect(() => {
    if (data?.data && !isLoading) {
      setValue("name", data?.data.name || "");
      setValue("amount", data?.data.amount || "");
      setValue("cost", data?.data.cost.id || 0);
      setValue("date", data?.data.date || "");
      setValue("time", data?.data.time || "");
    }
  }, [data, isLoading, isOpen]);

  return (
    <>
      <InfoModal
        isOpen={alert.isOpen}
        onClose={alert.onClose}
        title="حفظ التعديلات"
        description="هل انت متأكد من حفظ بيانات المصروف؟"
        type="save"
        onProceed={handleSubmit(onSubmit)}
        isLoading={recordID ? updateExpense.isPending : addExpense.isPending}
      />
      <Popup
        title={recordID ? "تعديل المصروف" : "إضافة مصروف"}
        size="2xl"
        isOpen={isOpen}
        onClose={onClose}
      >
        {isLoading && <Loader />}
        {!isLoading && (
          <>
            <VStack align="stretch" spacing="16px">
              <HStack mt="16px" flexWrap="wrap">
                <Box w="40%" flexGrow="1">
                  <Controller
                    control={control}
                    name="cost"
                    render={({ field: { onChange, value } }) => (
                      <InputSelect
                        loading={isCostsLoading}
                        label="نوع المصروف"
                        options={
                          costs?.data
                            ? costs?.data.map((el) => ({
                                label: el.name || "",
                                value: el.id || 0,
                              }))
                            : []
                        }
                        multi={false}
                        placeholder="اختر نوع المصروف"
                        onChange={onChange}
                        value={value}
                        error={errors.cost?.message}
                        size="lg"
                      />
                    )}
                  />
                </Box>
                <Box w="40%" flexGrow="1">
                  <Input
                    label="اسم المصروف"
                    type="text"
                    placeholder=" ادخل اسم المصروف"
                    register={register("name")}
                    error={errors.name?.message}
                  />
                </Box>
                <Box w="40%" flexGrow="1">
                  <Input
                    label="المبلغ (دينار)"
                    type="number"
                    placeholder=" ادخل المبلغ"
                    register={register("amount")}
                    error={errors.amount?.message}
                  />
                </Box>
                <Box w="40%" flexGrow="1">
                  <Input
                    label="التاريخ"
                    type="date"
                    placeholder="ادخل التاريخ"
                    register={register("date")}
                    error={errors.date?.message}
                  />
                </Box>
                <Box w="50%">
                  <Input
                    label="الوقت"
                    type="time"
                    placeholder="حدد وقت المصروف"
                    register={register("time")}
                    error={errors.time?.message}
                  />
                </Box>
              </HStack>
            </VStack>
            <HStack justifyContent="flex-end" mt="24px">
              <GradientButton
                onClick={
                  isValid && isDirty ? alert.onOpen : handleSubmit(onSubmit)
                }
              >
                حفظ
              </GradientButton>
            </HStack>
          </>
        )}
      </Popup>
    </>
  );
};

export default AUExpensesModal;
