import { useMemo } from "react";
import { Button, useDisclosure, HStack } from "@chakra-ui/react";
import { ETable, Ebox } from "@components/core";
import { FilterType } from "../FilterSection/FilterType";
import { useGetVoters } from "@services/hooks/voters/useVoters";
import { BulkEditModal, EditModal, InfoModal } from "../modals";
import useVostersStore from "@store/VostersSotre";
import useColumns from "../hooks/useColumns";
import { MdEdit } from "react-icons/md";
import { MdSelectAll } from "react-icons/md";
import { MdDeselect } from "react-icons/md";

interface Props {
  filter?: FilterType;
}

const TableSection = ({ filter }: Props) => {
  const { data, isLoading, isFetching } = useGetVoters(filter);
  const { setPage, page } = useVostersStore();

  // Modal Configurations
  const info = useDisclosure();
  const edit = useDisclosure();
  const bulk = useDisclosure();
  // ------------------

  const voters = useMemo(
    () => (isLoading ? [] : data?.data || []),
    [data?.data, isLoading],
  );

  const { columns, recordID, checkedRows, setCheckedRows } = useColumns({
    edit,
    info,
  });

  const handleCheckAll = () => {
    const votersData: {
      id: number;
    }[] = voters as [];

    setCheckedRows(
      checkedRows.length === 0 ? votersData.map((voter) => voter.id) : [],
    );
  };

  return (
    <>
      <InfoModal
        isOpen={info.isOpen}
        onClose={info.onClose}
        recordID={recordID}
      />
      <EditModal
        isOpen={edit.isOpen}
        onClose={edit.onClose}
        recordID={recordID}
      />
      <BulkEditModal
        isOpen={bulk.isOpen}
        onClose={bulk.onClose}
        recordIDs={checkedRows}
      />
      <Ebox
        title="انتخابات عمان 2024"
        full
        element={
          <HStack>
            {checkedRows.length > 1 && (
              <Button
                rounded="full"
                p="0"
                variant="ghost"
                colorScheme="green"
                fontSize="20px"
                size="sm"
                onClick={bulk.onOpen}
              >
                <MdEdit />
              </Button>
            )}

            <Button
              rounded="full"
              p="0"
              variant="ghost"
              colorScheme="green"
              fontSize="20px"
              size="sm"
              onClick={handleCheckAll}
            >
              {checkedRows.length !== 0 ? <MdDeselect /> : <MdSelectAll />}
            </Button>
          </HStack>
        }
      >
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
      </Ebox>
    </>
  );
};

export default TableSection;
