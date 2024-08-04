/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ETable } from "@components/core";
import {
  useDeleteVoter,
  useDeleteVoters,
  useGetVoters,
} from "@services/hooks/voters/useVoters";
import useVostersStore from "@store/VostersSotre";
import useColumns from "./useColumns";
import { useMemo } from "react";
import { HStack, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { BulkEditModal, EditModal } from "../../Voters/modals";
import { InfoModal } from "../../Modals";

const ElectionDayVotersTable = ({ filter }: { filter: any }) => {
  const { setPage, page } = useVostersStore();
  const { data, isLoading, isFetching } = useGetVoters(filter, undefined, true);

  const remove = useDisclosure();
  const edit = useDisclosure();
  const bulkEdit = useDisclosure();
  const bulkRemove = useDisclosure();

  const voters = useMemo(
    () => (isLoading ? [] : data?.data || []),
    [data, isLoading],
  );

  const { columns, checkedRows, recordID } = useColumns({
    edit,
    remove,
  });

  const removeVoter = useDeleteVoter(recordID || "");
  const removeVoters = useDeleteVoters(checkedRows);

  return (
    <VStack>
      <HStack w="100%" fontWeight={600} fontSize="20px" mb="20px">
        <Text ml="auto">جدول الناخبين</Text>
      </HStack>

      <EditModal
        isOpen={edit.isOpen}
        onClose={edit.onClose}
        recordID={recordID}
      />

      <InfoModal
        isOpen={remove.isOpen}
        onClose={remove.onClose}
        title="حذف الناخب"
        description="هل أنت متأكد من حذف الناخب؟"
        type="delete"
        onProceed={() => {
          removeVoter.mutateAsync();
          remove.onClose();
        }}
        isLoading={removeVoter.isPending}
      />

      <InfoModal
        isOpen={bulkRemove.isOpen}
        onClose={bulkRemove.onClose}
        title="حذف الناخبين"
        description="هل أنت متأكد من حذف الناخبين؟"
        type="delete"
        onProceed={() => {
          removeVoters.mutateAsync();
          bulkRemove.onClose();
        }}
        isLoading={removeVoters.isPending}
      />

      <BulkEditModal
        isOpen={bulkEdit.isOpen}
        onClose={bulkEdit.onClose}
        recordIDs={checkedRows}
      />

      <ETable
        columns={columns}
        data={voters}
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

export default ElectionDayVotersTable;
