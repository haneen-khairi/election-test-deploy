/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DownloadDB } from "@assets/icons";
import { Text } from "@chakra-ui/react";
import { saveXLSXFile } from "@constants/functions/SaveXLSX";
import { useDownloadContent } from "@services/hooks/excel/useExcel";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Btn from "../btn/Btn";

const DownloadButton = ({
  url,
  fileName,
}: {
  url: string;
  fileName: string;
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadContent = useDownloadContent(url);

  const handleExport = async () => {
    setIsDownloading(true);

    downloadContent.mutateAsync({}).then((res) => {
      saveXLSXFile(res, fileName);
      setIsDownloading(false);
    });
  };

  return (
    <Btn
      rounded="full"
      fontSize="18px"
      onClick={handleExport}
      borderRadius="50px"
      icon={!isDownloading ? <DownloadDB /> : <BsThreeDots color="#9999996a" />}
      iconPlacment="right"
      bg={"#ffffff"}
      border="1px"
      borderColor={isDownloading ? "#9999996a" : "#318973"}
      color="#318973"
      _hover={{
        color: "#318973",
        bg: "#fff",
      }}
      disabled={isDownloading}
    >
      {isDownloading ? <></> : <Text mr="10px">تحميل</Text>}
    </Btn>
  );
};

export default DownloadButton;
