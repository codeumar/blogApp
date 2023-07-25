import React from "react";
import Modal from "react-modal";

const CommentsModal = ({ isOpen, closeModal }) => {


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={modalStyles}
      contentLabel="Example Modal"
    >
      
      <button onClick={closeModal}>Close Modal</button>
    </Modal>
  );
};

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  content: {
    maxWidth: "800px",
    margin: "auto",
    padding: "20px",
    borderRadius: "8px",
  },
};

export default CommentsModal;
