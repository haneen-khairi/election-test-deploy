/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SwitchIcon } from "@assets/icons";
import {
  Box,
  Button,
  HStack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { ETable } from "@components/core";
import useColumns from "./useColumns";
import RadioCardGroup from "@components/core/RadioCardButton/RadioCardButton";
import DownloadButton from "@components/core/downloadButton/DownloadButton";
import TransferModal from "../modals/TransferModal/TransferModal";

const MyListsTable = ({
  names,
  data,
  control,
}: {
  data: any;
  names: any;
  control: any;
}) => {
  const transfer = useDisclosure();

  const { columns } = useColumns({
    names,
  });

  return (
    <VStack>
      <HStack p="30px 30px 20px 30px" w="100%" fontWeight={600} fontSize="18px">
        <Text ml="10px">جدول قوائمي</Text>

        <TransferModal isOpen={transfer.isOpen} onClose={transfer.onClose} />

        <Box ml="auto" h="40px">
          <RadioCardGroup
            name="names"
            control={control}
            options={[
              {
                label: "أسامي تم العثور عليها",
                value: "found_in_voters",
              },
              {
                label: "أسامي لم يتم العثور عليها",
                value: "not_found",
              },
              {
                label: "أسامي مع مناديب آخرين",
                value: "found_with_mandoub_main",
              },
            ]}
          />
        </Box>

        {names === "found_in_voters" && (
          <Button
            rounded="full"
            p="10px 15px"
            variant="ghost"
            colorScheme="green"
            fontSize="20px"
            size="sm"
            onClick={() => transfer.onOpen()}
          >
            <SwitchIcon />
            <Text mr="10px" color="#318973">
              نقل الى أصواتي
            </Text>
          </Button>
        )}

        {names === "not_found" && (
          <DownloadButton url="" fileName="content.xlsx" />
        )}
      </HStack>

      <ETable columns={columns} data={data} pageSize={20} />
    </VStack>
  );
};

export default MyListsTable;
