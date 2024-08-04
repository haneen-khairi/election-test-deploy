/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ETable } from "@components/core";
import { useGetVoters } from "@services/hooks/voters/useVoters";
import useVostersStore from "@store/VostersSotre";
import useColumns from "./useColumns";
import { useMemo } from "react";
import { Button, HStack, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { EditPenIcon } from "@assets/icons";
import { MdDeselect, MdSelectAll } from "react-icons/md";
import { BulkEditModal, EditModal } from "../../Voters/modals";
import DownloadButton from "@components/core/downloadButton/DownloadButton";

const VotersTable = ({ filter , getCheckboxList =(data: any[]) => {}}: { filter: any, getCheckboxList?: (data: any[]) => void }) => {
  const { setPage, page } = useVostersStore();
  const { data, isLoading, isFetching } = useGetVoters(filter, undefined, true);

  const remove = useDisclosure();
  const edit = useDisclosure();
  const bulkEdit = useDisclosure();

  const voters = useMemo(
    () => (isLoading ? [] : data?.data || []),
    [data, isLoading],
  );

  const { columns, setCheckedRows, checkedRows, recordID } = useColumns({
    edit,
    remove,
  });

  const handleCheckAll = () => {
    const votersData: {
      id: string;
    }[] = voters as [];

    setCheckedRows(
      checkedRows.length === 0 ? votersData.map((voter) => voter.id) : [],
    );
  };

  return (
    <VStack>
      <HStack w="100%" fontWeight={600} fontSize="20px" mb="20px">
        <Text ml="auto">جدول الناخبين</Text>

        {checkedRows.length > 1 && (
          <Button
            rounded="full"
            p="10px 15px"
            variant="ghost"
            colorScheme="green"
            fontSize="20px"
            size="sm"
            onClick={bulkEdit.onOpen}
          >
            <EditPenIcon />
            <Text mr="10px" color="#318973">
              تعديل
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

        <DownloadButton url="candidate/voters" fileName="content.xlsx" />
      </HStack>

      <EditModal
        isOpen={edit.isOpen}
        onClose={edit.onClose}
        recordID={recordID}
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

export default VotersTable;