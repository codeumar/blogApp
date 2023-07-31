import React from "react";
import Modal from "react-modal";

const DeleteModal = ({ isOpen, closeModal ,id}) => {
    const  deletePost=()=>{
        //const data=JSON.parse(localStorage.getItem("blogs"));
        const updatedArray = id.filter((item) => item.id !== id);
        localStorage.setItem("blogs",JSON.stringify(updatedArray));
        console.log(updatedArray);
        closeModal()
    }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="react-modal__overlay react-modal__content"
      contentLabel="Delete Modal"
    >
      <h4>Are you sure you want to delete this post?</h4>
      
      <div className='button-container'>
        <button className="yes-button"  onClick={deletePost}>
          Yes
        </button>
        <button className="no-button" onClick={closeModal}>
          No
        </button>
      </div>
    </Modal>
  );
};


export default DeleteModal;
