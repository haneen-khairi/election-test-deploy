import { useState, useRef } from "react";
import { Text, Icon, Button, Flex, Box } from "@chakra-ui/react";
import { BsXCircle } from "react-icons/bs";
import { DownloadIcon } from "@assets/icons";

interface FileInputProps {
  selectedFile: File | null;
  setSelectedFile: (x: File | null) => void;
}

function FileInput({ selectedFile, setSelectedFile }: FileInputProps) {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setMessage("Drop Here!");
  };

  const handleDragLeave = () => {
    setMessage("");
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    handleFile(file);
  };

  const handleFile = (file: File | null) => {
    if (!file) return;

    const fileType = file.type;
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (allowedTypes.includes(fileType)) {
      //   setMessage(`File ${file.name} selected!`);
      setSelectedFile(file);
    } else {
      setMessage("Please select a PDF, DOC or DOCX file.");
      setSelectedFile(null);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setMessage("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <>
      <Flex
        textAlign="center"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        w={"100%"}
        justify={"center"}
        align={"center"}
        direction={"column"}
        cursor={"pointer"}
        gap="5px"
      >
        <input
          type="file"
          accept=".csv"
          style={{ display: "none" }}
          onChange={handleFileSelect}
          ref={inputRef}
        />

        <Box
          background="#318973"
          borderRadius="100%"
          w="32px"
          h="32px"
          padding="5px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <DownloadIcon />
        </Box>

        <Text
          textAlign={"center"}
          width={"100%"}
          fontSize={"14px"}
          pointerEvents={"none"}
          color="#353535"
        >
          أرفق ملف Excel
        </Text>

        <Text
          textAlign={"center"}
          width={"100%"}
          fontSize={"22px"}
          pointerEvents={"none"}
          pt="10px"
          fontWeight={600}
          color="#318973"
        >
          انقر للتحميل
        </Text>

        <Text
          textAlign={"center"}
          width={"100%"}
          fontSize={"14px"}
          pointerEvents={"none"}
          color="#353535"
        >
          أو قم بالسحب والإسقاط
        </Text>

        <Text
          fontSize={"12px"}
          color={"#969DB2"}
          textAlign={"center"}
          fontWeight={"400"}
          pointerEvents={"none"}
          mb={"16px"}
          width={"100%"}
        >
          (الحد الأقصى لحجم الملف: 25 ميجابايت)
        </Text>
        <Text pointerEvents={"none"}>{message}</Text>
      </Flex>
      {selectedFile && (
        <Flex mt={2} alignItems="center">
          <DownloadIcon />
          <Text
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            maxW={"calc(100% - 90px)"}
            flex={1}
            ml={2}
          >
            {selectedFile.name}
          </Text>
          <Button ml={2} variant="ghost" colorScheme="red" onClick={removeFile}>
            <Icon as={BsXCircle} />
          </Button>
        </Flex>
      )}
    </>
  );
}

export default FileInput;
