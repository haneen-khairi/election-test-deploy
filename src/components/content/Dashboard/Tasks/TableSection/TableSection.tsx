import { useMemo } from "react";
import { HStack, Text, useDisclosure } from "@chakra-ui/react";
import { ETable, Ebox, GradientButton } from "@components/core";
import useColumns from "../hooks/useColumns";
import { FilterType } from "../FilterSection/FilterType";
import { useDeleteDelegate } from "@services/hooks/delegates/useDelegates";
import { FaPlus } from "react-icons/fa6";
import { AUTaskModal } from "../modals";
import { InfoModal } from "../../Modals";
import { NotFound, TaskAsset } from "../../../TableAssets";
import { useGetTasks } from "@services/hooks/tasks/useTasks";
import useTasksStore from "@store/TasksStore";

interface Props {
  filter?: FilterType;
}

const TableSection = ({ filter }: Props) => {
  const { data, isLoading, isFetching } = useGetTasks(filter);
  const { setPage, page } = useTasksStore();

  // Modal Configurations
  const modals = {
    add: useDisclosure(),
    edit: useDisclosure(),
    alert: useDisclosure(),
  };
  // ------------------

  const tasks = useMemo(
    () => (isLoading ? [] : data?.data || []),
    [data?.data, isLoading],
  );

  const { columns, recordID } = useColumns(modals);
  const removeDelegate = useDeleteDelegate(recordID || "");

  return (
    <>
      {/* Update */}
      <AUTaskModal
        isOpen={modals.edit.isOpen}
        onClose={modals.edit.onClose}
        recordID={recordID}
      />
      {/* Add */}
      <AUTaskModal isOpen={modals.add.isOpen} onClose={modals.add.onClose} />
      {/* Remove */}
      <InfoModal
        isOpen={modals.alert.isOpen}
        onClose={modals.alert.onClose}
        title="حذف المهمة"
        description="هل أنت متأكد من حذف المهمة؟"
        type="delete"
        onProceed={() => {
          removeDelegate.mutateAsync();
          modals.alert.onClose();
        }}
        isLoading={removeDelegate.isPending}
      />
      <Ebox
        title="سجل المهام"
        full
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
              <Text> اضافة مهام</Text>
            </HStack>
          </GradientButton>
        }
      >
        <ETable
          columns={columns}
          data={tasks}
          isFetching={isFetching}
          count={data?.count}
          setPage={setPage}
          page={page}
          withPagination
          pageSize={6}
          filter={filter}
          noDataElement={<TaskAsset />}
          noDataFilterElement={<NotFound />}
        />
      </Ebox>
    </>
  );
};

export default TableSection;
