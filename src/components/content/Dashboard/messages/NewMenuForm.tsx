/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box, HStack, VStack, list, useDisclosure, useToast } from "@chakra-ui/react";
import {
  GradientButton,
  Input,
  InputSelect,
  Popup,
} from "@components/core";
import { Controller, useForm } from "react-hook-form";
import { InfoModal } from "@components/content/Dashboard/Modals";
import { useEffect, useState } from "react";
import {
  useGetVoters
} from "@services/hooks/voters/useVoters"
import FileInput from "@components/core/FileInput/FileInput";
import { EToast } from "@constants/functions/toast";
import ReactSelect from 'react-select'
import axios from "axios";
import MyVotesWindow from "../Home/MyVotesWindow/MyVotesWindow";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  recordID?: string;
  onSuccess: () => void;
  token: string | null;
}

const NewMenuFormModal = ({ isOpen, onClose, recordID, onSuccess, token }: Props) => {
  const alert = useDisclosure();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [votersLists, setVotersLists] = useState<any[]>([]);
  const [details, setDetails] = useState()
  const [filter, setFilter] = useState<any>({});

  const { data: voters } = useGetVoters()
  console.log("🚀 ~ NewMenuFormModal ~ voters:", voters)

  const {
    handleSubmit,
    control,
    reset,
    // setValue,
    // watch,
    register,
    formState: { errors, isValid },
  } = useForm({
  });
  function getVoters(e: any) {
    console.log("🚀 ~ getVoters ~ e:", e)
    setVotersLists(e)
  }

  async function getListDetails(id: string) {
    try {
      const response = await axios.get(`${import.meta.env.VITE_PRIVATE_API_URL}/sms/list/details/${id}/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      console.log("🚀 ~ getListDetails ~ response:", response.data)
      if (response.data.status) {
        let initialValue = {
          name: response.data.data.name
        }
        reset({ ...initialValue })
        setDetails(response.data.data)
      }
      return response.data.data;
    } catch (error) {
      console.log("🚀 ~ handleSubmitForm ~ error:", error)

    }
  }

  const toast = useToast();

  // Reset Form When Close

  const onSubmit = (values: any) => {
    let newList = {
      name: values.name,
      "votes_list": votersLists,
    }
    console.log("🚀 ~ onSubmit ~ newList:", newList)
    if (votersLists.length === 0 && !recordID) {
      EToast({
        toast: toast,
        status: "error",
        title: "Error",
        description: "لا يمكنك إنشاء قائمة جديدة بأي قسم أو القائمة بالقيم المسجلة",
      });

    } else {
      if (recordID) {
        handleUpdateForm(recordID, newList)
      } else {
        handleSubmitForm(newList)
      }

    }
  };
  async function handleSubmitForm(data: any) {
    try {
      const response = await axios.post(`${import.meta.env.VITE_PRIVATE_API_URL}/sms/list/`, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      console.log("🚀 ~ handleSubmitForm ~ response:", response.data)
      if (response.data.status) {
        reset()
        setVotersLists([])
        onSuccess()
        onClose()
        reset()
        EToast({
          toast: toast,
          status: "success",
          title: "Success",
          description: "List created successfully",
        });
      } else {
        EToast({
          toast: toast,
          status: "error",
          title: "Error",
          description: response.data.message,
        });
      }
      reset()
      setVotersLists([])
      onSuccess()
    } catch (error) {
      console.log("🚀 ~ handleSubmitForm ~ error:", error)

    }
  }
  async function handleUpdateForm(id: string, data: any) {
    try {
      const response = await axios.put(`${import.meta.env.VITE_PRIVATE_API_URL}/sms/list/details/${id}/`, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      console.log("🚀 ~ handleSubmitForm ~ response:", response.data)
      if (response.data.status) {
        reset()
        setVotersLists([])
        onSuccess()
        onClose()
        reset()
        EToast({
          toast: toast,
          status: "success",
          title: "Success",
          description: "List updated successfully",
        });
      } else {
        EToast({
          toast: toast,
          status: "error",
          title: "Error",
          description: response.data.message,
        });
      }
      reset()
      setVotersLists([])
      onSuccess()
    } catch (error) {
      console.log("🚀 ~ handleSubmitForm ~ error:", error)

    }
  }
  useEffect(() => {
    if (recordID) {

      getListDetails(recordID)

      console.log("🚀 ~ useEffect ~ recordID:", recordID)
    }

    return () => {

    }
  }, [recordID])

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
        size="5xl"
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

            {/* {!recordID && <Box w="100%" flexGrow="1">

              <ReactSelect
                className='react-select'
                placeholder='الناخبيين'
                onChange={getVoters}
                isMulti
                styles={{
                  control: (baseStyles: any, state: any) => ({
                    ...baseStyles,
                    minHeight: '48px',
                    display: 'flex',
                    border: "1px solid #E5E5E5",
                    borderRadius: '12px',
                  }),
                  menu: (baseStyles: any) => ({
                    ...baseStyles,
                    zIndex: 99999999999,
                  }),
                  option: (baseStyles: any, state: any) => ({
                    ...baseStyles,
                    padding: "10px 12px 10px 24px",
                    backgroundColor: state.isSelected ? "#318973" : "",
                    ":hover": {
                      backgroundColor: "var(--neutral-200)",
                    },
                  }),
                }}
                classNames={{
                  multiValue: (state: any) =>
                    !state.isSelected ? 'react-select__multiple--selected' : '',
                  multiValueLabel: (state: any) => !state.isSelected ? 'react-select__multiple--selected-label' : '',
                }}
                // {...register('form', { required: true })}
                options={voters?.data?.map((el: any) => ({
                  label: el?.first_name || "",
                  value: el?.id || 0,
                }))}
              />
            </Box>}
            <MyVotesWindow homePage={false} filter={filter} setFilter={setFilter} />;


          </HStack>
        </VStack>
        <HStack justifyContent="flex-end" mt="24px">
          <GradientButton
            disabled={(isValid && selectedFile) ? false : true} mr={'auto'}
            borderRadius={'50px'}
            onClick={handleSubmit(onSubmit)}
          >
            {recordID ? "تعديل" : "إنشاء"}

          </GradientButton>
        </HStack>

      </Popup>
    </>
  );
};

export default NewMenuFormModal;