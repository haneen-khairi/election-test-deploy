// /* eslint-disable react-hooks/exhaustive-deps */
// import { Box, HStack, Text, Textarea, VStack, useDisclosure, useToast } from "@chakra-ui/react";
// import {
//   GradientButton,
//   Input,
//   InputSelect,
//   Loader,
//   Popup,
// } from "@components/core";
// import { Controller, useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useEffect } from "react";
// import { EToast } from "@constants/functions/toast";
// import { useGetDelegateTypes } from "@services/hooks/delegates/useGroups";

// import { useResetFormModal } from "@components/content/Dashboard/hooks";
// import { InfoModal } from "@components/content/Dashboard/Modals";
// import { PostPutTaskType } from "@services/hooks/tasks/Tasks";
// import {
//   useGetTakTypes,
//   useGetTask,
//   usePostTask,
//   usePutTask,
// } from "@services/hooks/tasks/useTasks";
// import { useGetManadeebDropDown } from "@services/hooks/dropdown/useDropDown";
// import { AUTaskSchema } from "./AUTaskModal/AUTaskModalSchema";

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
//   recordID?: string;
// }

// const TaskModal = ({ isOpen, onClose, recordID }: Props) => {
//   const alert = useDisclosure();
//   const {
//     handleSubmit,
//     control,
//     reset,
//     setValue,
//     watch,
//     register,
//     formState: { errors, isValid, isDirty },
//   } = useForm({
//     resolver: yupResolver(AUTaskSchema),
//   });

//   const values = watch();
//   const { data: mandobtypes, isLoading: ismandobtypesloading } =
//     useGetDelegateTypes();
//   const { data: taskTypes, isLoading: istasktypesloading } = useGetTakTypes();
//   const { data: manadeebDropdown, isLoading: isManadeebDropDownLoading } =
//     useGetManadeebDropDown(values.mandob_type);

//   const { data, isLoading } = useGetTask(
//     recordID || "",
//     (recordID || "") !== "" && isOpen,
//   );
//   const toast = useToast();

//   // Reset Form When Close
//   useResetFormModal(isOpen, reset);

//   const onSubmit = (values: any) => {
//    console.log("🚀 ~ onSubmit ~ values:", values)
   
//   };


//   return (
//     <>
//       <InfoModal
//         isOpen={alert.isOpen}
//         onClose={alert.onClose}
//         title="حفظ التعديلات"
//         description="هل انت متأكد من حفظ بيانات المهمة؟"
//         type="save"
//         onProceed={()=> handleSubmit(onSubmit)}
//         // isLoading={recordID ? updateTask.isPending : addTask.isPending}
//       />
//       <Popup
//         title={recordID ? "تعديل المهمة" : "إضافة مهمة"}
//         size="2xl"
//         isOpen={isOpen}
//         onClose={onClose}
//       >
//         {isLoading && <Loader />}
//         {!isLoading && (
//           <>

                
//                 <Box w="40%" flexGrow="1">
//                     <Controller
//                         control={control}
//                         name="mandob"
//                         render={({ field: { onChange, value } }) => (
//                         <InputSelect
//                             loading={isManadeebDropDownLoading}
//                             label="اسم المندوب"
//                             options={
//                             manadeebDropdown?.data
//                                 ? manadeebDropdown?.data.map((el) => ({
//                                     label: el.name || "",
//                                     value: el.id || 0,
//                                 }))
//                                 : []
//                             }
//                             multi={false}
//                             placeholder="اختر المندوب"
//                             onChange={onChange}
//                             value={value}
//                             error={errors.mandob?.message}
//                             size="lg"
//                         />
//                         )}
//                     />
//                     </Box>
//                     <Box w="40%" flexGrow="1">
//                     <Controller
//                         control={control}
//                         name="mandob_type"
//                         render={({ field: { onChange, value } }) => (
//                         <InputSelect
//                             loading={ismandobtypesloading}
//                             label="نوع المندوب"
//                             options={
//                             mandobtypes?.data
//                                 ? mandobtypes?.data.map((el) => ({
//                                     label: el.name || "",
//                                     value: el.id || 0,
//                                 }))
//                                 : []
//                             }
//                             multi={false}
//                             placeholder="اختر نوع المندوب"
//                             onChange={onChange}
//                             value={value}
//                             error={errors.mandob_type?.message}
//                             size="lg"
//                         />
//                         )}
//                     />
//                     </Box>
                    
                    

//                     <Box w="40%" flexGrow="1">
//                     <Input
//                         label="التاريخ"
//                         type="date"
//                         placeholder="ادخل التاريخ"
//                         register={register("date")}
//                         error={errors.date?.message}
//                     />
//                     </Box>
//                     <Box w="40%" flexGrow="1">
//                     <Input
//                         label="الوقت"
//                         type="time"
//                         placeholder="ادخل الوقت"
//                         register={register("time")}
//                         error={errors.time?.message}
//                     />
//                     </Box>
//                     <Box w="40%" flexGrow="1">
//                     <Controller
//                         control={control}
//                         name="type"
//                         render={({ field: { onChange, value } }) => (
//                         <InputSelect
//                             loading={istasktypesloading}
//                             label="نوع المهمة"
//                             options={
//                             taskTypes?.data
//                                 ? taskTypes?.data.map((el) => ({
//                                     label: el.name || "",
//                                     value: el.id || 0,
//                                 }))
//                                 : []
//                             }
//                             multi={false}
//                             placeholder="اختر نوع المهمة"
//                             onChange={onChange}
//                             value={value}
//                             error={errors.type?.message}
//                             size="lg"
//                         />
//                         )}
//                     />
//                     </Box>
//                     <Box w="40%" flexGrow="1">
//                         <Text mb='8px'>ادخل شرح المهمة</Text>
//                     <Textarea
//                         // label="شرح المهمة"
//                         // type="text"
//                         placeholder="ادخل شرح المهمة"
//                         // register={register("description")}
//                         // error={errors.description?.message}
//                     />
//                     </Box>
//                 <HStack justifyContent="flex-end" mt="24px">
//                 <GradientButton

//                     // type="submit"
//                     onClick={()=> handleSubmit(Onsubm)}
//                 >
//                     حفظ
//                 </GradientButton>
//                 </HStack>
//           </>
//         )}
//       </Popup>
//     </>
//   );
// };

// export default TaskModal;
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
import { yupResolver } from "@hookform/resolvers/yup";
// import { AUTaskSchema } from "./AUTaskModalSchema";
import { useEffect } from "react";
import { EToast } from "@constants/functions/toast";
import { useGetDelegateTypes } from "@services/hooks/delegates/useGroups";

import { useResetFormModal } from "@components/content/Dashboard/hooks";
import { InfoModal } from "@components/content/Dashboard/Modals";
import { PostPutTaskType } from "@services/hooks/tasks/Tasks";
import {
  useGetTakTypes,
  useGetTask,
  usePostTask,
  usePutTask,
} from "@services/hooks/tasks/useTasks";
import { useGetManadeebDropDown } from "@services/hooks/dropdown/useDropDown";
import { AUTaskSchema } from "./AUTaskModal/AUTaskModalSchema";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  recordID?: string;
}

const TaskModal = ({ isOpen, onClose, recordID }: Props) => {
  const alert = useDisclosure();
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    register,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: yupResolver(AUTaskSchema),
  });

  const values = watch();
  const { data: mandobtypes, isLoading: ismandobtypesloading } =
    useGetDelegateTypes();
  const { data: taskTypes, isLoading: istasktypesloading } = useGetTakTypes();
  const { data: manadeebDropdown, isLoading: isManadeebDropDownLoading } =
    useGetManadeebDropDown(values.mandob_type);

  const { data, isLoading } = useGetTask(
    recordID || "",
    (recordID || "") !== "" && isOpen,
  );
  const toast = useToast();
  const addTask = usePostTask();
  const updateTask = usePutTask(recordID || "");

  // Reset Form When Close
  useResetFormModal(isOpen, reset);

  const onSubmit = (values: PostPutTaskType) => {
    if (!recordID) {
      addTask
        .mutateAsync({
          date: values.date,
          description: values.description,
          mandob: values.mandob,
          time: values.time,
          type: values.type,
        })
        .then((res) => {
          if (res.error) {
            alert.onClose();
            const errorMessages = Object.values(res.error).join("; ");
            EToast({
              toast: toast,
              status: "error",
              title: "Error",
              description: errorMessages,
            });
          } else {
            EToast({
              toast: toast,
              status: "success",
              title: "نجاح العملية",
              description: "تم التعديل بنجاح",
            });
            alert.onClose();
            onClose();
          }
        });
    } else {
      if (isDirty) {
        updateTask
          .mutateAsync({
            date: values.date,
            description: values.description,
            mandob: values.mandob,
            time: values.time,
            type: values.type,
          })
          .then((res) => {
            if (res.error) {
              alert.onClose();
              const errorMessages = Object.values(res.error).join("; ");
              EToast({
                toast: toast,
                status: "error",
                title: "Error",
                description: errorMessages,
              });
            } else {
              EToast({
                toast: toast,
                status: "success",
                title: "نجاح العملية",
                description: "تم التعديل بنجاح",
              });
              alert.onClose();
              onClose();
            }
          });
      } else {
        onClose();
      }
    }
  };

  useEffect(() => {
    if (data?.data && !isLoading) {
      setValue("date", data?.data.date || "");
      setValue("description", data?.data.description || "");
      setValue("mandob_type", data?.data.mandob.group);
      setValue("mandob", data?.data.mandob.id);
      setValue("time", data?.data.time || "");
      setValue("type", data?.data.type.id);
    }
  }, [data, isLoading, isOpen]);

  return (
    <>
      <InfoModal
        isOpen={alert.isOpen}
        onClose={alert.onClose}
        title="حفظ التعديلات"
        description="هل انت متأكد من حفظ بيانات المهمة؟"
        type="save"
        onProceed={handleSubmit(onSubmit)}
        isLoading={recordID ? updateTask.isPending : addTask.isPending}
      />
      <Popup
        title={recordID ? "تعديل المهمة" : "إضافة مهمة"}
        size="2xl"
        isOpen={isOpen}
        onClose={onClose}
      >
        {isLoading && <Loader />}
        {!isLoading && (
          <>
            <VStack align="stretch" spacing="16px">
              <HStack mt="16px" flexWrap="wrap">
                <Box w="40%" flexGrow="1">
                  <Controller
                    control={control}
                    name="type"
                    render={({ field: { onChange, value } }) => (
                      <InputSelect
                        loading={istasktypesloading}
                        label="نوع المهمة"
                        options={
                          taskTypes?.data
                            ? taskTypes?.data.map((el) => ({
                                label: el.name || "",
                                value: el.id || 0,
                              }))
                            : []
                        }
                        multi={false}
                        placeholder="اختر نوع المهمة"
                        onChange={onChange}
                        value={value}
                        error={errors.type?.message}
                        size="lg"
                      />
                    )}
                  />
                </Box>
                <Box w="40%" flexGrow="1">
                  <Input
                    label="شرح المهمة"
                    type="text"
                    placeholder="ادخل شرح المهمة"
                    register={register("description")}
                    error={errors.description?.message}
                  />
                </Box>
                <Box w="40%" flexGrow="1">
                  <Controller
                    control={control}
                    name="mandob_type"
                    render={({ field: { onChange, value } }) => (
                      <InputSelect
                        loading={ismandobtypesloading}
                        label="نوع المندوب"
                        options={
                          mandobtypes?.data
                            ? mandobtypes?.data.map((el) => ({
                                label: el.name || "",
                                value: el.id || 0,
                              }))
                            : []
                        }
                        multi={false}
                        placeholder="اختر نوع المندوب"
                        onChange={onChange}
                        value={value}
                        error={errors.mandob_type?.message}
                        size="lg"
                      />
                    )}
                  />
                </Box>
                <Box w="40%" flexGrow="1">
                  <Controller
                    control={control}
                    name="mandob"
                    render={({ field: { onChange, value } }) => (
                      <InputSelect
                        loading={isManadeebDropDownLoading}
                        label="اسم المندوب"
                        options={
                          manadeebDropdown?.data
                            ? manadeebDropdown?.data.map((el) => ({
                                label: el.name || "",
                                value: el.id || 0,
                              }))
                            : []
                        }
                        multi={false}
                        placeholder="اختر المندوب"
                        onChange={onChange}
                        value={value}
                        error={errors.mandob?.message}
                        size="lg"
                      />
                    )}
                  />
                </Box>
                <Box w="40%" flexGrow="1">
                  <Input
                    label="التاريخ"
                    type="date"
                    placeholder="ادخل التاريخ"
                    register={register("date")}
                    error={errors.date?.message}
                  />
                </Box>
                <Box w="40%" flexGrow="1">
                  <Input
                    label="الوقت"
                    type="time"
                    placeholder="ادخل الوقت"
                    register={register("time")}
                    error={errors.time?.message}
                  />
                </Box>
              </HStack>
            </VStack>
            <HStack justifyContent="flex-end" mt="24px">
              <GradientButton
                onClick={
                  isValid && isDirty ? alert.onOpen : handleSubmit(onSubmit)
                }
              >
                حفظ
              </GradientButton>
            </HStack>
          </>
        )}
      </Popup>
    </>
  );
};

export default TaskModal;
