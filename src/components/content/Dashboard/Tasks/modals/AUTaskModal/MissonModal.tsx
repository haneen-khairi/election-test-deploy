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
  onSuccess: () => void,
  recordID?: string;
}

const MissionModal = ({ isOpen, onClose, onSuccess }: Props) => {
  const alert = useDisclosure();
  const {data} = useAuthStore();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { 
      // errors, 
      isValid, 
      // isDirty 
    },
  } = useForm({
  });
  async function apiMissionType(values: any){
    console.log("🚀 ~ apiMissionType ~ values:", values)
    try {
      const response = await axios.post(`${import.meta.env.VITE_PRIVATE_API_URL}/task/types`, {
        name: values.missionType
      }, {
        headers: {
          'Authorization': `Bearer ${data?.tokens?.access}`
        }
      })
      if(response.data.status){
        console.log("🚀 ~ apiMissionType ~ response:", response)
        EToast({
          toast: toast,
          status: "success",
          title: "نجاح العملية",
          description: "تم الأضافة بنجاح",
        });
        onSuccess()
      }
    } catch (error) {
      console.log("🚀 ~ apiMissionType ~ error:", error)
      
    }
  }
  const onSubmit = (values: any) => {
    console.log("🚀 ~ onSubmit ~ values:", values)
    apiMissionType(values)
  };

  return (
    <>
      <InfoModal
        isOpen={alert.isOpen}
        onClose={alert.onClose}
        title="حفظ التعديلات"
        description="هل انت متأكد من حفظ بيانات نوع مهمة جديد؟"
        type="save"
        onProceed={handleSubmit(onSubmit)}
      />
      <Popup
        title={"أضافة نوع مهمة جديد"}
        size="2xl"
        isOpen={isOpen}
        onClose={onClose}
        
      >
        
            <VStack align="stretch" spacing="16px">
              <HStack mt="16px" flexWrap="wrap">
                
                <Box w="100%" flexGrow="1">
                  <Input
                    // label="شرح المهمة"
                    type="text"
                    placeholder="نوع المهمة"
                    register={register("missionType")}
                    // error={errors.description?.message}
                  />
                </Box>
              </HStack>
            </VStack>
            <HStack justifyContent="flex-end" mt="24px">
              <GradientButton
              disabled={!isValid ? true : false}
                onClick={
                  handleSubmit(onSubmit)
                }
              >
                <BsPlus /> أضافة
              </GradientButton>
            </HStack>
          
      </Popup>
    </>
  );
};

export default MissionModal;
