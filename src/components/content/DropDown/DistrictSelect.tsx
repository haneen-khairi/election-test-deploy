import { InputSelect } from "@components/core";

interface Props {
  value: unknown;
  onChange: (value: unknown) => void;
  error?: string;
}
const DistrictSelect = ({ value, onChange, error }: Props) => {
  const options = new Array(12).fill(0).map((x, index) => ({
    value: `المنطقة ${index + 1}`,
    label: `المنطقة ${index + 1}`,
  }));

  return (
    <InputSelect
      options={options}
      multi={false}
      placeholder="المنطقة"
      value={value}
      error={error}
      onChange={onChange}
      
    />
  );
};

export default DistrictSelect;
