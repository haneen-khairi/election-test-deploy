/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetNamesWithOthers } from "@services/hooks/voters/useVoters";
import useNamesStore from "@store/NamesStore";
import { useMemo } from "react";
import useColumns from "./useColumns";
import { Ebox, ETable } from "@components/core";
import { HStack, VStack } from "@chakra-ui/react";
import DownloadButton from "@components/core/downloadButton/DownloadButton";

const NamesWithOthersPage = () => {
  const { setPage, page } = useNamesStore();
  const { data, isLoading, isFetching } = useGetNamesWithOthers();

  const names = useMemo(
    () => (isLoading ? [] : data?.data || []),
    [data, isLoading],
  );

  const { columns } = useColumns(page || 0);

  return (
    <VStack>
      <Ebox>
        <HStack justify="end">
          <DownloadButton
            url="candidate/my_lists/duplicates"
            fileName="content.xlsx"
            myvote={false}
          />
        </HStack>
      </Ebox>

      <Ebox>
        <ETable
          columns={columns}
          data={names}
          isFetching={isFetching}
          count={data?.count}
          setPage={setPage}
          page={page}
          withPagination
          pageSize={6}
        />
      </Ebox>
    </VStack>
  );
};

export default NamesWithOthersPage;
