import { DownloadDB, SwitchIcon, TrashIcon } from "@assets/icons";
import {
  Box,
  Button,
  HStack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import RadioCardGroup from "@components/core/RadioCardButton/RadioCardButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { myListsSchema } from "./myListsSchemas";
import { ETable } from "@components/core";
import useColumns from "./useColumns";
// import { useMemo } from "react";
// import { useGetVoters } from "@services/hooks/voters/useVoters";
import useVostersStore from "@store/VostersSotre";

const MyListsTable = () => {
  // const { data, isLoading, isFetching } = useGetVoters({});
  const { setPage, page } = useVostersStore();

  const { control } = useForm({
    resolver: yupResolver(myListsSchema),
    defaultValues: {
      names: undefined,
    },
  });

  const info = useDisclosure();
  const edit = useDisclosure();

  // const voters = useMemo(
  //   () => (isLoading ? [] : data?.data || []),
  //   [data?.data, isLoading],
  // );

  const { columns } = useColumns({
    edit,
    info,
  });

  return (
    <VStack>
      <HStack p="30px 30px 20px 30px" w="100%" fontWeight={600} fontSize="18px">
        <Text ml="20px">جدول قوائمي</Text>

        <Box ml="auto">
          <RadioCardGroup
            options={[
              {
                label: "أسامي تم العثور عليها",
                value: "found",
              },
              {
                label: "أسامي لم يتم العثورعليها",
                value: "notFound",
              },
            ]}
            name="gender"
            control={control}
          />
        </Box>

        <Button
          rounded="full"
          p="10px 15px"
          variant="ghost"
          colorScheme="green"
          fontSize="20px"
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

        <Button
          rounded="full"
          p="10px 15px"
          variant="ghost"
          colorScheme="green"
          fontSize="20px"
          size="sm"
        >
          <SwitchIcon />
          <Text mr="10px" color="#318973">
            نقل الى أصواتي
          </Text>
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

      <ETable
        columns={columns}
        data={[]}
        // isFetching={isFetching}
        // count={data?.count}
        setPage={setPage}
        page={page}
        withPagination
        pageSize={20}
      />
    </VStack>
  );
};

export default MyListsTable;
