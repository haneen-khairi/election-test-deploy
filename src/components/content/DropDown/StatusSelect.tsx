import { InputSelect } from "@components/core";

interface Props {
  value: unknown;
  onChange: (value: unknown) => void;
  error?: string;
}

const StatusSelect = ({ value, onChange, error }: Props) => {
  const options = [
    {
      label: "100%",
      value: "100",
    },
    {
      label: "80%",
      value: "80",
    },
    {
      label: "60%",
      value: "60",
    },
    {
      label: "40%",
      value: "40",
    },
    {
      label: "20%",
      value: "20",
    },
    {
      label: "0%",
      value: "0",
    },
  ];

  return (
    <InputSelect
      options={options}
      multi={false}
      placeholder="نسبة الضمان"
      onChange={onChange}
      error={error}
      value={value}
    />
  );
};

export default StatusSelect;
