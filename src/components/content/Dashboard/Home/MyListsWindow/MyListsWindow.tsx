/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, VStack, useToast } from "@chakra-ui/react";
import { Btn, Ebox } from "@components/core";
import FileInput from "@components/core/FileInput/FileInput";
import { useMemo, useReducer, useState } from "react";
import MyListsTable from "./MyListsTable";
import { useProcessMyLists } from "@services/hooks/lists/useMyLists";
import { EToast } from "@constants/functions/toast";
import { useForm } from "react-hook-form";
import { myListsSchema } from "./myListsSchemas";
import { yupResolver } from "@hookform/resolvers/yup";

const MyListsWindow = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const process1 = useProcessMyLists({ page: 1, key: "found_in_voters" });
  const process2 = useProcessMyLists({ page: 1, key: "not_found" });
  const process3 = useProcessMyLists({
    page: 1,
    key: "found_with_mandoub_main",
  });

  const { control, watch, setValue } = useForm({
    resolver: yupResolver(myListsSchema),
    defaultValues: {
      names: undefined,
    },
  });

  const toast = useToast();

  const listsReducer = (
    state: {
      found_in_voters: any[];
      not_found: any[];
      found_with_mandoub_main: any[];
    },
    action: {
      type: "found_in_voters" | "not_found" | "found_with_mandoub_main";
      value: any;
    },
  ) => {
    if (action.type === "found_in_voters") {
      return { ...state, found_in_voters: action.value };
    }
    if (action.type === "not_found") {
      return { ...state, not_found: action.value };
    }
    if (action.type === "found_with_mandoub_main") {
      return { ...state, found_with_mandoub_main: action.value };
    }
    return state;
  };

  const [listsState, dispatchLists] = useReducer(listsReducer, {
    found_in_voters: [],
    not_found: [],
    found_with_mandoub_main: [],
  }) as any;

  const handleProcess = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    const res1 = await process1.mutateAsync(formData);
    !res1.error &&
      dispatchLists({ type: "found_in_voters", value: res1?.data || [] });

    const res2 = await process2.mutateAsync(formData);
    !res2.error &&
      dispatchLists({ type: "not_found", value: res2?.data || [] });

    const res3 = await process3.mutateAsync(formData);
    !res3.error &&
      dispatchLists({
        type: "found_with_mandoub_main",
        value: res3?.data || [],
      });

    if (!res1.error && !res2.error && !res3.error) {
      EToast({
        toast: toast,
        status: "success",
        title: "نجاح العملية",
      });

      setValue("names", "found_in_voters");
    } else {
      EToast({
        toast: toast,
        status: "error",
        title: "Error",
        description: "Error while fetching data",
      });
    }
  };

  const { names } = watch();

  const data = useMemo(
    () => (names ? listsState[names] : []),
    [names, listsState],
  );

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

        <Btn disabled={!selectedFile} mt="15px" onClick={handleProcess}>
          <Text>معالجة</Text>
        </Btn>
      </Ebox>

      <Ebox full>
        <MyListsTable control={control} names={names} data={data} />
      </Ebox>
    </VStack>
  );
};

export default MyListsWindow;
