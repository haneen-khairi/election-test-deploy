/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SwitchIcon } from "@assets/icons";
import {
  Box,
  Button,
  HStack,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ETable } from "@components/core";
import useColumns from "./useColumns";
import RadioCardGroup from "@components/core/RadioCardButton/RadioCardButton";
import TransferModal from "../modals/TransferModal/TransferModal";
import useListsStore from "@store/ListsStore";
import { useGetProcessedLists } from "@services/hooks/lists/useMyLists";
import { useEffect, useMemo } from "react";
import DownloadNotFound from "./DownloadNotFound";
import { EToast } from "@constants/functions/toast";

const MyListsTable = ({
  names,
  control,
  selectedFile,
}: {
  names: any;
  control: any;
  selectedFile: File | null;
}) => {
  const { setPage1, setPage2, setPage3, page1, page2, page3 } = useListsStore();
  const transfer = useDisclosure();
  const toast = useToast();

  const { data, isLoading, isFetching } = useGetProcessedLists({
    selectedFile,
    key: names,
    isAll: false,
  });

  const { data: fullData } = useGetProcessedLists({
    selectedFile,
    key: names,
    isAll: true,
  });

  const { columns } = useColumns({
    names,
  });

  useEffect(() => {
    setPage1(1);
  }, [names]);

  useEffect(() => {
    const error = (data as any)?.error;
    const detail = (data as any)?.detail;

    if (error) {
      EToast({
        toast,
        title: "Error occurred",
        status: "error",
        description: error,
      });
    }

    if (detail) {
      EToast({
        toast,
        title: "Error occurred",
        status: "error",
        description: detail,
      });
    }
  }, [data]);

  const pageData = useMemo(() => {
    if (names === "found_in_voters")
      return {
        page: page1,
        setPage: setPage1,
      };
    else if (names === "not_found")
      return {
        page: page2,
        setPage: setPage2,
      };
    return {
      page: page3,
      setPage: setPage3,
    };
  }, [names, page1, page2, page3]);

  return (
    <VStack>
      <HStack p="30px 30px 20px 30px" w="100%" fontWeight={600} fontSize="18px">
        <Text ml="10px">جدول قوائمي</Text>

        <TransferModal
          isOpen={transfer.isOpen}
          onClose={transfer.onClose}
          voters={fullData?.data || []}
        />

        <Box ml="auto" h="40px">
          <RadioCardGroup
            name="names"
            control={control}
            options={[
              {
                label: "أسامي تم العثور عليها",
                value: "found_in_voters",
              },
              {
                label: "أسامي لم يتم العثور عليها",
                value: "not_found",
              },
              {
                label: "أسامي مع مناديب آخرين",
                value: "found_with_mandoub_main",
              },
            ]}
          />
        </Box>

        {names === "found_in_voters" && (
          <Button
            rounded="full"
            p="10px 15px"
            variant="ghost"
            colorScheme="green"
            fontSize="20px"
            size="sm"
            onClick={() => transfer.onOpen()}
          >
            <SwitchIcon />
            <Text mr="10px" color="#318973">
              نقل الى أصواتي
            </Text>
          </Button>
        )}

        {names === "not_found" && (
          <DownloadNotFound data={fullData?.data || []} />
        )}
      </HStack>

      <ETable
        columns={columns}
        data={data?.data || []}
        pageSize={6}
        isFetching={isLoading || isFetching}
        count={data?.count}
        setPage={pageData?.setPage}
        page={pageData?.page}
        withPagination
      />
    </VStack>
  );
};

export default MyListsTable;
