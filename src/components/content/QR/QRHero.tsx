import { Avatar, Box, Grid, GridItem, Text, VStack } from "@chakra-ui/react";
import { useGetVoterProfileByToken } from "@services/hooks/voters/useVoters";
import QRCode from "qrcode.react";
import { useParams } from "react-router-dom";

const QRHero = () => {
  const { code } = useParams<{ code: string }>();
  const { data } = useGetVoterProfileByToken(code || "");

  if (code === "") return <Box>No code was provided</Box>;

  const placeholder = "غير معروف";

  return (
    <VStack p="50px 20px 20px 20px" w="100%" alignItems="center" gap="20px">
      <Avatar w="200px" h="200px" src={data?.data?.candidate_image} />

      <Text fontWeight="bold" fontSize="30px">
        {data?.data?.candidate_name || "الإسم غير معروف"}
      </Text>

      <Text w="80%" textAlign="center" fontWeight="500" fontSize="18px">
        {data?.data?.candidate_message || ""}
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

      <Grid
        my="20px"
        mx="10vw"
        fontSize="20px"
        templateColumns="repeat(2, 1fr)"
        rowGap="30px"
      >
        <GridItem fontWeight="bold">إسم الناخب :</GridItem>
        <GridItem>{data?.data?.voter_name || placeholder}</GridItem>

        <GridItem fontWeight="bold">إسم المندوب :</GridItem>
        <GridItem>{`${data?.data?.mandoub_main_name || placeholder} (${data?.data?.mandoub_main_number || placeholder})`}</GridItem>

        <GridItem fontWeight="bold">مندوب الحركة :</GridItem>
        <GridItem>{`${data?.data?.mandoub_haraka_name || placeholder} (${data?.data?.mandoub_haraka_number || placeholder})`}</GridItem>

        <GridItem fontWeight="bold">مندوب المدرسة :</GridItem>
        <GridItem>{`${data?.data?.supervisor_name || placeholder} (${data?.data?.supervisor_number || placeholder})`}</GridItem>

        <GridItem fontWeight="bold">مكان الإنتخاب :</GridItem>
        <GridItem>{`${data?.data?.voting_center || placeholder} (صندوق رقم: ${data?.data?.box || placeholder})`}</GridItem>

        <GridItem fontWeight="bold">حالة التصويت :</GridItem>
        <GridItem>
          {data?.data?.is_voted ? "تم التصويت" : "لم يتم التصويت"}
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default QRHero;
