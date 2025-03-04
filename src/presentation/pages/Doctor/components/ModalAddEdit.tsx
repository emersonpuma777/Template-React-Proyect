import { Modal } from "@components/misc/Modal";
import { DoctorParser } from "@infrastructure/models/doctor";
import DoctorForm from "./DoctorForm";

interface ModalAddEditProps {
  onClose: (e: boolean) => void;
  onRefresh: () => void;
  doctorCurrent?: DoctorParser | null;
}

const ModalAddEdit = ({
  onClose,
  doctorCurrent,
  onRefresh,
}: ModalAddEditProps) => {
  return (
    <Modal
      onClose={onClose}
      title={doctorCurrent ? "Edit Doctor" : "Add Doctor"}
    >
      <DoctorForm
        onClose={onClose}
        doctorCurrent={doctorCurrent}
        onRefresh={onRefresh}
      />
    </Modal>
  );
};

export default ModalAddEdit;
