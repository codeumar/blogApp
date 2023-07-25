import React from "react";
import Modal from "react-modal";

const DeleteModal = ({ isOpen, closeModal ,id}) => {
    const  deletePost=()=>{
        const data=JSON.parse(localStorage.getItem("blogs"));
        const updatedArray = data.filter((item) => item.id !== id);
        localStorage.setItem("blogs",JSON.stringify(updatedArray));
        console.log(updatedArray);
        closeModal()
    }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={modalStyles}
      contentLabel="Delete Modal"
    >
      <h4>Are you sure you want to delete this post?</h4>
      
      <div style={buttonContainer}>
        <button style={yesButton} onClick={deletePost}>
          Yes
        </button>
        <button style={noButton} onClick={closeModal}>
          No
        </button>
      </div>
    </Modal>
  );
};

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 1000, // Increase the z-index to make sure the modal appears on top of other content
  },
  content: {
    maxWidth: "300px",
    margin: "auto",
    padding: "20px",
    borderRadius: "8px",
    height: "200px", // Set the desired height of the modal here
  },
};

const buttonContainer = {
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
};

const yesButton = {
  backgroundColor: "#dc3545",
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "4px",
  cursor: "pointer",
  marginRight: "10px",
};

const noButton = {
  backgroundColor: "#007bff",
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "4px",
  cursor: "pointer",
};

export default DeleteModal;
