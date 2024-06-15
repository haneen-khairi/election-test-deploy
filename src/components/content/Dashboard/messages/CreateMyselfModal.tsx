/* eslint-disable react-hooks/exhaustive-deps */
import { Box, HStack, VStack, useDisclosure, useToast } from "@chakra-ui/react";
import {
  GradientButton,
  Input,
  InputSelect,
  Loader,
  Popup,
} from "@components/core";
import { Controller, useForm } from "react-hook-form";
import { InfoModal } from "@components/content/Dashboard/Modals";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  recordID?: string;
}

const CreateMyselfModal = ({ isOpen, onClose, recordID }: Props) => {
  const alert = useDisclosure();
  const {
    handleSubmit,
    // control,
    // reset,
    // setValue,
    // watch,
    register,
    // formState: { errors, isValid },
  } = useForm({
  });



 
  const toast = useToast();

  // Reset Form When Close

  const onSubmit = (values: any) => {
    
    console.log("🚀 ~ onSubmit ~ values:", values)
  };


  return (
    <>
      <InfoModal
        isOpen={alert.isOpen}
        onClose={alert.onClose}
        title="أضافة أسم من أصواتي"
        description="أضافة أسم من أصواتي"
        type="save"
        onProceed={handleSubmit(onSubmit)}
      />
      <Popup
        title={"أضافة أسم من أصواتي"}
        size="2xl"
        isOpen={isOpen}
        onClose={onClose}
      >
        
            <VStack align="stretch" spacing="16px">
              <HStack mt="16px" flexWrap="wrap">
               
                <Box w="100%" flexGrow="1" mb={'24px'}>
                  <Input
                    // label="اسم المندوب"
                    type="text"
                    placeholder="الأسم كامل"
                    register={register("name")}
                    // error={errors.name?.message || ""}
                  />
                </Box>
                <Box w="100%" flexGrow="1">
                  <Input
                    // label="رقم الموبايل"
                    type="number"
                    placeholder="ادخل رقم الموبايل"
                    register={register("mobile_number")}
                    // error={errors.mobile_number?.message || ""}
                  />
                </Box>
                
              </HStack>
            </VStack>
            <HStack justifyContent="flex-end" mt="24px">
              <GradientButton
              borderRadius={'50px'}
                onClick={handleSubmit(onSubmit)}
              >
                أضافة
              </GradientButton>
            </HStack>

        
      </Popup>
    </>
  );
};

export default CreateMyselfModal;
