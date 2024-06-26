import {
  Grid,
  HStack,
  Heading,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { filterSectionSchema } from "./FilterSectionSchemas";
import useAuthStore from "@store/AuthStore";
import Filters from "./Filters";
import { Btn } from "@components/core";
import { FaPlus } from "react-icons/fa";
import { AUTaskModal } from "../modals";

const TasksFilterSection = ({
  setFilter,
  onSuccess,
  onReset = () => {}
}: {
  setFilter: React.Dispatch<React.SetStateAction<any | undefined>>;
  onSuccess: () => void,
  onReset : () => void
}) => {
  const { data } = useAuthStore();
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure()

  const {
    control,
    reset,
    register,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    // resolver: yupResolver(filterSectionSchema),
    defaultValues: {
      type_of_tasks: "",
      date: "",
      time: ""
    },
  });

  const handleSearch = () => {
    setFilter((prev: any) => ({
      ...prev,
      date: watch("date"),
      time: watch("time"),
      type_of_tasks: watch("type_of_tasks")
    }));
  };
  function onSuccessAdd(){
    onClose()
    onSuccess()
  }
  return (
    <VStack>
      <HStack w="100%" justifyContent="space-between">
        <VStack alignItems="start">
          <Heading size="md" display="flex" gap="10px">
            <Text>مرحبا</Text>
            <Text>{data?.user?.name || "الاسم غير معروف,"}</Text>
          </Heading>
          <Text fontSize="md">
            هذه هي صفحة المهام الخاصة بك حيث يمكنك إدارة وتتبع جميع الأنشطة
            والواجبات المتعلقة بانتخابات عام 2024.
          </Text>
        </VStack>

        <Btn
          type="solid"
          borderRadius="50px"
          iconPlacment="right"
          bg="#318973"
          color="#fff"
          fontSize="17px"
          onClick={()=> onOpen()}
          // onClick={add.onOpen}
          padding="20px 25px"
          mb="auto"
          icon={<FaPlus />}
        >
          <Text>اضافة مهام</Text>
        </Btn>
      </HStack>

      <Grid
        templateColumns={"repeat(4, 1fr) 150px"}
        templateRows="repeat(2, 1fr)"
        mt="20px"
        gap="16px"
        w="100%"
      >
        <Filters
          handleSearch={handleSearch}
          onReset={onReset}
          control={control}
          errors={errors}
          reset={reset}
          register={register}
          isDirty={isDirty}
        />
      </Grid>
      <AUTaskModal
      isOpen={isOpen}
      onClose={onClose}
      onSuccess={()=> onSuccessAdd()}
      />
      
    </VStack>
  );
};

export default TasksFilterSection;
