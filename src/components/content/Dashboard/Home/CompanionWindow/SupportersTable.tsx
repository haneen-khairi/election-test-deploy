/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SwitchIcon, TrashIcon } from "@assets/icons";
import { Button, HStack, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { ETable } from "@components/core";
import useColumns from "./useColumns";
import { useMemo } from "react";
import useSupportersStore from "@store/SupportersStore";
import {
  useDeleteSupporters,
  useGetSupporters,
} from "@services/hooks/voters/useVoters";
import { MdDeselect, MdSelectAll } from "react-icons/md";
import { InfoModal } from "../../Modals";
import BulkMoveModal from "../../Modals/BulkMoveModal/BulkMoveModal";
import DownloadButton from "@components/core/downloadButton/DownloadButton";

const SupportersTable = ({ filter }: { filter: any }) => {
  const { data, isLoading, isFetching } = useGetSupporters(filter);
  const { setPage, page } = useSupportersStore();

  const bulkMove = useDisclosure();
  const remove = useDisclosure();
  const bulkRemove = useDisclosure();

  const supporters = useMemo(
    () => (isLoading ? [] : data?.data || []),
    [data?.data, isLoading],
  );

  const { columns, setCheckedRows, checkedRows, recordID } = useColumns({
    remove,
  });

  const removeSupporters = useDeleteSupporters();

  const handleCheckAll = () => {
    const supportersData: {
      id: string;
    }[] = supporters as [];

    setCheckedRows(
      checkedRows?.length === 0
        ? supportersData.map((supporter) => supporter.id)
        : [],
    );
  };

  return (
    <VStack>
      <HStack p="30px 30px 20px 30px" w="100%" fontWeight={600} fontSize="18px">
        <Text ml="auto">جدول المؤازرة</Text>

        {checkedRows?.length > 0 && (
          <>
            <Button
              rounded="full"
              p="10px 15px"
              variant="ghost"
              colorScheme="green"
              fontSize="18px"
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

            <Button
              rounded="full"
              p="10px 15px"
              variant="ghost"
              colorScheme="green"
              fontSize="18px"
              onClick={bulkMove.onOpen}
              size="sm"
            >
              <SwitchIcon />
              <Text color="#318973">نقل الى أصواتي</Text>
            </Button>
          </>
        )}

        <Button
          rounded="full"
          p="10px 15px"
          variant="ghost"
          colorScheme="green"
          fontSize="18px"
          size="sm"
          onClick={handleCheckAll}
        >
          {checkedRows?.length !== 0 ? <MdDeselect /> : <MdSelectAll />}
          {checkedRows?.length !== 0 ? (
            <Text mr="10px" color="#318973">
              إلغاء التحديد
            </Text>
          ) : (
            <Text mr="10px" color="#318973">
              تحديد الكل
            </Text>
          )}
        </Button>

        <DownloadButton
          url="supporter/assign_selected_users_to_my_votes"
          fileName="content.xlsx"
        />
      </HStack>

      <InfoModal
        isOpen={remove.isOpen}
        onClose={remove.onClose}
        title="حذف المؤازر"
        description="هل أنت متأكد من حذف المؤازر؟"
        type="delete"
        onProceed={() => {
          recordID && removeSupporters.mutateAsync([String(recordID)]);
          remove.onClose();
        }}
        isLoading={removeSupporters.isPending}
      />

      <InfoModal
        isOpen={bulkRemove.isOpen}
        onClose={bulkRemove.onClose}
        title="حذف المؤازرين"
        description="هل أنت متأكد من حذف المؤازرين؟"
        type="delete"
        onProceed={() => {
          checkedRows &&
            removeSupporters.mutateAsync(checkedRows.map((id) => String(id)));
          bulkRemove.onClose();
        }}
        isLoading={removeSupporters.isPending}
      />

      <BulkMoveModal
        isOpen={bulkMove.isOpen}
        onClose={bulkMove.onClose}
        recordIDs={checkedRows}
      />

      <ETable
        columns={columns}
        data={supporters}
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
