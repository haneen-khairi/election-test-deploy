import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { BsPlus } from "react-icons/bs";

interface Props {
  title?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  isClose?: boolean;
  extraHeaderButton?: boolean;
  extraHeaderButtonOnClick?: () => void
}
const Popup = ({
  title,
  children,
  isOpen,
  onClose,
  size = "md",
  extraHeaderButtonOnClick = () => {},
  isClose = true,
  extraHeaderButton = false
}: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent rounded="12px" style={{ position: "relative" }}>
        {title && <ModalHeader dir="rtl">{title} {extraHeaderButton && <Button onClick={extraHeaderButtonOnClick}><BsPlus /> أضافة نوع مهمة جديد</Button>}</ModalHeader>}
        {isClose && (
          <ModalCloseButton position="absolute" left="20px" top="15px" />
        )}
        {title && <Divider />}
        <ModalBody dir="rtl">{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Popup;
