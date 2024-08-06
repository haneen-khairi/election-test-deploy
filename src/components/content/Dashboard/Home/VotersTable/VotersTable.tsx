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
import { useEffect, useMemo, useState } from "react";
import { Button, HStack, Input, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { DownloadDB, EditPenIcon, TrashIcon } from "@assets/icons";
import { MdDeselect, MdSelectAll } from "react-icons/md";
import { BulkEditModal, EditModal } from "../../Voters/modals";
import { InfoModal } from "../../Modals";
import { FilterSection } from "../../Voters";

const VotersTable = ({ filter, 
  setFilter,
  getCheckboxList = (data?: any[]) => { 
  return data} ,
  treePage = false
}: { 
    filter: any, 
    setFilter: any,
    getCheckboxList?: (data: any[]) => void , 
    treePage?: boolean
  } ) => {
  const { setPage, page } = useVostersStore();
  const { data, isLoading, isFetching } = useGetVoters(filter);
  console.log("🚀 ~ VotersTable ~ data:", data)
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    setFilter({
      first_name: value
    })
    // setFilter((prevFilter: any) => ({
    //   ...prevFilter,
    //   search: value,
    // }));
  };
  const remove = useDisclosure();
  const edit = useDisclosure();
  const bulkEdit = useDisclosure();
  const bulkRemove = useDisclosure();

  const voters: any[] = useMemo(
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

  const removeVoter = useDeleteVoter(recordID || "");
  const removeVoters = useDeleteVoters(checkedRows);
  useEffect(() => {

    getCheckboxList(checkedRows);

    return () => {

    }
  }, [checkedRows])

  return (
    <VStack>
      {treePage && <> 
        {/* <Input
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
        /> */}
        <FilterSection 
        filter={filter}
        setFilter={setFilter}
        treePage={true}
        />
        </>}
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
          size="sm"
        >
          <DownloadDB />
          <Text mr="10px" color="#318973">
            تحميل
          </Text>
        </Button>
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

export default VotersTable;
