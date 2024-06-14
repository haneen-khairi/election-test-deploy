import { InputSelect } from "@components/core";

interface Props {
  value: unknown;
  onChange: (value: unknown) => void;
  error?: string;
}
const SortSelect = ({ value, onChange, error }: Props) => {
  const options = new Array(12).fill(0).map((_x, index) => ({
    value: String(index),
    label: String(index),
  }));

  return (
    <InputSelect
      options={options}
      multi={false}
      placeholder="ترتيب "
      value={value}
      error={error}
      onChange={onChange}
    />
  );
};

export default SortSelect;
