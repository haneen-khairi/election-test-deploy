/* eslint-disable @typescript-eslint/no-unused-vars */
import { HStack, useDisclosure, useToast } from "@chakra-ui/react";
import { GradientButton, Popup } from "@components/core";
import { PutVoter } from "@services/hooks/voters/Voters";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CompanionSchema } from "./CompanionSchema";
import { useEffect } from "react";
import { useResetFormModal } from "@components/content/Dashboard/hooks";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CompanionModal = ({ isOpen, onClose }: Props) => {
  const alert = useDisclosure();
  const toast = useToast();

  const companion = useDisclosure();

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    register,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(CompanionSchema),
    defaultValues: { status: 0 },
  });

  const values = watch();

  // Reset Form When Close
  useResetFormModal(isOpen, reset);

  const onSubmit = (values: PutVoter) => {};

  useEffect(() => {}, []);

  return (
    <>
      <Popup
        title="إضافة لجان المؤازرة"
        size="4xl"
        isOpen={isOpen}
        onClose={onClose}
      >
        <HStack mt="24px">
          <GradientButton
            onClick={isValid ? alert.onOpen : handleSubmit(onSubmit)}
          >
            إضافة
          </GradientButton>
        </HStack>
      </Popup>
    </>
  );
};

export default CompanionModal;
