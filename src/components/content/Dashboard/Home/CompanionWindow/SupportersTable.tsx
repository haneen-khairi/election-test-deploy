/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { DownloadDB, EditPenIcon, SwitchIcon, TrashIcon } from "@assets/icons";
import { Button, HStack, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { ETable } from "@components/core";
import useColumns from "./useColumns";
import { useMemo } from "react";
import useSupportersStore from "@store/SupportersStore";
import { useDeleteSupporters, useGetSupporters } from "@services/hooks/voters/useVoters";
import { MdDeselect, MdSelectAll } from "react-icons/md";
import { InfoModal } from "../../Modals";

const SupportersTable = ({ filter }: { filter: any }) => {
  const { data, isLoading, isFetching } = useGetSupporters(filter);
  const { setPage, page } = useSupportersStore();

  const bulkMove = useDisclosure();
  const remove = useDisclosure();
  const bulkEdit = useDisclosure();
  const bulkRemove = useDisclosure();

  const supporters = useMemo(
    () => (isLoading ? [] : data?.data || []),
    [data?.data, isLoading],
  );

  const { columns, setCheckedRows, checkedRows } = useColumns({
    remove,
  });

  const removeSupporters = useDeleteSupporters(checkedRows);

  const handleCheckAll = () => {
    const supportersData: {
      id: number;
    }[] = supporters as [];

    setCheckedRows(
      checkedRows.length === 0
        ? supportersData.map((supporter) => supporter.id)
        : [],
    );
  };

  return (
    <VStack>
      <HStack p="30px 30px 20px 30px" w="100%" fontWeight={600} fontSize="18px">
        <Text ml="5px">جدول المؤازرة</Text>
        <Text ml="auto">({supporters?.length || 0} صوت)</Text>

        {checkedRows.length > 1 && (
          <Button
            rounded="full"
            p="10px 15px"
            variant="ghost"
            colorScheme="green"
            fontSize="20px"
            onClick={bulkRemove.onOpen}
            size="sm"
            _hover={{
              backgroundColor: "#ce112712",
            }}
          >
            <TrashIcon />
            <Text mr="10px" color="#CE1126">
              حذف
            </Text>
          </Button>
        )}

        <Button
          rounded="full"
          p="10px 15px"
          variant="ghost"
          colorScheme="green"
          fontSize="20px"
          size="sm"
          onClick={handleCheckAll}
        >
          {checkedRows.length !== 0 ? <MdDeselect /> : <MdSelectAll />}
          {checkedRows.length !== 0 ? (
            <Text mr="10px" color="#318973">
              إلغاء التحديد
            </Text>
          ) : (
            <Text mr="10px" color="#318973">
              تحديد الكل
            </Text>
          )}
        </Button>

        <Button
          rounded="full"
          p="10px 15px"
          variant="ghost"
          colorScheme="green"
          fontSize="20px"
          onClick={bulkEdit.onOpen}
          size="sm"
        >
          <SwitchIcon />
          <Text color="#318973">نقل الى أصواتي</Text>
        </Button>

        <Button
          rounded="full"
          p="10px 15px"
          variant="ghost"
          colorScheme="green"
          fontSize="20px"
          size="sm"
        >
          <DownloadDB />
          <Text mr="10px" color="#318973">
            تحميل
          </Text>
        </Button>
      </HStack>

      <InfoModal
        isOpen={remove.isOpen}
        onClose={remove.onClose}
        title="حذف الناخب"
        description="هل أنت متأكد من حذف الناخب؟"
        type="delete"
        onProceed={() => {
          removeSupporters.mutateAsync();
          remove.onClose();
        }}
        isLoading={removeSupporters.isPending}
      />

      <ETable
        columns={columns}
        data={supporters || []}
        isFetching={isFetching}
        count={data?.count}
        setPage={setPage}
        page={page}
        withPagination
        pageSize={20}
      />
    </VStack>
  );
};

export default SupportersTable;
