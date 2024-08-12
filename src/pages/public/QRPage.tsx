import { Box } from "@chakra-ui/react";
import QRHeader from "@components/content/QR/QRHeader";
import QRHero from "@components/content/QR/QRHero";

const QRPage = () => {
  return (
    <Box
      w="100%"
      minH="100vh"
      bg="#F5F5F5"
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="start"
    >
      <QRHeader />
      <QRHero />
    </Box>
  );
};

export default QRPage;
