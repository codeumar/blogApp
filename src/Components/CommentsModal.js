import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { v4 as uuid } from 'uuid';

const CommentsModal = ({ isOpen, closeModal, commentPostData }) => {
  const [postId, setPostId] = useState("");
  const [commentBody, SetCommentBody] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setPostId(String(commentPostData.id));
  }, [commentPostData]);
  useEffect(() => {
    const commentData = JSON.parse(localStorage.getItem("blogs")) || [];
    const post = commentData.find((element) => {
      return element.id === postId;
    });

    if (post) {
      setCommentsList(post.comments);
    } else {
      setCommentsList([]);
    }
  }, [postId]);
  const addComment = () => {
    if (postId.trim() !== "") {
      const commentData = JSON.parse(localStorage.getItem("blogs"));
      const curruser = localStorage.getItem("loggedUserID");

      const commentObj = {
        id: uuid(),
        body: commentBody,
        userid: curruser,
        postId: postId,
      };

      commentData.map((element) => {
        if (element.id == postId) {
          element.comments.push(commentObj);
        }
      });

      localStorage.setItem("blogs", JSON.stringify(commentData));
      navigate("/");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="modal-container"
      contentLabel="Example Modal"
    >
      <h1>Edit Comments</h1>

      
      <input
        type="text"
        value={commentBody}
        className="comment-input"
        onChange={(e) => SetCommentBody(e.target.value)}
        placeholder="Write your comment..."
      />

      
      <button className="add-comment-button" onClick={addComment}>
        Add Comment
      </button>

      
      <div className="comment-list-container">
        <h2>Comments</h2>
        <ul className="comment-list">
          {commentsList.length > 0 ? (
            commentsList.map((comment) => (
              <li key={comment.id} className="comment-item">
                {comment.body}
              </li>
            ))
          ) : (
            <>
              <div>
                {" "}
                <h1> No Comments</h1>
              </div>
            </>
          )}
        </ul>
      </div>

      <button className="close-button" onClick={closeModal}>
        Close
      </button>
    </Modal>
  );
};
export default CommentsModal;
