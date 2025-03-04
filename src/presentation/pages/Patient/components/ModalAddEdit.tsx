import { Modal } from "@components/misc/Modal";
import { PatientParser } from "@infrastructure/models/patient";
import PatientForm from "./PatientForm";

interface ModalAddEditProps {
  onClose: (e: boolean) => void;
  onRefresh: () => void;
  current?: PatientParser | null;
}

const ModalAddEdit = ({ onClose, current, onRefresh }: ModalAddEditProps) => {
  return (
    <Modal onClose={onClose} title={current ? "Edit Patient" : "Add Patient"}>
      <PatientForm onClose={onClose} current={current} onRefresh={onRefresh} />
    </Modal>
  );
};

export default ModalAddEdit;
