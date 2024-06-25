import { InputSelect } from "@components/core";
import { useGetplaceOfResidenceDropdown, useGetTypesOfTasks } from "@services/hooks/dropdown/useDropDown";
import { useGetTakTypes } from "@services/hooks/tasks/useTasks";
import { useEffect, useRef, useState } from "react";

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
  multi = false,
  label,
  placeholder,
}: Props) => {
//   const [search, setSearch] = useState<string>();
  const { data: taskTypes, isLoading: istasktypesloading } = useGetTakTypes();
  // console.log("🚀 ~ taskTypes:", taskTypes)

//   const { data, fetchNextPage, hasNextPage, isFetching } =
//   useGetTypesOfTasks(search);
//   const [isFetchingNextPage, setIsFetchingNextPage] = useState<boolean>(false);
//   const sentinelRef = useRef(null);
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
//           setIsFetchingNextPage(true);
//           fetchNextPage().then(() => {
//             setIsFetchingNextPage(false);
//           });
//         }
//       },
//       { threshold: 1.0 },
//     );

//     if (sentinelRef.current) {
//       observer.observe(sentinelRef.current);
//     }

//     return () => {
//       if (sentinelRef.current) {
//         observer.unobserve(sentinelRef.current);
//       }
//     };
//   }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

//   const options = taskTypes?.flatMap((page) => page.data);
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
    //   onMenuScrollBottom={() => fetchNextPage()}
    //   onSearch={setSearch}
      label={label}
    />
  );
};

export default TypeOfTasks;
