/* eslint-disable @typescript-eslint/no-explicit-any */
import { HStack, useDisclosure } from "@chakra-ui/react";
import { GradientButton, Popup } from "@components/core";
import { useForm } from "react-hook-form";
import { InfoModal } from "@components/content/Dashboard/Modals";
import axios from "axios";
import { useState } from "react";
import MyVotesWindow from "../Home/MyVotesWindow/MyVotesWindow";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  recordID?: string;
  id: string;
  token: string;
}

const CreateMyselfModal = ({
  isOpen,
  onClose,
  id,
  token,
  onSuccess,
}: Props) => {
  const alert = useDisclosure();
  const [filter, setFilter] = useState<any>({});

  const { handleSubmit, reset } = useForm({});

  const onSubmit = (values: any) => {
    postMyVote(values);
  };
  async function postMyVote(data: any) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_PRIVATE_API_URL}/sms/list/items/${id}/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      response;
      onClose();
      onSuccess();
      reset();
    } catch (error) {
      console.error("🚀 ~ sentSmsHistory ~ error:", error);
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
        <MyVotesWindow
          homePage={false}
          filter={filter}
          setFilter={setFilter}
        />
        ;
        <HStack justifyContent="flex-end" mt="24px">
          <GradientButton
            borderRadius={"50px"}
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