
import { Box, HStack, VStack, useDisclosure, useToast } from "@chakra-ui/react";
import {
  GradientButton,
  Input,
  Popup,
} from "@components/core";
import {  useForm } from "react-hook-form";
import { InfoModal } from "@components/content/Dashboard/Modals";
import { useState } from "react";
import FileInput from "@components/core/FileInput/FileInput";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  recordID?: string;
}

const NewMenuFormModal = ({ isOpen, onClose, recordID }: Props) => {
  const alert = useDisclosure();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

    
  const {
    handleSubmit,
    // control,
    // reset,
    // setValue,
    // watch,
    register,
    formState: { errors, isValid },
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
        title="إنشاء قائمة جديدة"
        description="إنشاء قائمة جديدة"
        type="save"
        onProceed={handleSubmit(onSubmit)}
      />
      <Popup
        title={"إنشاء قائمة جديدة"}
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
            placeholder="أسم القائمة"
            register={register("name")}
            // error={errors?.name?.message || ""}
            />
        </Box>
        <FileInput
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
        />
                
              </HStack>
            </VStack>
            <HStack justifyContent="flex-end" mt="24px">
              <GradientButton
              disabled={(isValid && selectedFile) ? false : true} mr={'auto'}
              borderRadius={'50px'}
              onClick={handleSubmit(onSubmit)}
              >
                  إنشاء   
                
              </GradientButton>
            </HStack>

        
      </Popup>
    </>
  );
};

export default NewMenuFormModal;
