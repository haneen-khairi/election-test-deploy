/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { InputSelect } from "@components/core";
import { useGetAddIncomeAccounts } from "@services/hooks/expenses/useExpenses";
import { useEffect, useRef, useState } from "react";

interface Props {
  value: unknown;
  onChange: (value: unknown) => void;
  isName?: boolean;
  error?: string;
  label?: string;
  placeholder?: string;
}

const AccountsSelect = ({
  value,
  onChange,
  error,
  label,
  placeholder,
  isName = true,
}: Props) => {
  const [isFetchingNextPage, setIsFetchingNextPage] = useState<boolean>(false);
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useGetAddIncomeAccounts();
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
              value: isName ? el.name?.toString() || "" : el.id?.toString(),
            }))
          : []
      }
      label={label}
      placeholder={placeholder}
      multi={false}
      value={value}
      error={error}
      onChange={onChange}
      onMenuScrollBottom={() => fetchNextPage()}
    />
  );
};

export default AccountsSelect;
