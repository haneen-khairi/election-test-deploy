/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, VStack } from "@chakra-ui/react";
import { Btn, Ebox } from "@components/core";
import FileInput from "@components/core/FileInput/FileInput";
import { useEffect, useState } from "react";
import MyListsTable from "./MyListsTable";
import { useForm } from "react-hook-form";
import { myListsSchema } from "./myListsSchemas";
import { yupResolver } from "@hookform/resolvers/yup";

const MyListsWindow = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessed, setIsProcessed] = useState(false);

  const { control, watch, setValue } = useForm({
    resolver: yupResolver(myListsSchema),
    defaultValues: {
      names: undefined,
    },
  });

  const handleProcess = async () => {
    setIsProcessed(true);

    setTimeout(() => {
      setIsProcessed(false);
    }, 100);

    setTimeout(() => {
      setIsProcessed(true);
      setValue("names", "found_with_mandoub_main")
    }, 200);
  };

  useEffect(() => {
    setIsProcessed(false);
  }, [selectedFile]);

  const { names } = watch();

  return (
    <VStack gap="16px">
      <Ebox
        style={{
          border: "dashed 2px #00000022",
        }}
      >
        <FileInput
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          type="excel-image"
        />

        <Btn disabled={!selectedFile} onClick={handleProcess} mt="15px">
          <Text>معالجة</Text>
        </Btn>
      </Ebox>

      <Ebox full>
        {selectedFile && isProcessed && (
          <MyListsTable
            control={control}
            names={names}
            selectedFile={selectedFile}
          />
        )}
      </Ebox>
    </VStack>
  );
};

export default MyListsWindow;
