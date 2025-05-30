import { useState } from "react";
import AlertModal from "./AlertModal";
import ConfirmModal from "./ConfirmModal";

export default function ModalUsage() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="p-6">
      <button onClick={() => setAlertOpen(true)} className="btn bg-red-500 text-white px-4 py-2 rounded-xl">
        Show Alert
      </button>
      <button onClick={() => setConfirmOpen(true)} className="btn ml-4 bg-blue-600 text-white px-4 py-2 rounded-xl">
        Show Confirm
      </button>

      <AlertModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        title="Something went wrong"
        message="Unable to delete the item."
      />

      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => console.log("Confirmed")}
        message="This action cannot be undone."
      />
    </div>
  );
}
