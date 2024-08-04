/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Avatar,
  Box,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Btn, ETable } from "@components/core";
import { useMemo, useState } from "react";
import useColumns from "./useColumns";
import useSupportersStore from "@store/SupportersStore";
import { InfoModal } from "../Dashboard/Modals";
import {
  useGetVoterProfile,
  useSendSupporters,
} from "@services/hooks/voters/useVoters";
import { useParams } from "react-router-dom";
import { EToast } from "@constants/functions/toast";

const SupporterTables = ({
  isFetching,
  isLoading,
  supporters,
}: {
  supporters: any;
  isLoading: any;
  isFetching: any;
}) => {
  const { id } = useParams<{ id: string }>();
  const [addedVoters, setAddedVoters] = useState<any[]>([]);
  const { setPage, page, setAddedPage, addedPage } = useSupportersStore();

  const { code } = useParams<{ code: string }>();
  const { data: profileData } = useGetVoterProfile(code || "");

  const send = useDisclosure();
  const toast = useToast();
  const sendSupporters = useSendSupporters(
    id || "",
    addedVoters.map((item) => item.id),
  );

  const { columns, checkedRows, setCheckedRows } = useColumns({
    isLeft: false,
  });
  const { columns: addedColumns } = useColumns({ isLeft: true });

  const filteredVoters = useMemo(
    () =>
      isLoading
        ? []
        : supporters?.data?.filter(
            (item: any) =>
              !addedVoters.map((item) => item.id).includes(item.id),
          ),
    [addedVoters, supporters, isLoading],
  );

  // const filterSupporters = (supporters: any) =>
  //   isLoading || !supporters
  //     ? []
  //     : supporters.filter(
  //         (item: any) => !addedVoters.map((item) => item.id).includes(item.id),
  //       );

  // const handleCheckAll = () => {
  //   const votersData: {
  //     id: string;
  //   }[] = voters as [];

  //   setCheckedRows(
  //     checkedRows.length === 0 ? votersData.map((voter) => voter.id) : [],
  //   );
  // };

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

      <VStack p="20px" alignItems="center" gap="20px" gridColumn="span 3">
        <Avatar w="100px" h="100px" src={profileData?.data?.image} />

        <Text fontWeight="bold" fontSize="22px">
          {profileData?.data?.name || "الإسم غير معروف"}
        </Text>

        <Text w="50%" textAlign="center" fontWeight="500" fontSize="14px">
          {profileData?.data?.message || ""}
        </Text>
      </VStack>

      {/* <SendModal
        isOpen={send.isOpen}
        onClose={send.onClose}
        addedVoters={addedVoters}
        setAddedVoters={setAddedVoters}
      /> */}

      <InfoModal
        isOpen={send.isOpen}
        onClose={send.onClose}
        title="إرسال الأسماء"
        description="هل أنت متأكد من إرسال الأسماء؟"
        type="save"
        onProceed={() => {
          sendSupporters.mutateAsync().then((res) => {
            if (res.error) {
              const errorMessages = Object.values(res.error).join("; ");
              EToast({
                toast: toast,
                status: "error",
                title: "Error",
                description: errorMessages,
              });
            } else {
              EToast({
                toast,
                status: "success",
                title: "تم الإرسال",
              });
              setAddedVoters([]);
            }
            send.onClose();
          });
        }}
        isLoading={sendSupporters.isPending}
      />

      <Box
        display="grid"
        gridTemplateColumns="repeat(8, 1fr)"
        gridTemplateRows="50px auto"
        gap="30px"
        gridColumn="span 6"
        p="20px 50px"
      >
        <Text fontSize="18px" fontWeight="bold" my="auto" gridColumn="span 5">
          الأسماء
        </Text>

        <Text fontSize="18px" fontWeight="bold" my="auto" gridColumn="span 3">
          الأسماء المضافة
        </Text>

        <Btn
          h="fit-content"
          gridColumn="span 5"
          py="10px"
          px="50px"
          ml="auto"
          type="outlined"
          fontSize="17px"
          color={checkedRows.length === 0 ? "#7878786a" : "#318973"}
          border="1px solid #318973"
          borderColor={checkedRows.length === 0 ? "#7878786a" : "#318973"}
          borderRadius="50px"
          iconPlacment="right"
          disabled={checkedRows.length === 0}
          _hover={{
            backgroundColor: "#318973",
            color: "white",
          }}
          onClick={handleAddVoters}
        >
          <Text>أضافة</Text>
        </Btn>

        <Btn
          gridColumn="span 3"
          h="fit-content"
          py="10px"
          px="50px"
          ml="auto"
          type="solid"
          borderRadius="50px"
          iconPlacment="right"
          bg={addedVoters.length === 0 ? "#7878786a" : "#318973"}
          color={addedVoters.length === 0 ? "#7878786a" : "#fff"}
          borderColor={addedVoters.length === 0 ? "#7878786a" : "#318973"}
          fontSize="17px"
          disabled={addedVoters.length === 0}
          onClick={handleSendVoters}
        >
          <Text>إرسال الأسماء</Text>
        </Btn>

        <VStack gridColumn="span 5">
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

        <VStack gridColumn="span 3">
          <ETable
            columns={addedColumns}
            data={addedVoters}
            count={addedVoters.length}
            setPage={setAddedPage}
            page={addedPage}
            withPagination
            pageSize={20}
          />
        </VStack>
      </Box>
    </>
  );
};

export default SupporterTables;
