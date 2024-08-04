import { HStack, VStack, useDisclosure, useToast } from "@chakra-ui/react";
import { GradientButton, Popup } from "@components/core";
import { useForm } from "react-hook-form";
import { InfoModal } from "@components/content/Dashboard/Modals";
import { useEffect, useState } from "react";
import { EToast } from "@constants/functions/toast";
import axios from "axios";
import FilterSectionFamily from "./FilterSection/FilterSectionFamily";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  recordID?: string;
  onSuccess: () => void;
  token: string | null;
  familyId: string;
}

const AddNewFamilyTreeModal = ({
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
      console.log("🚀 ~ getListDetails ~ response:", response.data);
      if (response.data.status) {
        const initialValue = {
          name: response.data.data.name,
        };
        reset({ ...initialValue });
      }
      return response.data.data;
    } catch (error) {
      console.log("🚀 ~ handleSubmitForm ~ error:", error);
    }
  }

  const toast = useToast();

  const onSubmit = () => {
    const newList = {
      voter_ids: votersLists,
    };
    console.log("🚀 ~ onSubmit ~ newList:", newList);
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
        `${import.meta.env.VITE_PRIVATE_API_URL}/family_tree/trees/${familyId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ handleSubmitForm ~ response:", response.data);
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
    } catch (error) {
      console.log("🚀 ~ handleSubmitForm ~ error:", error);
    }
  }
  useEffect(() => {
    console.log("======== filter =======", filter);
    
  
    return () => {
      
    }
  }, [filter])
  
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
      console.log("🚀 ~ handleSubmitForm ~ response:", response.data);
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
    } catch (error) {
      console.log("🚀 ~ handleSubmitForm ~ error:", error);
    }
  }

  useEffect(() => {
    if (recordID) {
      getListDetails(recordID);
      console.log("🚀 ~ useEffect ~ recordID:", recordID);
    }

    return () => {};
  }, [recordID]);

  return (
    <>
      <InfoModal
        isOpen={alert.isOpen}
        onClose={onClose}
        title="إنشاء قائمة جديدة"
        description="إنشاء قائمة جديدة"
        type="save"
        onProceed={handleSubmit(onSubmit)}
      />
      <Popup
        title={"إنشاء قائمة لعائلة"}
        size="5xl"
        isOpen={isOpen}
        onClose={onClose}
      >
        <FilterSectionFamily  filter={filter} setFilter={setFilter} />
        
            {/* <VStack align="stretch" spacing="16px">
          <HStack mt="16px" flexWrap="wrap">
            <MyVotesWindow
              getCheckboxList={getVoters}
              homePage={false}
              filter={filter}
              setFilter={setFilter}
            />
          </HStack>
        </VStack> */}
   
        <HStack justifyContent="flex-end" mt="24px">
          <GradientButton
            disabled={!isValid}
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

export default AddNewFamilyTreeModal;
