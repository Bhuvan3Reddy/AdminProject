import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'flowbite-react';

interface ConfirmModalProps {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  show,
  onConfirm,
  onCancel,
  title,
  message,
}) => {
  return (
    <Modal
      show={show}
      onClose={onCancel}
      // Center modal content
      className="flex items-center justify-center"
      // Override default width classes
      theme={{
        root: {
          base: 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50',
          show: {
            on: 'flex',
            off: 'hidden',
          },
        },
        content: {
          base: 'relative w-auto max-w-fit p-4',
        },
      }}
    >
      <ModalHeader className="justify-center text-center">{title}</ModalHeader>
      <ModalBody>
        <p className="text-center text-base leading-relaxed text-gray-500 dark:text-gray-400">
          {message}
        </p>
      </ModalBody>
      <ModalFooter className="flex justify-center gap-2">
        <Button color="primary" onClick={onConfirm}>Yes, Confirm</Button>
        <Button color="error" onClick={onCancel}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmModal;
