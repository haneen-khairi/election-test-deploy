import { BoxIcon, MandobIcon } from "@assets/icons";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { BorderedBox, Loader, Popup } from "@components/core";
import { VotingCentersType } from "@services/hooks/centers/Centers";
import { useGetVotingCentersBoxes } from "@services/hooks/centers/useCenters";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  center?: VotingCentersType;
}
const CenterInfoModal = ({ isOpen, onClose, center }: Props) => {
  const { data, isLoading } = useGetVotingCentersBoxes(center?.id || 0, isOpen);
  console.log(data);
  return (
    <Popup title={center?.name} size="xl" isOpen={isOpen} onClose={onClose}>
      {isLoading ? (
        <Loader />
      ) : (
        <VStack align="stretch" spacing="16px">
          <Box>
            <Text fontWeight="700">عدد الصناديق</Text>
            <BorderedBox>
              <HStack>
                <Box color="primary.200" bg="white" p="2" rounded="full">
                  <BoxIcon />
                </Box>
                <Box>
                  <Text color="primary.200" fontWeight="700">
                    {data?.data.boxes_count} صندوق
                  </Text>
                  <Text color="#46515D" fontWeight="400">
                    مراكز الإقتراع
                  </Text>
                </Box>
              </HStack>
            </BorderedBox>
          </Box>
          <Box>
            <Text fontWeight="700">المناديب</Text>
            <HStack flexWrap="wrap" w="100%">
              {data?.data.manadeeb.map((mandob, index) => (
                <BorderedBox key={index} w="32%">
                  <HStack>
                    <Box color="primary.200" bg="white" p="2" rounded="full">
                      <MandobIcon />
                    </Box>
                    <Box>
                      <Text
                        fontWeight="700"
                        wordBreak="break-all"
                        noOfLines={1}
                        title={mandob}
                      >
                        {mandob}
                      </Text>
                    </Box>
                  </HStack>
                </BorderedBox>
              ))}
            </HStack>
          </Box>

          <Box>
            <Text fontWeight="700">ارقام الصناديق</Text>
            <HStack flexWrap="wrap" w="100%">
              {data?.data.boxes.map((box, index) => (
                <BorderedBox
                  key={index}
                  w="75px"
                  h="50px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text fontSize="18px" fontWeight="700">
                    {box.name}
                  </Text>
                </BorderedBox>
              ))}
            </HStack>
          </Box>
        </VStack>
      )}
    </Popup>
  );
};

export default CenterInfoModal;
