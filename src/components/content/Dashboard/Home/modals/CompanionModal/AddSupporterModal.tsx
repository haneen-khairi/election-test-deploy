/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, HStack, useToast } from "@chakra-ui/react";
import { GradientButton, Input, Popup } from "@components/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SupporterSchema } from "./CompanionSchema";
import { useResetFormModal } from "@components/content/Dashboard/hooks";
import { EToast } from "@constants/functions/toast";
import { useAddSupporter } from "@services/hooks/delegates/useDelegates";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddSupporterModal = ({ isOpen, onClose }: Props) => {
  const addSupporter = useAddSupporter();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SupporterSchema),
  });

  useResetFormModal(isOpen, reset);

  const onSubmit = (values: any) => {
    addSupporter
      .mutateAsync({
        ...values,
      })
      .then((res: any) => {
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
      <Popup title="إضافة لجان" size="lg" isOpen={isOpen} onClose={onClose}>
        <Box>
          <Input
            label="اسم المؤازر"
            type="text"
            placeholder=" ادخل اسم المؤازر"
            register={register("name")}
            error={errors.name?.message}
          />
        </Box>

        <HStack mt="24px" justifyContent="end">
          <GradientButton
            onClick={handleSubmit(onSubmit)}
          >
            إضافة
          </GradientButton>
        </HStack>
      </Popup>
    </>
  );
};

export default AddSupporterModal;
