/* eslint-disable @typescript-eslint/no-explicit-any */
import { DownloadDB } from "@assets/icons";
import { Text } from "@chakra-ui/react";
import { Btn } from "@components/core";
import { saveXLSXFile } from "@constants/functions/SaveXLSX";
import { useDownloadContent } from "@services/hooks/excel/useExcel";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";

const DownloadNotFound = ({ data }: { data: any[] }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadContent = useDownloadContent({
    url: "candidate/my_lists/download-not-found-excel/",
    filter: {},
    myvote: false,
  });

  const downloadNotFoundData = async () => {
    setIsDownloading(true);

    downloadContent
      .mutateAsync({
        body: data,
      })
      .then((res: any) => {
        saveXLSXFile(res, "content.xlsx");
      })
      .finally(() => {
        setIsDownloading(false);
      });
  };

  return (
    <Btn
      rounded="full"
      fontSize="18px"
      onClick={downloadNotFoundData}
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

export default DownloadNotFound;
