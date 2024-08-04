import { Box, HStack, VStack, useDisclosure, useToast } from "@chakra-ui/react";
import { GradientButton, Input, InputSelect, Popup } from "@components/core";
import { PutVoter } from "@services/hooks/voters/Voters";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateVoterInfo } from "@services/hooks/voters/useVoters";
import { EToast } from "@constants/functions/toast";
import { useResetFormModal } from "@components/content/Dashboard/hooks";
import { InfoModal } from "@components/content/Dashboard/Modals";
import { useGetManadeebDropDown } from "@services/hooks/dropdown/useDropDown";
import { TransferSchema } from "./TransferSchema";
import { LocationBox } from "../CompanionModal/partials";
import { MapModal } from "@components/content/Dashboard/Voters/modals";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  recordIDs?: string[];
}

const BulkEditModal = ({ isOpen, onClose, recordIDs }: Props) => {
  const alert = useDisclosure();
  const { data: mainMandoob, isLoading: isMainMandoobLoading } =
    useGetManadeebDropDown("4");
  const { data: harakMandoob, isLoading: isHarakMandoobLoading } =
    useGetManadeebDropDown("3");

  const toast = useToast();
  const updateVotser = useUpdateVoterInfo();
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
    resolver: yupResolver(TransferSchema),
    defaultValues: {},
  });

  const values = watch();
  useResetFormModal(isOpen, reset);

  const onSubmit = (values: PutVoter) => {
    updateVotser
      .mutateAsync({
        latitude: parseFloat(values.latitude?.toFixed(2) || ""),
        longitude: parseFloat(values.longitude?.toFixed(2) || ""),
        mandoub_haraka: values.mandoub_haraka || undefined,
        mandoub_main: values.mandoub_main,
        note: values.note,
        voters: JSON.stringify(recordIDs),
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
        <>
          <VStack align="stretch" spacing="16px">
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
                  value={values}
                  error={errors.latitude?.message}
                />
              </Box>

              <Box w="40%" flexGrow="1">
                <Input
                  label="الملاحظات"
                  type="text"
                  placeholder="ادخل ملاحظاتك"
                  register={register("notes")}
                  error={errors.notes?.message}
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
