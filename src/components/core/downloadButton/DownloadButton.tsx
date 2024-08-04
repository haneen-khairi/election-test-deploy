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
  filter = {},
  myvote = true,
  body = {},
}: {
  url: string;
  fileName: string;
  filter?: any;
  myvote?: boolean;
  body?: any;
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const downloadContent = useDownloadContent({
    url,
    filter,
    myvote,
    isExport: true,
  });

  const handleExport = async () => {
    setIsDownloading(true);

    downloadContent
      .mutateAsync({
        body,
      })
      .then((res: any) => {
        saveXLSXFile(res, fileName);
      })
      .finally(() => {
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
      {isDownloading ? <></> : <Text mr="10px">تحميل csv</Text>}
    </Btn>
  );
};

export default DownloadButton;
