/* eslint-disable react-hooks/exhaustive-deps */
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
  Loader,
  Popup,
  RadioButton,
} from "@components/core";
import { PutVoter } from "@services/hooks/voters/Voters";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditSchema } from "./EditSchema";
import { useEffect } from "react";
import { MapModal } from "..";
import { LocationBox } from "./partials";
import { StatusOptions } from "@constants/variables/Dashboard";
import {
  useGetVoterDetails,
  useUpdateVoterInfo,
} from "@services/hooks/voters/useVoters";
import { EToast } from "@constants/functions/toast";
import { useResetFormModal } from "@components/content/Dashboard/hooks";
import { InfoModal } from "@components/content/Dashboard/Modals";
import { useGetManadeebDropDown } from "@services/hooks/dropdown/useDropDown";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  recordID?: string;
}

const EditModal = ({ isOpen, onClose, recordID }: Props) => {
  const alert = useDisclosure();
  const { data: mainMandoob, isLoading: isMainMandoobLoading } =
    useGetManadeebDropDown("4");
  const { data: harakMandoob, isLoading: isHarakMandoobLoading } =
    useGetManadeebDropDown("3");

  const { data: info, isLoading: isDetailsLoading } = useGetVoterDetails(
    recordID || "",
    isOpen,
  );

  const toast = useToast();

  const updateVotser = useUpdateVoterInfo();
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
    resolver: yupResolver(EditSchema),
    defaultValues: { status: 0 },
  });

  const values = watch();

  // Reset Form When Close
  useResetFormModal(isOpen, reset);

  const onSubmit = (values: PutVoter) => {
    updateVotser
      .mutateAsync({
        election_time: values.election_time || undefined,
        latitude: parseFloat(values.latitude?.toFixed(2) || ""),
        longitude: parseFloat(values.longitude?.toFixed(2) || ""),
        mandoub_haraka: values.mandoub_haraka || undefined,
        mandoub_main: values.mandoub_main,
        mobile_number: values.mobile_number,
        note: values.note,
        status: values.status,
        voters: JSON.stringify([recordID]),
      })
      .then((res) => {
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

  useEffect(() => {
    if (info?.data && !isDetailsLoading) {
      info?.data.mandoub_main?.id &&
        setValue("mandoub_main", info?.data.mandoub_main?.id || 0);
      info?.data.mandoub_haraka?.id &&
        setValue("mandoub_haraka", info?.data.mandoub_haraka?.id || 0);
      info?.data.latitude && setValue("latitude", info?.data.latitude || 0);
      info?.data.longitude && setValue("longitude", info?.data.longitude || 0);
      setValue("mobile_number", info?.data.mobile_number || "");
      setValue("note", info?.data.note || "");
      setValue("status", info?.data.status || 0);
      setValue("election_time", info?.data.election_time || "");
    }
  }, [info]);

  return (
    <>
      <InfoModal
        isOpen={alert.isOpen}
        onClose={alert.onClose}
        title="حفظ التعديلات"
        description="هل انت متأكد من حفظ البيانات؟"
        type="save"
        onProceed={handleSubmit(onSubmit)}
        isLoading={updateVotser.isPending}
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
        {isDetailsLoading && <Loader />}
        {!isDetailsLoading && (
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
                        field={field}
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
                {values.status === 100 && (
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
                )}
                <Box w="40%" flexGrow="1" overflow="hidden">
                  <LocationBox
                    label="الموقع"
                    onOpen={mapPopup.onOpen}
                    placeholder="حدد الموقع من الخريطة"
                    value={values}
                    error={errors.latitude?.message}
                  />
                </Box>
                {values.status === 100 && (
                  <Box w="40%" flexGrow="1">
                    <Input
                      label="وقت الإنتخاب"
                      type="time"
                      register={register("election_time")}
                      error={errors.election_time?.message}
                    />
                  </Box>
                )}
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
        )}
      </Popup>
    </>
  );
};

export default EditModal;
