import { Avatar, Box, Text, VStack } from "@chakra-ui/react";
import { useGetVoterProfile } from "@services/hooks/voters/useVoters";
import QRCode from "qrcode.react";
import { useParams } from "react-router-dom";

const QRHero = () => {
  const { code } = useParams<{ code: string }>();
  const { data } = useGetVoterProfile(code || "");

  if (code === "") return <Box>No code was provided</Box>;

  return (
    <VStack p="50px 20px 20px 20px" w="100%" alignItems="center" gap="20px">
      <Avatar w="200px" h="200px" src={data?.data?.image} />

      <Text fontWeight="bold" fontSize="30px">
        {data?.data?.name || "الإسم غير معروف"}
      </Text>

      <Text w="80%" textAlign="center" fontWeight="500" fontSize="18px">
        {data?.data?.message|| ""}
      </Text>

      <Box
        w="300px"
        aspectRatio="1"
        bg="#ecfff9"
        padding="40px"
        border="1px solid #2A8A6E"
      >
        <QRCode
          style={{
            width: "100%",
            height: "100%",
          }}
          bgColor="#ecfff9"
          fgColor="#2A8A6E"
          value={code || ""}
        />
      </Box>
    </VStack>
  );
};

export default QRHero;
