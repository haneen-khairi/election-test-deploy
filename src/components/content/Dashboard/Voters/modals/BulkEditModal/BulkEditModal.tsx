/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  HStack,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  GradientButton,
  Input,
  InputSelect,
  Popup,
  RadioButton,
} from "@components/core";
import { PutVoter } from "@services/hooks/voters/Voters";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BulkEditSchema } from "./BulkEditSchema";
import { MapModal } from "..";
import { StatusOptions } from "@constants/variables/Dashboard";
import { useUpdateVoterInfo } from "@services/hooks/voters/useVoters";
import { EToast } from "@constants/functions/toast";
import { useResetFormModal } from "@components/content/Dashboard/hooks";
import { InfoModal } from "@components/content/Dashboard/Modals";
import { useGetManadeebDropDown } from "@services/hooks/dropdown/useDropDown";
import { LocationBox } from "../EditModal/partials";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  recordIDs?: string[];
  isAll?: boolean;
  filter?: any;
}

const BulkEditModal = ({
  isOpen,
  onClose,
  recordIDs,
  isAll,
  filter,
}: Props) => {
  const alert = useDisclosure();
  const { data: mainMandoob, isLoading: isMainMandoobLoading } =
    useGetManadeebDropDown("4");
  const { data: harakMandoob, isLoading: isHarakMandoobLoading } =
    useGetManadeebDropDown("3");

  const toast = useToast();

  const updateVoter = useUpdateVoterInfo();
  // Map Popup
  const mapPopup = useDisclosure();
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    register,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(BulkEditSchema),
  });

  const values = watch();

  // Reset Form When Close
  useResetFormModal(isOpen, reset);

  const onSubmit = (values: PutVoter) => {
    const obj: any = {
      ...(isAll
        ? {
            select_all: true,
            ...filter,
          }
        : { voters: JSON.stringify(recordIDs) }),
    };

    Object.entries(values).forEach(([key, value]) => {
      if (["latitude", "longitude"].includes(value))
        obj[key] = parseFloat(value?.toString() || "");
      else if (value || value === 0) obj[key] = value;
    });

    updateVoter.mutateAsync(obj).then((res) => {
      if (res.error) {
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
  };

  return (
    <>
      <InfoModal
        isOpen={alert.isOpen}
        onClose={alert.onClose}
        title="حفظ التعديلات"
        description="هل انت متأكد من حفظ البيانات؟"
        type="save"
        onProceed={handleSubmit(onSubmit)}
        isLoading={updateVoter.isPending}
      />

      <MapModal
        isOpen={mapPopup.isOpen}
        onClose={mapPopup.onClose}
        setValue={setValue as never}
        location={{
          lat: Number(values.latitude),
          lng: Number(values.longitude),
        }}
      />

      <Popup title="الإجراءات" size="4xl" isOpen={isOpen} onClose={onClose}>
        <>
          <VStack align="stretch" spacing="16px">
            <Text fontWeight="500">الحالة</Text>
            <HStack>
              {StatusOptions.map((option, index) => (
                <Controller
                  key={index}
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <RadioButton
                      field={field as any}
                      option={option}
                      isChecked={field.value === option.value}
                    />
                  )}
                />
              ))}
            </HStack>

            <HStack mt="16px" flexWrap="wrap">
              <Box w="40%" flexGrow="1">
                <Controller
                  control={control}
                  name="mandoub_main"
                  render={({ field: { onChange, value } }) => (
                    <InputSelect
                      loading={isMainMandoobLoading}
                      label="المندوب الرئيسي"
                      options={
                        mainMandoob?.data
                          ? mainMandoob?.data.map((el) => ({
                              label: el.name || "",
                              value: el.id || 0,
                            }))
                          : []
                      }
                      multi={false}
                      placeholder="اختر المندوب الرئيسي"
                      onChange={onChange}
                      value={value}
                      error={errors.mandoub_main?.message}
                      size="lg"
                    />
                  )}
                />
              </Box>

              <Box w="40%" flexGrow="1">
                <Controller
                  control={control}
                  name="mandoub_haraka"
                  render={({ field: { onChange, value } }) => (
                    <InputSelect
                      loading={isHarakMandoobLoading}
                      label="مندوب الحركة"
                      options={
                        harakMandoob?.data
                          ? harakMandoob?.data.map((el) => ({
                              label: el.name || "",
                              value: el.id || 0,
                            }))
                          : []
                      }
                      multi={false}
                      placeholder="اختر  مندوب الحركة"
                      onChange={onChange}
                      value={value}
                      error={errors.mandoub_haraka?.message}
                      size="lg"
                    />
                  )}
                />
              </Box>

              <Box w="40%" flexGrow="1" overflow="hidden">
                <LocationBox
                  label="الموقع"
                  onOpen={mapPopup.onOpen}
                  placeholder="حدد الموقع من الخريطة"
                  value={{
                    latitude: values?.latitude || 0,
                    longitude: values?.longitude || 0,
                  }}
                  error={errors.latitude?.message}
                />
              </Box>

              <Box w="40%" flexGrow="1">
                <Input
                  label="رقم الجوال"
                  type="number"
                  placeholder=" ادخل رقم الجوال"
                  register={register("mobile_number")}
                  error={errors.mobile_number?.message}
                />
              </Box>

              <Box w="40%" flexGrow="1">
                <Input
                  label="الملاحظات"
                  type="text"
                  placeholder="ادخل ملاحظاتك"
                  register={register("note")}
                  error={errors.note?.message}
                />
              </Box>
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
      </Popup>
    </>
  );
};

export default BulkEditModal;