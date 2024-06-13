import { InfoError } from "@assets/icons";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/react";

import { GroupBase, OptionBase, Select } from "chakra-react-select";
import { CSSProperties } from "react";

// import { UseFormRegisterReturn } from "react-hook-form";

interface Options extends OptionBase {
  label: string;
  value: unknown;
}
interface Props {
  label?: string;
  options: Options[];
  error?: string;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  onChange: (phone: unknown) => void;
  onMenuScrollBottom?: () => void;
  onSearch?: (text: string | undefined) => void;
  multi: boolean;
  loading?: boolean;
  size?: "lg" | "sm";
}

const InputSelect = ({
  options,
  label,
  placeholder,
  value,
  onChange,
  onMenuScrollBottom,
  onSearch,
  error,
  multi,
  loading,
  size = "sm",
}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chakraStyles: any = {
    control: (provided: CSSProperties) => ({
      ...provided,
      borderRadius: "8px",
      minHight: "40px",
      padding: size === "sm" ? (multi ? "6px 0" : "8px 0") : "10px 0",
      bg: "white",
      borderColor: "#E4E4E4",
    }),
    placeholder: (provided: CSSProperties) => ({
      ...provided,
      color: value ? "black" : "#718096",
    }),
    multiValue: (provided: CSSProperties) => ({
      ...provided,
      borderRadius: "10px",
      padding: "5px 10px",
      backgroundColor: "transparent",
      border: "1px solid #718096",
      margin: "3px 2px",
      color: "#4A5568",
    }),
  };

  let foundOption;

  if (multi) {
    foundOption = options?.filter((option) => value?.includes(option.value));
  }

  return (
    <FormControl isInvalid={error ? true : false}>
      {label && (
        <FormLabel color="mLabelColor" fontWeight="600" fontSize="14px">
          {label}
        </FormLabel>
      )}

      <Select<Options, true, GroupBase<Options>>
        options={options ? options : []}
        isMulti={multi ? true : undefined}
        isLoading={loading ? true : false}
        useBasicStyles
        placeholder={value ? value : placeholder}
        focusBorderColor={error ? "danger.200" : "primary.200"}
        isInvalid={error ? true : false}
        errorBorderColor="danger.200"
        value={
          multi
            ? foundOption
            : options.find((option) => option.value === value) || value
        }
        onChange={(data) => {
          multi
            ? onChange(data.map((option) => option.value))
            : onChange((data as unknown as Options).value);
        }}
        onInputChange={onSearch && ((e) => onSearch(e))}
        chakraStyles={chakraStyles}
        onMenuScrollToBottom={onMenuScrollBottom}
        loadingMessage={() => "الرجاء الإنتظار"}
        noOptionsMessage={() => "لا يوجد بيانات"}
      />

      {error && (
        <FormHelperText
          display="flex"
          alignItems="center"
          textAlign="start"
          gap="6px"
          color="danger.200"
        >
          <InfoError /> {error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default InputSelect;
