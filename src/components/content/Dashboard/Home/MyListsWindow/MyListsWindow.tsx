import { VStack } from "@chakra-ui/react";
import { Ebox } from "@components/core";
import FileInput from "@components/core/FileInput/FileInput";
import { useState } from "react";
import MyListsTable from "./MyListsTable";

const MyListsWindow = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
        />
      </Ebox>

      <Ebox full>
        <MyListsTable />
      </Ebox>
    </VStack>
  );
};

export default MyListsWindow;
