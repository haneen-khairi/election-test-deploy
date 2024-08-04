/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HStack, useDisclosure } from "@chakra-ui/react";
import { ETable, GradientButton, Popup } from "@components/core";
import { useMemo } from "react";
import useSupportersStore from "@store/SupportersStore";
import useColumns from "./useColumns";
import AddSupporterModal from "./AddSupporterModal";
import { useGetSupporterNamesModal } from "@services/hooks/delegates/useDelegates";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SupporterModal = ({ isOpen, onClose }: Props) => {
  const { setModalPage, modalPage } = useSupportersStore();
  const { data, isFetching, isLoading } = useGetSupporterNamesModal();

  const supporters = useMemo(
    () => (isLoading ? [] : data?.data || []),
    [data?.data, isLoading],
  );

  const { columns } = useColumns();
  const addSupporter = useDisclosure();

  return (
    <>
      <Popup
        title="إضافة لجان المؤازرة"
        size="lg"
        isOpen={isOpen}
        onClose={onClose}
      >
        <AddSupporterModal
          isOpen={addSupporter.isOpen}
          onClose={addSupporter.onClose}
        />

        <ETable
          columns={columns}
          data={supporters}
          isFetching={isFetching}
          setPage={setModalPage}
          page={modalPage}
          withPagination
          pageSize={20}
        />

        <HStack mt="24px" justifyContent="end">
          <GradientButton onClick={addSupporter.onOpen}>إضافة</GradientButton>
        </HStack>
      </Popup>
    </>
  );
};

export default SupporterModal;
