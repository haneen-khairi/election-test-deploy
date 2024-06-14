/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputSelect } from "@components/core";
import { GetDropDown } from "@services/hooks/dropdown/DropDown";
import { ListPageinated } from "@services/structure";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

interface Props {
  value: unknown;
  onChange: (value: unknown) => void;
  dropDownObj: UseInfiniteQueryResult<
    InfiniteData<ListPageinated<GetDropDown>, unknown>,
    Error
  >;
  error?: string;
  setSearch: any;
}
const CentersSelect = ({
  value,
  onChange,
  error,
  dropDownObj,
  setSearch,
}: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetching } = dropDownObj;

  const [isFetchingNextPage, setIsFetchingNextPage] = useState<boolean>(false);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          setIsFetchingNextPage(true);
          fetchNextPage().then(() => {
            setIsFetchingNextPage(false);
          });
        }
      },
      { threshold: 1.0 },
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const options = data?.pages.flatMap((page) => page.data);
  return (
    <InputSelect
      loading={isFetching}
      options={
        options
          ? options?.map((el) => ({
              label: el.name || "",
              value: el.name?.toString() || "",
            }))
          : []
      }
      multi={false}
      placeholder="مركز الأقتراع"
      onChange={onChange}
      error={error}
      value={value}
      onMenuScrollBottom={() => fetchNextPage()}
      onSearch={setSearch}
    />
  );
};

export default CentersSelect;
