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
 
  return (
    <InputSelect
      loading={isFetching}
      options={
        data?.data.map((item) => ({
          label: item.name,
          value: item.id,
        })) || []
      }
      multi={false}
      placeholder="اسم المندوب الرئيسي"
      value={value}
      error={error}
      onChange={onChange}
      // onMenuScrollBottom={() => fetchNextPage()}
      onSearch={setSearch}
    />
  );
};

export default RepresentativesNameSelect;
