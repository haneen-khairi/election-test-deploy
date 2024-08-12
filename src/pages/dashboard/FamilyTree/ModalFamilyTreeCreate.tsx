/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, HStack, VStack, useDisclosure, useToast } from "@chakra-ui/react";
import {
  GradientButton,
  Input,
  // InputSelect,
  // Loader,
  Popup,
} from "@components/core";
import { useForm } from "react-hook-form";
import { InfoModal } from "@components/content/Dashboard/Modals";
import { BsPlus } from "react-icons/bs";
import axios from "axios";
import useAuthStore from "@store/AuthStore";
import { EToast } from "@constants/functions/toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  recordID?: string;
}

const FamilyTreeCreateModal = ({ isOpen, onClose, onSuccess }: Props) => {
  const alert = useDisclosure(); // Use this to control InfoModal
  const { data } = useAuthStore();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm();

  async function apiMissionType(values: any) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_PRIVATE_API_URL}/family_tree/trees/`,
        {
          name: values.newFamilyName,
        },
        {
          headers: {
            Authorization: `Bearer ${data?.tokens?.access}`,
          },
        }
      );
      if (response.data.status) {
        EToast({
          toast: toast,
          status: "success",
          title: "نجاح العملية",
          description: "تم الأضافة بنجاح",
        });
        onSuccess();
        alert.onClose(); // Close the InfoModal after success
      }
    } catch (error) {
      EToast({
        toast: toast,
        status: "error",
        title: "فشل العملية",
        description: "فشل العملية",
      });
    }
  }

  const onSubmit = (values: any) => {
    apiMissionType(values);
  };

  return (
    <>
      <InfoModal
        isOpen={alert.isOpen}
        onClose={alert.onClose} // Use alert.onClose directly
        title="حفظ التعديلات"
        description="هل انت متأكد من حفظ بيانات اسم عائلة جديدة؟"
        type="save"
        onProceed={handleSubmit(onSubmit)}
      />
      <Popup
        title={"أضافة اسم شجرة عائلة جديدة"}
        size="2xl"
        isOpen={isOpen}
        onClose={onClose}
      >
        <VStack align="stretch" spacing="16px">
          <HStack mt="16px" flexWrap="wrap">
            <Box w="100%" flexGrow="1">
              <Input
                type="text"
                placeholder="اسم عائلة جديدة"
                register={register("newFamilyName")}
              />
            </Box>
          </HStack>
        </VStack>
        <HStack justifyContent="flex-end" mt="24px">
          <GradientButton
            disabled={!isValid}
            onClick={alert.onOpen} // Use alert.onOpen directly
          >
            <BsPlus /> أضافة
          </GradientButton>
        </HStack>
      </Popup>
    </>
  );
};

export default FamilyTreeCreateModal;
