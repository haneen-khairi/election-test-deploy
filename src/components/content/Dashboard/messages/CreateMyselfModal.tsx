/* eslint-disable react-hooks/exhaustive-deps */
import { 
  // Box, 
  HStack, 
  // VStack, 
  useDisclosure } from "@chakra-ui/react";
import {
  GradientButton,
  // Input,
  // InputSelect,
  // Loader,
  Popup,
} from "@components/core";
import { 
  // Controller, 
  
  useForm } from "react-hook-form";
import { InfoModal } from "@components/content/Dashboard/Modals";
import axios from "axios";
import { useState } from "react";
import MyVotesWindow from "../Home/MyVotesWindow/MyVotesWindow";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  recordID?: string;
  id: string,
  token: string
}

const CreateMyselfModal = ({ isOpen, onClose, id , token, onSuccess}: Props) => {
  const alert = useDisclosure();
  const [filter, setFilter] = useState<any>({});
  const [votersLists, setVotersLists] = useState<any[]>([]);

  const {
    handleSubmit,
    // control,
    reset,
    // setValue,
    // watch,
    // register,
    // formState: { errors, isValid },
  } = useForm({
  });



 
  // const toast = useToast();
  function getVoters(e: any) {
    console.log("🚀 ~ getVoters ~ e:", e)
    setVotersLists(e)
  }
  // Reset Form When Close

  const onSubmit = (values: any) => {
    
    console.log("🚀 ~ onSubmit ~ values:", values)
    let dataObject = {
      "votes_list": votersLists,
    }
    postMyVote(values)
  };
  async function postMyVote(data: any) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_PRIVATE_API_URL}/sms/list/items/${id}/`, data, {
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        })
          console.log("🚀 ~ sentSmsHistory ~ response:", response.data)
          onClose()
          onSuccess()
          reset()
        } catch (error) {
          console.log("🚀 ~ sentSmsHistory ~ error:", error)
          
        }
    
  }

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
        size="4xl"
        isOpen={isOpen}
        onClose={onClose}
      >
        
        <MyVotesWindow getCheckboxList={getVoters} homePage={false} filter={filter} setFilter={setFilter} />;

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
