import { HelpCircle } from "lucide-react";
import Modal from "./Modal";
import { useGlobalContext } from "../contexts/GlobalContext";
import Loader from "./Loader";

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
};

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message,
  confirmText = "Yes",
  cancelText = "Cancel",
  loading = false
}: ConfirmModalProps) {
  const { themeColor } = useGlobalContext();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center space-y-2">
        <HelpCircle
          className="mx-auto"
          size={40}
          style={{
            color: themeColor
          }}
        />
        <h2 className="text-lg font-semibold text-main-text">{title}</h2>
        <p className="text-sm text-secondary-text">{message}</p>
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={onClose}
            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            style={{
              backgroundColor: loading ? "gray" : themeColor
            }}
            className="rounded-xl px-4 py-2 font-medium text-white text-sm cursor-pointer"
          >
            {
              loading ? <Loader text="" className="" loaderStyle="h-4 h-4"/> : confirmText
            }
          </button>
        </div>
      </div>
    </Modal>
  );
}
