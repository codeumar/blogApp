import React, { useEffect, useState } from "react";
import Modal from "react-modal";

const EditModal = ({ isOpen, closeModal, currpost }) => {
  const [updatedtitle, setUpdateTitle] = useState(String(currpost.title));
  const [updatedbody, setUpdatebody] = useState(String(currpost.body));
  
  
  useEffect(() => {
    setUpdateTitle(String(currpost.title))
    setUpdatebody(String(currpost.body))
    console.log("in side use effect");
  },[currpost   ])
  

  const updatePost = () => {
    // Find the index of the post with the specified id
    const data = JSON.parse(localStorage.getItem("blogs"));
    const postIndex = data.findIndex((post) => post.id === currpost.id);

    if (postIndex !== -1) {
      // Create a copy of the posts array
      const updatedPosts = [...data];
      console.log(updatedtitle);
      // Update the title and body of the post at the found index
      updatedPosts[postIndex] = {
        ...updatedPosts[postIndex],
        title: updatedtitle,
        body: updatedbody,
      };
      // Set the state with the updated posts array
      localStorage.setItem("blogs", JSON.stringify(updatedPosts));
      closeModal();
    }
  };
  // const  Edit=()=>{
  //     const data=JSON.parse(localStorage.getItem("blogs"));
  //     const updatedArray = data.filter((item) => item.id !== id);
  //     localStorage.setItem("blogs",JSON.stringify(updatedArray));
  //     console.log(updatedArray);
  //     closeModal()
  // }
  const setUpdatedtitle = (e) => {
    setUpdateTitle(e.target.value);
  };
  const setUpdatedBody = (e) => {
    setUpdatebody(e.target.value);
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={modalStyles}
      contentLabel="Delete Modal"
    >
      <h4>Edit this post?</h4>
      <input type="text" value={updatedtitle} onChange={setUpdatedtitle} />
      <input type="text" value={updatedbody} onChange={setUpdatedBody} />
      <div style={buttonContainer}>
        <button style={yesButton} onClick={updatePost}>
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
    maxWidth: "500px",
    margin: "auto",
    padding: "20px",
    borderRadius: "8px",
    height: "400px", // Set the desired height of the modal here
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

export default EditModal;
