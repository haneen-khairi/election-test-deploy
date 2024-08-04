/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HStack, Text, VStack, useToast } from "@chakra-ui/react";
import { Btn, Input, Popup } from "@components/core";
import { EToast } from "@constants/functions/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSendSupporters } from "@services/hooks/voters/useVoters";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { SendModalSchema } from "./SendModalSchema";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  addedVoters: any[];
  setAddedVoters: any;
}
const SendModal = ({ isOpen, onClose, addedVoters, setAddedVoters }: Props) => {
  const { id } = useParams<{ id: string }>();
  const toast = useToast();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(SendModalSchema(addedVoters)) as any,
  });

  const numbers: any = watch();

  const sendSupporters = useSendSupporters();

  const handleSend = () => {
    sendSupporters
      .mutateAsync({
        token: id || "",
        users: addedVoters.map((item) => ({
          id: item.id,
          mobile: (numbers[`${item.id}`] || "") as string,
        })),
      })
      .then((res) => {
        if (res.error) {
          EToast({
            toast: toast,
            status: "error",
            title: "Error",
            description: res.error,
          });
        } else {
          EToast({
            toast,
            status: "success",
            title: "تم الإرسال",
          });
          setAddedVoters([]);
        }
      })
      .catch((error) => {
        EToast({
          toast: toast,
          status: "error",
          title: "Error",
          description: error?.message,
        });
        setAddedVoters([]);
      })
      .finally(() => {
        onClose();
        reset();
      });

    setAddedVoters([]);
  };

  return (
    <Popup title="أرسل الأسماء" size="4xl" isOpen={isOpen} onClose={onClose}>
      <VStack>
        {addedVoters.map(
          ({ id, first_name, second_name, third_name, last_name }) => {
            return (
              <HStack key={id} w="100%">
                <Text fontWeight="600" w="50%">
                  {`${first_name} ${second_name} ${third_name} ${last_name}`}
                </Text>

                <Input
                  label="رقم الموبايل"
                  type="number"
                  placeholder=" ادخل رقم الموبايل"
                  register={register(id)}
                  error={(errors[`${id}`]?.message as any) || ""}
                />
              </HStack>
            );
          },
        )}

        <Btn
          w="fit-content"
          mt="20px"
          mr="auto"
          onClick={handleSubmit(handleSend)}
        >
          إرسال الأسماء
        </Btn>
      </VStack>
    </Popup>
  );
};

export default SendModal;
