import { AlertCircle } from "lucide-react";
import Modal from "./Modal";
import { useGlobalContext } from "../contexts/GlobalContext";

type AlertModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
};

export default function AlertModal({ isOpen, onClose, title = "Alert", message }: AlertModalProps) {
  const {themeColor} = useGlobalContext();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center space-y-2">
        <AlertCircle className="mx-auto" size={40} style={{
          color: themeColor,
        }} />
        <h2 className="text-lg font-semibold text-main-text">{title}</h2>
        <p className="text-secondary-text text-sm">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 w-full rounded-xl px-4 py-2 font-medium text-white text-sm cursor-pointer"
          style={{
            backgroundColor: themeColor,
          }}
        >
          OK
        </button>
      </div>
    </Modal>
  );
}
