/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { InputSelect } from "@components/core";
import { useGetManadeebDropDown } from "@services/hooks/dropdown/useDropDown";
import { useState } from "react";

interface Props {
  value: unknown;
  onChange: (value: unknown) => void;
  error?: string;
}
const RepresentativesNameSelect = ({ value, onChange, error }: Props) => {
  const [_search, setSearch] = useState<string>();
  const { data, isFetching } = useGetManadeebDropDown("4");
  // const [isFetchingNextPage, setIsFetchingNextPage] = useState<boolean>(false);
  // const sentinelRef = useRef(null);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
  //         setIsFetchingNextPage(true);
  //         fetchNextPage().then(() => {
  //           setIsFetchingNextPage(false);
  //         });
  //       }
  //     },
  //     { threshold: 1.0 },
  //   );

  //   if (sentinelRef.current) {
  //     observer.observe(sentinelRef.current);
  //   }

  //   return () => {
  //     if (sentinelRef.current) {
  //       observer.unobserve(sentinelRef.current);
  //     }
  //   };
  // }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // const options = data?.pages.flatMap((page) => page.data);

  return (
    <InputSelect
      loading={isFetching}
      options={
        data?.data.map((item) => ({
          label: item.name,
          value: item.id,
        })) || []
      }
      // options={
      //   options
      //     ? options?.map((el) => ({
      //         label: el.name || "",
      //         value: el.name?.toString() || "",
      //       }))
      //     : []
      // }
      multi={false}
      placeholder="اسم المندوب"
      value={value}
      error={error}
      onChange={onChange}
      // onMenuScrollBottom={() => fetchNextPage()}
      onSearch={setSearch}
    />
  );
};

export default RepresentativesNameSelect;
