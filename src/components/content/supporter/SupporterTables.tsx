/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Avatar,
  Box,
  Spinner,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { Btn, ETable } from "@components/core";
import React, { useMemo, useState } from "react";
import useColumns from "./useColumns";
import useSupportersStore from "@store/SupportersStore";
import {
  useGetSupportersByToken,
  useGetVoterProfileById,
} from "@services/hooks/voters/useVoters";
import { useParams } from "react-router-dom";
import SendModal from "./SendModal/SendModal";

const SupporterTables = React.memo(() => {
  const { id } = useParams<{ id: string }>();
  const [addedVoters, setAddedVoters] = useState<any[]>([]);
  const { setPage, page, setAddedPage, addedPage } = useSupportersStore();
  const { data: profileData } = useGetVoterProfileById(id || "");
  const { filter } = useSupportersStore();
  const {
    data: supporters,
    isLoading,
    isFetching,
  } = useGetSupportersByToken(id || "", filter);

  const send = useDisclosure();

  const { columns, checkedRows, setCheckedRows } = useColumns({
    isLeft: false,
  });
  const { columns: addedColumns } = useColumns({ isLeft: true });

  const filteredVoters: any[] = useMemo(
    () =>
      !isLoading && supporters
        ? supporters?.data?.filter(
            (item: any) =>
              !addedVoters.map((item) => item.id).includes(item.id),
          )
        : [],
    [addedVoters, supporters, isLoading],
  );

  if (!supporters?.status)
    return (
      <VStack
        gridColumn="span 9"
        w="100%"
        h="100vh"
        justifyContent="center"
        alignItems="center"
      >
        {isLoading || isFetching ? (
          <Spinner />
        ) : (
          <Text fontWeight="bold" fontSize="24px" textAlign="center" w="100%">
            المؤازر غير موجود
          </Text>
        )}
      </VStack>
    );

  const handleAddVoters = () => {
    const checkedVoters = filteredVoters.filter((item: any) =>
      checkedRows.includes(item.id),
    );
    setAddedVoters((prev) => [...prev, ...checkedVoters]);
    setCheckedRows([]);
  };

  const handleSendVoters = () => {
    send.onOpen();
  };

  return (
    <>
      <Box
        gridColumn="span 9"
        my="20px"
        bg="#EBFFF9"
        w="100%"
        p="15px"
        borderRadius="12px"
        border="1px solid rgba(0, 0, 0, 0.08)"
      >
        <Text textAlign="center" fontWeight="bold" font-size="16px">
          الرسالة صالحة لمدة 24 ساعة فقط
        </Text>
      </Box>

      <VStack
        p="20px"
        alignItems="center"
        gap="20px"
        gridColumn={{ base: "span 9", lg: "span 3" }}
      >
        <Avatar w="100px" h="100px" src={profileData?.data?.image} />

        <Text fontWeight="bold" fontSize="22px">
          {profileData?.data?.name || "الإسم غير معروف"}
        </Text>

        <Text w="50%" textAlign="center" fontWeight="500" fontSize="14px">
          {profileData?.data?.message || ""}
        </Text>
      </VStack>

      <SendModal
        isOpen={send.isOpen}
        onClose={send.onClose}
        addedVoters={addedVoters}
        setAddedVoters={setAddedVoters}
      />

      <Box
        display="grid"
        gridTemplateColumns="repeat(8, 1fr)"
        gridTemplateRows="50px auto"
        gap="30px"
        gridColumn={{ base: "span 9", lg: "span 6" }}
        p="20px 50px"
      >
        <Text
          fontSize="18px"
          fontWeight="bold"
          my="auto"
          gridColumn={{ base: "span 9", lg: "span 5" }}
          gridRow={{ base: "1", lg: "1" }}
        >
          الأسماء
        </Text>

        <Text
          fontSize="18px"
          fontWeight="bold"
          my="auto"
          gridColumn={{ base: "span 9", lg: "span 3" }}
          gridRow={{ base: "4", lg: "1" }}
        >
          الأسماء المضافة
        </Text>

        <Btn
          h="fit-content"
          gridColumn={{ base: "span 9", lg: "span 5" }}
          gridRow={{ base: "2", lg: "2" }}
          py="10px"
          px="50px"
          ml="auto"
          type="outlined"
          fontSize="17px"
          color={checkedRows?.length === 0 ? "#7878786a" : "#318973"}
          border="1px solid #318973"
          borderColor={checkedRows?.length === 0 ? "#7878786a" : "#318973"}
          borderRadius="50px"
          iconPlacment="right"
          disabled={checkedRows?.length === 0}
          _hover={{
            backgroundColor: "#318973",
            color: "white",
          }}
          onClick={handleAddVoters}
        >
          <Text>أضافة</Text>
        </Btn>

        <Btn
          gridColumn={{ base: "span 9", lg: "span 3" }}
          gridRow={{ base: "5", lg: "2" }}
          h="fit-content"
          py="10px"
          px="50px"
          ml="auto"
          type="solid"
          borderRadius="50px"
          iconPlacment="right"
          bg={addedVoters?.length === 0 ? "#7878786a" : "#318973"}
          color={addedVoters?.length === 0 ? "#7878786a" : "#fff"}
          borderColor={addedVoters?.length === 0 ? "#7878786a" : "#318973"}
          fontSize="17px"
          disabled={addedVoters?.length === 0}
          onClick={handleSendVoters}
        >
          <Text>إرسال الأسماء</Text>
        </Btn>

        <VStack
          gridColumn={{ base: "span 9", lg: "span 5" }}
          gridRow={{ base: "3", lg: "3" }}
        >
          <ETable
            columns={columns}
            data={filteredVoters}
            isFetching={isFetching}
            count={supporters?.count}
            setPage={setPage}
            page={page}
            withPagination
            pageSize={20}
          />
        </VStack>

        <VStack
          gridColumn={{ base: "span 9", lg: "span 3" }}
          gridRow={{ base: "6", lg: "3" }}
        >
          <ETable
            columns={addedColumns}
            data={addedVoters}
            count={addedVoters?.length}
            setPage={setAddedPage}
            page={addedPage}
            withPagination
            pageSize={20}
          />
        </VStack>
      </Box>
    </>
  );
});

export default SupporterTables;
