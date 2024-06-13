import { InputSelect } from "@components/core";
import { useGetplaceOfResidenceDropdown } from "@services/hooks/dropdown/useDropDown";
import { useEffect, useRef, useState } from "react";

interface Props {
  value: unknown;
  onChange: (value: unknown) => void;
  error?: string;
  multi?: boolean;
  label?: string;
}
const PlaceOfResidenceSelect = ({
  value,
  onChange,
  error,
  multi = false,
  label,
}: Props) => {
  const [search, setSearch] = useState<string>();
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useGetplaceOfResidenceDropdown(search);
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
              value: el.id?.toString() || "",
            }))
          : []
      }
      multi={multi}
      placeholder={"مكان الإقامة"}
      value={value}
      error={error}
      onChange={onChange}
      onMenuScrollBottom={() => fetchNextPage()}
      onSearch={setSearch}
      label={label}
    />
  );
};

export default PlaceOfResidenceSelect;
