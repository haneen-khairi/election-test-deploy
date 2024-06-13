import { InfoError } from "@assets/icons";
import { IoIosEye, IoMdEyeOff } from "react-icons/io";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input as ChakraInput,
  Box,
  HTMLChakraProps,
} from "@chakra-ui/react";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props extends HTMLChakraProps<"div"> {
  label?: string;
  type: "text" | "password" | "time" | "date" | "number";
  placeholder?: string;
  register?: UseFormRegisterReturn;
  error?: string;
  dir?: "ltr" | "rtl";
}

const Input = ({
  label,
  type,
  error,
  placeholder,
  register,
  dir,
  ...rest
}: Props) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl isInvalid={error ? true : false}>
      {label && (
        <FormLabel fontSize="14px" fontWeight={600}>
          {label}
        </FormLabel>
      )}

      <Box pos="relative">
        <ChakraInput
          type={type === "password" ? (show ? "text" : "password") : type}
          placeholder={placeholder}
          focusBorderColor={error ? "danger.200" : "primary.200"}
          errorBorderColor="danger.200"
          fontSize="15px"
          border="1px solid #E4E4E4"
          dir={dir ? dir : "rtl"}
          textAlign="right"
          h="50px"
          rounded="8px"
          {...register}
          {...rest}
        />

        {/* eye */}
        {type === "password" ? (
          <Box
            onClick={() => handleClick()}
            pos="absolute"
            top="4"
            left="4"
            cursor="pointer"
            zIndex={9}
            color="primary.500"
            fontSize="20px"
          >
            {!show ? <IoIosEye /> : <IoMdEyeOff />}
          </Box>
        ) : (
          ""
        )}
        {/* eye */}
      </Box>

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

export default Input;
