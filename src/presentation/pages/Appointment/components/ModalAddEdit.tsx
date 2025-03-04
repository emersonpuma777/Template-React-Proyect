import { Modal } from "@components/misc/Modal";
import { AppointmentParser } from "@infrastructure/models/appointement";
import AppointmentForm from "./AppointmentForm";

interface ModalAddEditProps {
  onClose: (e: boolean) => void;
  onRefresh: () => void;
  current?: AppointmentParser | null;
}

const ModalAddEdit = ({ onClose, current, onRefresh }: ModalAddEditProps) => {
  return (
    <Modal
      onClose={onClose}
      title={current ? "Edit Appointment" : "Add Appointment"}
    >
      <AppointmentForm
        onClose={onClose}
        current={current}
        onRefresh={onRefresh}
      />
    </Modal>
  );
};

export default ModalAddEdit;
