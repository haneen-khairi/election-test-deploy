/* eslint-disable react-hooks/exhaustive-deps */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  import { HStack, VStack, useDisclosure, useToast } from "@chakra-ui/react";
  import { GradientButton, Popup } from "@components/core";
  import { useForm } from "react-hook-form";
  import { InfoModal } from "@components/content/Dashboard/Modals";
  import { useEffect, useState } from "react";
  // import { useGetVoters } from "@services/hooks/voters/useVoters";
  import { EToast } from "@constants/functions/toast";
  import axios from "axios";
  import MyVotesWindow from "@components/content/Dashboard/Home/MyVotesWindow/MyVotesWindow";

  interface Props {
    isOpen: boolean;
    onClose: () => void;
    recordID?: string;
    onSuccess: () => void;
    token: string | null;
    familyId: string;
  }

  const AddNewMemberFamilyTreeModal = ({
    isOpen,
    onClose,
    recordID,
    onSuccess,
    token,
    familyId,
  }: Props) => {
    const alert = useDisclosure();
    const [votersLists, setVotersLists] = useState<any[]>([]);
    const [filter, setFilter] = useState<any>({});

    const {
      handleSubmit,
      reset,
      formState: { isValid },
    } = useForm({});

    function getVoters(e: any) {
      setVotersLists(e);
    }

    async function getListDetails(id: string) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_PRIVATE_API_URL}/sms/list/details/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.status) {
          const initialValue = {
            name: response.data.data.name,
          };
          reset({ ...initialValue });
        }
        return response.data.data;
      } catch (error) {
        console.error("🚀 ~ handleSubmitForm ~ error:", error);
      }
    }

    const toast = useToast();

    const onSubmit = () => {
      const newList = {
        voter_ids: votersLists,
      };
      if (votersLists.length === 0 && !recordID) {
        EToast({
          toast: toast,
          status: "error",
          title: "Error",
          description:
            "لا يمكنك إنشاء قائمة جديدة بأي قسم أو القائمة بالقيم المسجلة",
        });
      } else {
        if (recordID) {
          handleUpdateForm(recordID, newList);
        } else {
          handleSubmitForm(newList);
        }
      }
    };

    async function handleSubmitForm(data: any) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_PRIVATE_API_URL}/family_tree/trees/${familyId}/`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.status) {
          reset();
          setVotersLists([]);
          onSuccess();
          onClose();
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
        reset();
        setVotersLists([]);
        onSuccess();
      } catch (error) {
        console.error("🚀 ~ handleSubmitForm ~ error:", error);
      }
    }

    async function handleUpdateForm(id: string, data: any) {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_PRIVATE_API_URL}/sms/list/details/${id}/`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.status) {
          reset();
          setVotersLists([]);
          onSuccess();
          onClose();
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
        reset();
        setVotersLists([]);
        onSuccess();
      } catch (error) {
        console.error("🚀 ~ handleSubmitForm ~ error:", error);
      }
    }

    useEffect(() => {
      if (recordID) {
        getListDetails(recordID);
      }

      return () => {};
    }, [recordID]);

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
          title={"إنشاء قائمة اسماء للعائلة"}
          size="5xl"
          isOpen={isOpen}
          onClose={onClose}
        >
          <VStack align="stretch" spacing="16px">
            <HStack mt="16px" flexWrap="wrap">
              <MyVotesWindow
                treePage={true}
                getCheckboxList={getVoters}
                homePage={false}
                filter={filter}
                setFilter={setFilter}
              />
            </HStack>
          </VStack>
          <HStack justifyContent="flex-end" mt="24px">
            <GradientButton
              disabled={isValid ? false : true}
              mr={"auto"}
              borderRadius={"50px"}
              onClick={handleSubmit(onSubmit)}
            >
              {recordID ? "تعديل" : "إنشاء"}
            </GradientButton>
          </HStack>
        </Popup>
      </>
    );
  };

  export default AddNewMemberFamilyTreeModal;
