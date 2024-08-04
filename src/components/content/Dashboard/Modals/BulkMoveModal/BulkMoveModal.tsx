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
import { AssignSupporter } from "@services/hooks/voters/Voters";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BulkMoveSchema } from "./BulkMoveSchema";
import { MapModal } from "../../Voters/modals";
import { StatusOptions } from "@constants/variables/Dashboard";
import { useAssignSupportersToVotes } from "@services/hooks/voters/useVoters";
import { EToast } from "@constants/functions/toast";
import { useResetFormModal } from "@components/content/Dashboard/hooks";
import { InfoModal } from "@components/content/Dashboard/Modals";
import { useGetManadeebDropDown } from "@services/hooks/dropdown/useDropDown";
import { LocationBox } from "../../Voters/modals/EditModal/partials";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  recordIDs?: string[];
}

const BulkMoveModal = ({ isOpen, onClose, recordIDs }: Props) => {
  const alert = useDisclosure();
  const { data: mainMandoob, isLoading: isMainMandoobLoading } =
    useGetManadeebDropDown("4");
  const { data: harakMandoob, isLoading: isHarakMandoobLoading } =
    useGetManadeebDropDown("3");

  const toast = useToast();

  const assignSupporters = useAssignSupportersToVotes();
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
    resolver: yupResolver(BulkMoveSchema),
    defaultValues: { percentage: "100" },
  });

  const values = watch();

  // Reset Form When Close
  useResetFormModal(isOpen, reset);

  const onSubmit = (values: AssignSupporter) => {
    assignSupporters
      .mutateAsync({
        latitude: parseFloat(values?.latitude?.toString() || ""),
        longitude: parseFloat(values?.longitude?.toString() || ""),
        mandoub_haraka: values.mandoub_haraka || undefined,
        mandoub_main: values.mandoub_main,
        mobile_number: values.mobile_number,
        note: values.note,
        percentage: values.percentage,
        ids: JSON.stringify(recordIDs),
      })
      .then((res) => {
        if (res.error) {
          const errorMessages = Object.values(res.error).join("; ");
          EToast({
            toast: toast,
            status: "error",
            title: "حدث خطأ",
            description: errorMessages,
          });
        } else {
          EToast({
            toast: toast,
            status: "success",
            title: "نجاح العملية",
            description: "تمت الإضافة بنجاح",
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
        title="نقل المؤازرين"
        description="هل انت متأكد من نقل المؤازرين؟"
        type="save"
        onProceed={handleSubmit(onSubmit)}
        isLoading={assignSupporters.isPending}
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
      <Popup title="نقل المؤازرين" size="4xl" isOpen={isOpen} onClose={onClose}>
        <>
          <VStack align="stretch" spacing="16px">
            <Text fontWeight="500">نسبة الضمان</Text>

            <HStack>
              {StatusOptions.map((option, index) => (
                <Controller
                  key={index}
                  name="percentage"
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
              نقل
            </GradientButton>
          </HStack>
        </>
      </Popup>
    </>
  );
};

export default BulkMoveModal;
