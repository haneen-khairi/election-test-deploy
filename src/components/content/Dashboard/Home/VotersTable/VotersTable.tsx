/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ETable } from "@components/core";
import {
  useDeleteVoter,
  useDeleteVoters,
  useGetMyVoters,
  useGetVoters,
} from "@services/hooks/voters/useVoters";
import useVostersStore from "@store/VostersSotre";
import useColumns from "./useColumns";
import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Checkbox,
  HStack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { EditPenIcon, TrashIcon } from "@assets/icons";
import { MdDeselect, MdSelectAll } from "react-icons/md";
import { BulkEditModal, EditModal } from "../../Voters/modals";
import { InfoModal } from "../../Modals";
import { FilterSection } from "../../Voters";
import DownloadButton from "@components/core/downloadButton/DownloadButton";
import DownloadPdfButton from "@components/core/downloadButton/DownloadPdfButton";
import { usePermission } from "@services/hooks/auth/Permission";

const VotersTable = ({
  filter,
  setFilter,
  getCheckboxList = (data?: any[]) => {
    return data;
  },
  treePage = false,
}: {
  filter: any;
  setFilter: any;
  getCheckboxList?: (data: any[]) => void;
  treePage?: boolean;
}) => {
  const { setPage, page } = useVostersStore();
  const {
    data: votersData,
    isLoading: isLoadingVoters,
    isFetching: isFetchingVoters,
  } = useGetVoters(filter);
  const {
    data: myVotersData,
    isLoading: isLoadingMyVoters,
    isFetching: isFetchingMyVoters,
  } = useGetMyVoters(filter);
  const remove = useDisclosure();
  const edit = useDisclosure();
  const bulkEdit = useDisclosure();
  const bulkRemove = useDisclosure();
  const [isAll, setIsAll] = useState(false);
  const { allowList } = usePermission();

  const voters: any[] = useMemo(
    () =>
      (treePage ? isLoadingVoters : isLoadingMyVoters)
        ? []
        : (treePage ? votersData : myVotersData)?.data || [],
    [
      treePage ? votersData : myVotersData,
      treePage ? isLoadingVoters : isLoadingMyVoters,
    ],
  );

  const { columns, setCheckedRows, checkedRows, recordID } = useColumns({
    edit,
    remove,
    treePage
  });

  const handleCheckAll = () => {
    const votersData: {
      id: string;
    }[] = voters as [];

    setCheckedRows(
      checkedRows.length === 0 ? votersData.map((voter) => voter.id) : [],
    );
  };

  const removeVoter = useDeleteVoter(recordID || "");
  const removeVoters = useDeleteVoters(checkedRows);
  useEffect(() => {
    getCheckboxList(checkedRows);

    return () => {};
  }, [checkedRows]);

  return (
    <VStack>
      {treePage && (
        <>
          <FilterSection
            filter={filter}
            setFilter={setFilter}
            treePage={true}
          />
        </>
      )}
      <HStack w="100%" fontWeight={600} fontSize="20px" mb="20px">
        <Text ml="auto">جدول الناخبين</Text>

        {checkedRows.length > 1 && (
          <>
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
          display="flex"
          justifyContent="center"
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

        {checkedRows?.length !== 0 && (
          <HStack
            color="green"
            fontSize="18px"
            gap="10px"
            justifyContent="center"
            ml="15px"
          >
            <Text textAlign="left" color="#318973">
              تحديد كل الصفحات
            </Text>
            <Checkbox
              onChange={(e) => {
                setIsAll(e.target.checked);
              }}
              isChecked={isAll}
            />
          </HStack>
        )}

        <DownloadButton
          url="candidate/voters"
          fileName="content.xlsx"
          filter={filter}
        />

        {allowList?.pdf && (
          <DownloadPdfButton
            url="candidate/voters/pdf"
            fileName="voters.pdf"
            filter={filter}
            myvote={true}
          />
        )}
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
        filter={filter}
        isAll={isAll}
      />

      <ETable
        columns={columns}
        data={voters}
        isFetching={treePage ? isFetchingVoters : isFetchingMyVoters}
        count={(treePage ? votersData : myVotersData)?.count}
        setPage={setPage}
        page={page}
        withPagination
        pageSize={20}
      />
    </VStack>
  );
};

export default VotersTable;
