import { Modal } from "@components/misc/Modal";
import { SpecialtyParser } from "@infrastructure/models/specialty";
import SpecialtyForm from "./SpecialtyForm";

interface ModalAddEditProps {
  onClose: (e: boolean) => void;
  onRefresh: () => void;
  current?: SpecialtyParser | null;
}

const ModalAddEdit = ({ onClose, current, onRefresh }: ModalAddEditProps) => {
  return (
    <Modal
      onClose={onClose}
      title={current ? "Edit Specialty" : "Add Specialty"}
    >
      <SpecialtyForm
        onClose={onClose}
        current={current}
        onRefresh={onRefresh}
      />
    </Modal>
  );
};

export default ModalAddEdit;
