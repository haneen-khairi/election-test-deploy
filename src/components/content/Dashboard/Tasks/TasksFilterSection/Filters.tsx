/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilerIcon } from "@assets/icons";
import { Box, Text } from "@chakra-ui/react";
import { Btn, Input } from "@components/core";

import {
  Control,
  Controller,
  FieldErrors,
  UseFormReset,
} from "react-hook-form";
import { SlRefresh } from "react-icons/sl";
import TypeOfTasks from "@components/content/DropDown/TypesOfTasks";

const Filters = ({
  control,
  errors,
  reset,
  handleSearch,
  register,
  onReset = () => {}
}: {
  reset: UseFormReset<any>;
  errors: FieldErrors<any>;
  control: Control<any, any>;
  isDirty: boolean;
  handleSearch: () => void;
  register: any,
  onReset : () => void

}) => {
  // const [search, setSearch] = useState("");
  // const dropDownObj = useGetVotingCentersDropdown(search);

  return (
    <>



      <Box flexGrow="1">
        <Input
          type="date"
          placeholder="ادخل التاريخ"
          register={register("date")}
        />
      </Box>
      <Box flexGrow="1">
        <Input
          type="time"
          placeholder="ادخل الوقت"
          register={register("time")}
        />
      </Box>
      <Box>
        <Controller
          control={control}
          name="type_of_tasks"
          render={({ field: { onChange, value } }) => (
            <TypeOfTasks
              onChange={onChange}
              value={value}
              placeholder="نوع المهمة"
              error={errors?.type_of_tasks?.message as string}
              key={value}
            />
          )}
        />
      </Box>
      <Btn
        h="100%"
        type="outlined"
        fontSize="17px"
        color="red"
        border="1px solid red"
        borderColor="red"
        borderRadius="50px"
        icon={<SlRefresh />}
        iconPlacment="right"
        _hover={{
          backgroundColor: "red",
          color: "white",
        }}
        onClick={() => {
          reset();
          onReset()
        }}
      >
        <Text>مسح الكل</Text>
      </Btn>



      <Btn
        h="100%"
        type="solid"
        borderRadius="50px"
        icon={<FilerIcon />}
        iconPlacment="right"
        bg="#318973"
        color="#fff"
        fontSize="17px"
        onClick={handleSearch}
      >
        <Text>فلترة</Text>
      </Btn>
    </>
  );
};

export default Filters;
