import { Box, HStack, Text } from "@chakra-ui/react";
import { Loader, Popup } from "@components/core";
import { useGetVoterDetails } from "@services/hooks/voters/useVoters";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  recordID?: number;
}
const InfoModal = ({ isOpen, onClose, recordID }: Props) => {
  const { data, isLoading } = useGetVoterDetails(recordID || 0, isOpen);
  return (
    <Popup title="معلومات الناخب" size="md" isOpen={isOpen} onClose={onClose}>
      {isLoading && <Loader />}
      {!isLoading && (
        <HStack p="2" flexWrap="wrap">
          <Box flexGrow="1" w="40%">
            <Text color="Egray">مكان الناخب</Text>
            <Text>{data?.data.place_of_election || "لا يوجد"}</Text>
          </Box>
          <Box flexGrow="1" w="40%">
            <Text color="Egray">مكان الإقامة</Text>
            <Text>{data?.data.place_of_residence || "لا يوجد"}</Text>
          </Box>
          <Box flexGrow="1" w="40%">
            <Text color="Egray">ملاحظات</Text>
            <Text>{data?.data.note || "لا يوجد"}</Text>
          </Box>
          <Box flexGrow="1" w="40%">
            <Text color="Egray">رقم الموبايل</Text>
            <Text>{data?.data.mobile_number || "لا يوجد"}</Text>
          </Box>
        </HStack>
      )}
    </Popup>
  );
};

export default InfoModal;
