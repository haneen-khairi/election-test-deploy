import { InputSelect } from "@components/core";

interface Props {
  value: unknown;
  onChange: (value: unknown) => void;
  error?: string;
}
const ActivitiesPeriodSelect = ({ value, onChange, error }: Props) => {
  const options = [
    { value: "day", label: "يومي" },
    { value: "week", label: "اسبوعي" },
    { value: "month", label: "شهري" },
  ];

  return (
    <InputSelect
      options={options}
      multi={false}
      placeholder="الفترة"
      value={value}
      error={error}
      onChange={onChange}
    />
  );
};

export default ActivitiesPeriodSelect;
