import { useMemo } from "react";
import { HStack, Text, useDisclosure } from "@chakra-ui/react";
import { ETable, Ebox, GradientButton } from "@components/core";
import useColumns from "../hooks/useColumns";
import { FilterType } from "../FilterSection/FilterType";
import {
  useDeleteDelegate,
  useGetDelegates,
} from "@services/hooks/delegates/useDelegates";
import { FaPlus } from "react-icons/fa6";
import { AUDelegateModal } from "../modals";
import useDelegatesStore from "@store/DelegatesStore";
import { InfoModal } from "../../Modals";
import { Delegates, NotFound } from "../../../TableAssets";

interface Props {
  filter?: FilterType;
}

const TableSection = ({ filter }: Props) => {
  const { data, isLoading, isFetching } = useGetDelegates(filter);
  const { setPage, page } = useDelegatesStore();

  // Modal Configurations
  const modals = {
    add: useDisclosure(),
    edit: useDisclosure(),
    alert: useDisclosure(),
  };
  // ------------------

  const delegates = useMemo(
    () => (isLoading ? [] : data?.data || []),
    [data?.data, isLoading]
  );

  const { columns, recordID } = useColumns(modals);
  const removeDelegate = useDeleteDelegate(Number(recordID));

  return (
    <>
      {/* Update */}
      <AUDelegateModal
        isOpen={modals.edit.isOpen}
        onClose={modals.edit.onClose}
        recordID={recordID}
      />
      {/* Add */}
      <AUDelegateModal
        isOpen={modals.add.isOpen}
        onClose={modals.add.onClose}
      />
      {/* Remove */}
      <InfoModal
        isOpen={modals.alert.isOpen}
        onClose={modals.alert.onClose}
        title="حذف المندوب"
        description="هل أنت متأكد من حذف المندوب؟"
        type="delete"
        onProceed={() => {
          removeDelegate.mutateAsync();
          modals.alert.onClose();
        }}
        isLoading={removeDelegate.isPending}
      />
      <Ebox
        title="سجل المناديب"
        full
        // isBorder={false}
        element={
          <GradientButton
            h="40px"
            w="138px"
            rounded="8px"
            fontWeight="500"
            onClick={modals.add.onOpen}
          >
            <HStack justifyContent="space-between" alignItems="center">
              <FaPlus />
              <Text> اضافة مندوب</Text>
            </HStack>
          </GradientButton>
        }
      >
        <ETable
          columns={columns}
          data={delegates}
          isFetching={isFetching}
          count={data?.count}
          setPage={setPage}
          page={page}
          withPagination
          pageSize={6}
          filter={filter}
          noDataElement={<Delegates />}
          noDataFilterElement={<NotFound />}
        />
      </Ebox>
    </>
  );
};

export default TableSection;
