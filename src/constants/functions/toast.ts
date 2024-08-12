import { useToast } from "@chakra-ui/react";

export const EToast = ({
  toast,
  title,
  description,
  status,
}: {
  toast: ReturnType<typeof useToast>;
  title: string;
  description?: string | null;
  status: "info" | "warning" | "success" | "error" | "loading";
}) => {
  return toast({
    title,
    description,
    status,
    duration: 3000,
    isClosable: true,
    position: "bottom-left",
  });
};
