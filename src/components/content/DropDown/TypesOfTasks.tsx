import { InputSelect } from "@components/core";
import { useGetTakTypes } from "@services/hooks/tasks/useTasks";

interface Props {
  value: unknown;
  onChange: (value: unknown) => void;
  error?: string;
  multi?: boolean;
  label?: string;
  placeholder?: string;
}
const TypeOfTasks = ({
  value,
  onChange,
  error,
  label,
  placeholder,
}: Props) => {
  const { data: taskTypes, isLoading: istasktypesloading } = useGetTakTypes();

  return (
    <InputSelect
      loading={istasktypesloading}
      options={
        taskTypes?.data
          ? taskTypes?.data?.map((el) => ({
              label: el.name || "",
              value: el.id?.toString() || "",
            }))
          : []
      }
      multi={false}
      placeholder={placeholder || "مكان الإقامة"}
      value={value}
      error={error}
      onChange={onChange}
      label={label}
    />
  );
};

export default TypeOfTasks;
