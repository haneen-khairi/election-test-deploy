/* eslint-disable @typescript-eslint/no-explicit-any */
import { InfoError } from "@assets/icons";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/react";

import { GroupBase, OptionBase, Select } from "chakra-react-select";
import { CSSProperties, useState, useEffect } from "react";

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
  onChange: (value: unknown) => void;
  onMenuScrollBottom?: () => void;
  onSearch?: (text: string | undefined) => void;
  multi?: boolean;
  loading?: boolean;
  isDisabled?: boolean;
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
  multi = false,
  loading,
  size = "sm",
  isDisabled = false,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [filteredOptions, setFilteredOptions] = useState<Options[]>(options);

  useEffect(() => {
    if (searchTerm) {
      const lowercasedFilter = searchTerm.toLowerCase();
      const filtered = options.filter((option) =>
        option.label.toLowerCase().includes(lowercasedFilter),
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [searchTerm, options]);

  const selectedOptions = multi
    ? options.filter((option) => value?.includes(option.value))
    : [];

  const displayedOptions = multi
    ? [
        ...selectedOptions,
        ...filteredOptions.filter((option) => !value?.includes(option.value)),
      ]
    : filteredOptions;

  const chakraStyles: any = {
    control: (provided: CSSProperties) => ({
      ...provided,
      borderRadius: "8px",
      minHeight: "40px",
      padding: size === "sm" ? (multi ? "6px 0" : "8px 0") : "10px 0",
      background: "white",
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

  const nullOption = {
    label: "إختر واحدا ...",
    value: "إختر واحدا ...",
  };

  return (
    <FormControl isInvalid={!!error}>
      {label && (
        <FormLabel color="mLabelColor" fontWeight="600" fontSize="14px">
          {label}
        </FormLabel>
      )}

      <Select<Options, true, GroupBase<Options>>
        options={
          multi
            ? displayedOptions
            : [...(options?.length ? [nullOption] : []), ...options]
        }
        isMulti={multi ? true : undefined}
        isLoading={!!loading}
        useBasicStyles
        placeholder={value ? value : placeholder}
        focusBorderColor={error ? "danger.200" : "primary.200"}
        isInvalid={!!error}
        errorBorderColor="danger.200"
        value={
          multi
            ? selectedOptions
            : options.find((option) => option.value === value) || value
        }
        onChange={(data) => {
          if (multi) {
            onChange(data.map((option: Options) => option.value));
          } else {
            onChange((data as unknown as Options).value);
          }
        }}
        onInputChange={(e) => {
          setSearchTerm(e);
          onSearch && onSearch(e);
        }}
        chakraStyles={chakraStyles}
        onMenuScrollToBottom={onMenuScrollBottom}
        loadingMessage={() => "الرجاء الإنتظار"}
        noOptionsMessage={() => "لا يوجد بيانات"}
        isDisabled={isDisabled}
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
