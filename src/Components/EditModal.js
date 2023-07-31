import React, { useEffect, useState } from "react";
import Modal from "react-modal";

const EditModal = ({ isOpen, closeModal, currpost}) => {
  const [updatedtitle, setUpdateTitle] = useState(String(currpost.title));
  const [updatedbody, setUpdatebody] = useState(String(currpost.body));

  useEffect(() => {
    setUpdateTitle(String(currpost.title));
    setUpdatebody(String(currpost.body));
  }, [currpost]);

  const updatePost = () => {
    const data = JSON.parse(localStorage.getItem("blogs"));
    const postIndex = data.findIndex((post) => post.id === currpost.id);

    if (postIndex !== -1) {
      const updatedPosts = [...data];

      updatedPosts[postIndex] = {
        ...updatedPosts[postIndex],
        title: updatedtitle,
        body: updatedbody,
      };

      localStorage.setItem("blogs", JSON.stringify(updatedPosts));
      closeModal();
    }
  };

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
      className="react-modal__overlay react-modal__content"
      contentLabel="Delete Modal"
    >
      <h4>Edit this post?</h4>
      <input
        type="text"
        value={updatedtitle}
        onChange={setUpdatedtitle}
        className="input"
        placeholder="Enter the updated title"
      />
      <input
        type="text"
        value={updatedbody}
        onChange={setUpdatedBody}
        className="input"
        placeholder="Enter the updated body"
      />
      <div className="button-container">
        <button className="yes-button" onClick={updatePost}>
          Yes
        </button>
        <button className="no-button" onClick={closeModal}>
          No
        </button>
      </div>
    </Modal>
  );
};

export default EditModal;
