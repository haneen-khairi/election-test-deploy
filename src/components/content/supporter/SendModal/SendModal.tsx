/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Popup } from "@components/core";
import { useSendSupporters } from "@services/hooks/voters/useVoters";
import { useParams } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  addedVoters: any[];
  setAddedVoters: any;
}
const SendModal = ({ isOpen, onClose, addedVoters, setAddedVoters }: Props) => {
  const { id } = useParams<{ id: string }>();

  const sendSupporters = useSendSupporters(
    id || "",
    addedVoters.map((item) => item.id),
  );

  const handleSend = () => {
    sendSupporters.mutateAsync().then(() => {});

    setAddedVoters([]);
  };

  handleSend;

  return (
    <Popup title="أرسل الأسماء" size="xs" isOpen={isOpen} onClose={onClose}>
      x
    </Popup>
  );
};

export default SendModal;
