import { HStack, Text, VStack } from "@chakra-ui/react";
import { GradientButton, Popup } from "@components/core";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  type: "save" | "delete";
  onProceed: () => void;
  isLoading?: boolean;
}
const InfoModal = ({
  isOpen,
  onClose,
  title,
  description,
  type,
  isLoading,
  onProceed,
}: Props) => {
  return (
    <Popup title="" size="xs" isOpen={isOpen} onClose={onClose} isClose={false}>
      <VStack align="center" alignItems="center" spacing="0" py="3">
        <Text fontSize="18px" fontWeight="700">
          {title}
        </Text>
        <Text fontSize="14px" fontWeight="500">
          {description}
        </Text>
        <HStack w="100%" mt="10px">
          {type === "save" ? (
            <GradientButton w="100%" onClick={onProceed} isLoading={isLoading}>
              نعم متأكد
            </GradientButton>
          ) : (
            <GradientButton
              w="100%"
              bg="danger.200"
              _hover={{ bg: "danger.500" }}
              onClick={onProceed}
              isLoading={isLoading}
            >
              نعم متأكد
            </GradientButton>
          )}
          <GradientButton
            w="100%"
            bg="White"
            boxShadow="0px 1px 2px 0px #1018280D"
            color="black"
            border="1px solid #E2E5E9"
            _hover={{
              bg: "none",
            }}
            onClick={onClose}
          >
            إلغاء
          </GradientButton>
        </HStack>
      </VStack>
    </Popup>
  );
};

export default InfoModal;
