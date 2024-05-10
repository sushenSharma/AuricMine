import Modal from "@mui/material/Modal";

import "./styles.css";

const ModalContainer = ({ open, handleClose, children, title }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <div className="ledger-modal-body">
        <div className="modal-title">{title}</div>
        {children}
      </div>
    </Modal>
  );
};

export default ModalContainer;
