/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElectionBrand } from "@assets/icons";
import { Box, Spinner, Text, VStack } from "@chakra-ui/react";
import SupporterFilter from "@components/content/supporter/SupporterFilter";
import { useParams } from "react-router-dom";
import { filterSchemas } from "./FilterSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import SupporterTables from "@components/content/supporter/SupporterTables";
import { useGetSupportersByToken } from "@services/hooks/voters/useVoters";

const SupportersPage = () => {
  const { id } = useParams<{ id: string }>();
  const [filter, setFilter] = useState<any>({});

  const {
    data: supporters,
    isLoading,
    isFetching,
  } = useGetSupportersByToken(id || "", filter);

  const {
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(filterSchemas),
    defaultValues: {
      first_name: undefined,
      second_name: undefined,
      third_name: undefined,
      last_name: undefined,
    },
  });

  const data = watch();

  const handleSearch = () => {
    setFilter({ ...data });
  };

  if (!supporters?.status)
    return (
      <VStack w="100%" h="100vh" justifyContent="center" alignItems="center">
        {isLoading || isFetching ? (
          <Spinner />
        ) : (
          <Text fontWeight="bold" fontSize="24px">
            المؤازر غير موجود
          </Text>
        )}
      </VStack>
    );

  return (
    <Box
      w="100%"
      p="20px"
      position="relative"
      display="grid"
      gap="20px"
      gridTemplateColumns="repeat(9, 1fr)"
    >
      <Box gridColumn="span 9" h="60px">
        <ElectionBrand />
      </Box>

      <SupporterFilter
        control={control}
        errors={errors}
        handleSearch={handleSearch}
        reset={reset}
        setFilter={setFilter}
      />

      <SupporterTables
        supporters={supporters}
        isLoading={isLoading}
        isFetching={isFetching}
      />
    </Box>
  );
};

export default SupportersPage;
