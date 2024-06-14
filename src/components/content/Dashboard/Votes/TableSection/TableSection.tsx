import { useMemo } from "react";
import { Button, HStack, useDisclosure } from "@chakra-ui/react";
import { ETable, Ebox } from "@components/core";
import { FilterType } from "../FilterSection/FilterType";
import { useGetVoters } from "@services/hooks/voters/useVoters";
import { EditModal, InfoModal } from "../modals";
import useVostersStore from "@store/VostersSotre";
import useColumns from "../hooks/useColumns";
import GuaranteedAsset from "@components/content/TableAssets/GuaranteedAsset";
import { NotFound } from "@components/content/TableAssets";
import SwingingAsset from "@components/content/TableAssets/SwingingAsset";
import { MdDeselect, MdEdit, MdSelectAll } from "react-icons/md";
import BulkEditModal from "../modals/BulkEditModal/BulkEditModal";

interface Props {
  filter?: FilterType;
  status?: string;
}

const TableSection = ({ filter, status }: Props) => {
  const { data, isLoading, isFetching } = useGetVoters(filter, status);
  const { setPage, page } = useVostersStore();

  // Modal Configurations
  const info = useDisclosure();
  const edit = useDisclosure();
  const bulk = useDisclosure();
  // ------------------

  const MyVotes = useMemo(
    () => (isLoading ? [] : data?.data || []),
    [data?.data, isLoading],
  );

  const { columns, recordID, checkedRows, setCheckedRows } = useColumns({
    edit,
    info,
  });

  const handleCheckAll = () => {
    const votersData: {
      id: string;
    }[] = MyVotes as [];

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
          data={MyVotes}
          isFetching={isFetching}
          count={data?.count}
          setPage={setPage}
          page={page}
          pageSize={16}
          withPagination
          filter={filter}
          noDataElement={
            status === "100" ? <GuaranteedAsset /> : <SwingingAsset />
          }
          noDataFilterElement={<NotFound />}
        />
      </Ebox>
    </>
  );
};

export default TableSection;
