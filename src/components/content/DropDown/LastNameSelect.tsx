import { InputSelect } from "@components/core";
import { useGetLastNameDropdown } from "@services/hooks/dropdown/useDropDown";
import { useEffect, useRef, useState } from "react";

interface Props {
  value: unknown;
  onChange: (value: unknown) => void;
  error?: string;
}

const MiddleNameSelect = ({ value, onChange, error }: Props) => {
  const [search, setSearch] = useState<string>();
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useGetLastNameDropdown(search);
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
      { threshold: 1.0 }
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
      placeholder="إسم العائلة"
      onChange={onChange}
      error={error}
      value={value}
      onMenuScrollBottom={() => fetchNextPage()}
      onSearch={setSearch}
    />
  );
};

export default MiddleNameSelect;
