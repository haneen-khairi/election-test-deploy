/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, HStack, VStack, useDisclosure, useToast } from "@chakra-ui/react";
import {
  CheckBox,
  GradientButton,
  Input,
  InputSelect,
  Loader,
  Popup,
} from "@components/core";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AUDelegateSchema } from "./AUDelegateSchema";
import { useEffect } from "react";
import { EToast } from "@constants/functions/toast";
import {
  useGetDelegate,
  usePostDelegate,
  usePutDelegate,
} from "@services/hooks/delegates/useDelegates";
import { useGetDelegateTypes } from "@services/hooks/delegates/useGroups";
import { PostDelegate, PutDelegate } from "@services/hooks/delegates/Delegates";
import { PlaceOfResidenceSelect } from "@components/content/DropDown";
import {
  useGetBoxesDropDown,
  useGetVotingCenterDropDown,
} from "@services/hooks/dropdown/useDropDown";
import { useResetFormModal } from "@components/content/Dashboard/hooks";
import { InfoModal } from "@components/content/Dashboard/Modals";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  recordID?: string;
}

const AddDelegateModal = ({ isOpen, onClose, recordID }: Props) => {
  const alert = useDisclosure();
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    register,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(AUDelegateSchema),
  });

  const values = watch();
  const { data: types, isLoading: istypesloading } = useGetDelegateTypes();
  const { data: VotingCenter, isLoading: isVotingCenterLoading } =
    useGetVotingCenterDropDown();
  const { data: Boxes, isLoading: isBoxesLoading } = useGetBoxesDropDown(
    values.school,
  );

  const { data, isLoading } = useGetDelegate(
    recordID || "",
    (recordID || "") !== "" && isOpen,
  );
  const toast = useToast();
  const addDelegate = usePostDelegate();
  const updateDelegate = usePutDelegate(recordID || "");

  // Reset Form When Close
  useResetFormModal(isOpen, reset);

  // 0799520999
  const onSubmit = (values: PutDelegate | PostDelegate) => {
    if (recordID) {
      updateDelegate
        .mutateAsync({
          name: values.name,
          mobile_number: values.mobile_number,
          group: values.group,
          password: values.password,
          place_of_residence: values?.place_of_residence,
          electoral_boxes: values.electoral_boxes,
        })
        .then((res) => {
          if (res.error) {
            alert.onClose();
            EToast({
              toast: toast,
              status: "error",
              title: "Error",
              description: res.error,
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
      addDelegate
        .mutateAsync({
          name: values.name,
          mobile_number: values.mobile_number,
          group: values.group,
          password: values.password,
          place_of_residence: (values as any)?.place_of_residence_is_all
            ? ("select_all" as any)
            : values?.place_of_residence,
          electoral_boxes: values.electoral_boxes,
        })
        .then((res) => {
          if (res.error) {
            alert.onClose();
            EToast({
              toast: toast,
              status: "error",
              title: "Error",
              description: res.error,
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
    }
  };

  useEffect(() => {
    if (data?.data && !isLoading) {
      setValue("mobile_number", data?.data.mobile_number || "");
      setValue("name", data?.data?.name || "");
      setValue("group", Number(data?.data?.group?.id));
      setValue(
        "school",
        data?.data.voting_center?.map((item) => item.id),
      );
      setValue(
        "electoral_boxes",
        data?.data?.electoral_boxes?.map((item) => item.id),
      );

      if (data?.data?.place_of_residence) {
        if (typeof data?.data?.place_of_residence === "string") {
          setValue("place_of_residence", []);
        } else {
          setValue(
            "place_of_residence",
            data?.data?.place_of_residence?.map((item) => item.id.toString()) ||
              [],
          );
        }
      }
    }
  }, [data, isLoading, isOpen]);

  return (
    <>
      <InfoModal
        isOpen={alert.isOpen}
        onClose={alert.onClose}
        title="حفظ التعديلات"
        description="هل انت متأكد من حفظ بيانات المندوب؟"
        type="save"
        onProceed={handleSubmit(onSubmit)}
        isLoading={recordID ? updateDelegate.isPending : addDelegate.isPending}
      />
      <Popup
        title={recordID ? "تعديل المندوب" : "إضافة مندوب"}
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
                    name="group"
                    render={({ field: { onChange, value } }) => (
                      <InputSelect
                        loading={istypesloading}
                        label="نوع المندوب"
                        options={
                          types?.data?.map((el) => ({
                            label: el.name,
                            value: el.id,
                          })) || []
                        }
                        multi={false}
                        placeholder="اختر نوع المندوب"
                        onChange={onChange}
                        value={value}
                        error={errors.group?.message}
                        size="lg"
                      />
                    )}
                  />
                </Box>

                <Box w="40%" flexGrow="1">
                  <Input
                    label="اسم المندوب"
                    type="text"
                    placeholder=" ادخل اسم المندوب"
                    register={register("name")}
                    error={errors.name?.message}
                  />
                </Box>

                <Box w="40%" flexGrow="1">
                  <Input
                    label="رقم الموبايل"
                    type="number"
                    placeholder=" ادخل رقم الموبايل"
                    register={register("mobile_number")}
                    error={errors.mobile_number?.message}
                  />
                </Box>

                <Box w="40%" flexGrow="1">
                  <Input
                    label="كلمة المرور"
                    type="password"
                    placeholder=" ادخل كلمة المرور"
                    register={register("password")}
                    error={errors.password?.message}
                  />
                </Box>
                
                {(Number(values?.group || 0) == 4 ||
                  Number(values?.group || 0) == 3) && (
                  <VStack alignItems="start" w="40%" flexGrow="1" gap="20px">
                    <Controller
                      control={control}
                      name="place_of_residence"
                      render={({ field: { onChange, value } }) => (
                        <PlaceOfResidenceSelect
                          onChange={onChange}
                          value={value}
                          multi={true}
                          error={errors.place_of_residence?.message}
                          label="المنطقة"
                          placeholder="المنطقة"
                          isDisabled={!!values?.place_of_residence_is_all}
                        />
                      )}
                    />

                    <CheckBox
                      checked={values?.place_of_residence_is_all}
                      onChange={() =>
                        setValue(
                          "place_of_residence_is_all",
                          !values?.place_of_residence_is_all,
                        )
                      }
                      name="اختيار جميع المناطق"
                    />
                  </VStack>
                )}
                {Number(values?.group || 0) === 2 && (
                  <>
                    <Box w="100%" flexGrow="1">
                      <Controller
                        control={control}
                        name="school"
                        render={({ field: { onChange, value } }) => (
                          <InputSelect
                            loading={isVotingCenterLoading}
                            label="المدرسة"
                            options={
                              VotingCenter?.data
                                ? VotingCenter?.data?.map((el) => ({
                                    label: el.name || "",
                                    value: el.id || 0,
                                  }))
                                : []
                            }
                            multi={true}
                            placeholder="اختر المدرسة"
                            onChange={onChange}
                            value={value}
                            error={errors.school?.message}
                          />
                        )}
                      />
                    </Box>
                    <Box w="40%" flexGrow="1">
                      <Controller
                        control={control}
                        name="electoral_boxes"
                        render={({ field: { onChange, value } }) => (
                          <InputSelect
                            loading={isBoxesLoading}
                            label="الصناديق"
                            options={
                              Boxes?.data
                                ? Boxes?.data?.map((el) => ({
                                    label: el.name || "",
                                    value: el.id || 0,
                                  }))
                                : []
                            }
                            multi={true}
                            placeholder="اختر الصناديق المسؤول عنها"
                            onChange={onChange}
                            value={value}
                            error={errors.electoral_boxes?.message}
                          />
                        )}
                      />
                    </Box>
                  </>
                )}

                {Number(values?.group || 0) === 6 && (
                  <Box w="100%" flexGrow="1">
                    <Controller
                      control={control}
                      name="voting_center"
                      render={({ field: { onChange, value } }) => (
                        <InputSelect
                          loading={isVotingCenterLoading}
                          label="المدرسة"
                          options={
                            VotingCenter?.data?.map((el) => ({
                              label: el.name || "",
                              value: el.id || 0,
                            })) || []
                          }
                          placeholder="اختر المدرسة"
                          onChange={onChange}
                          value={value}
                          error={errors.school?.message}
                        />
                      )}
                    />
                  </Box>
                )}
              </HStack>
            </VStack>

            <HStack justifyContent="flex-end" mt="24px">
              <GradientButton
                onClick={isValid ? alert.onOpen : handleSubmit(onSubmit)}
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

export default AddDelegateModal;
