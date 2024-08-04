/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, HStack, VStack, useDisclosure, useToast } from "@chakra-ui/react";
import { GradientButton, Input, InputSelect, Popup } from "@components/core";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EToast } from "@constants/functions/toast";
import { useResetFormModal } from "@components/content/Dashboard/hooks";
import { useGetManadeebDropDown } from "@services/hooks/dropdown/useDropDown";
import { TransferSchema } from "./TransferSchema";
import { LocationBox } from "../CompanionModal/partials";
import { MapModal } from "@components/content/Dashboard/Voters/modals";
import { useTransferVoters } from "@services/hooks/voters/useVoters";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  voters: any[];
}

const BulkEditModal = ({ isOpen, onClose, voters }: Props) => {
  // const { data: mainMandoob, isLoading: isMainMandoobLoading } =
  //   useGetManadeebDropDown("4");
  const { data: harakMandoob, isLoading: isHarakMandoobLoading } =
    useGetManadeebDropDown("3");

  const toast = useToast();
  const transferVoters = useTransferVoters();
  const mapPopup = useDisclosure();

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(TransferSchema),
    defaultValues: {},
  });

  const values = watch();
  useResetFormModal(isOpen, reset);

  const onSubmit = async (values: any) => {
    transferVoters.mutateAsync({ ...values, voters }).then((res) => {
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
        onClose();
      }
    });
  };

  return (
    <>
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
              {/* <Box w="40%" flexGrow="1">
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
              </Box> */}

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
            <GradientButton onClick={handleSubmit(onSubmit)}>
              حفظ
            </GradientButton>
          </HStack>
        </>
      </Popup>
    </>
  );
};

export default BulkEditModal;
