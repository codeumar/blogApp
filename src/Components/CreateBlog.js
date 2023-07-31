import React, { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';
export default function CreateBlog(props) {
  const commingdata = props.data;

  const [TitleText, setTitleText] = useState("");
  const [DescriptionText, setDescriptionText] = useState("");
  const loggedUserID = localStorage.getItem("loggedUserID") ?? "";
  const setPostTitleText = (e) => {
    setTitleText(e.target.value);
  };

  const descriptionHandleInputChange = (e) => {
    setDescriptionText(e.target.value);
  };

  const saveBlog = () => {
    const blogObj = {
      userId: loggedUserID,
      id: uuid(),
      title: TitleText,
      body: DescriptionText,
      comments: [],
    };
    if (TitleText == "" || DescriptionText == "") {
      alert("All field are required");
    } else {
      const updatedArray = [blogObj, ...commingdata];
      localStorage.setItem("blogs", JSON.stringify(updatedArray));
      props.fun(updatedArray);
    }
  };
  
  return (
    <div style={styles.container}>
      <h2>Create Post</h2>
      <input
        type="text"
        value={TitleText}
        placeholder="Title..."
        onChange={setPostTitleText}
        style={styles.input}
      />
      <input
        type="text"
        value={DescriptionText}
        placeholder="Write here -- Today's Thoughts..."
        onChange={descriptionHandleInputChange}
        style={styles.input}
      />
      <button
        type="Submit"
        className="btn btn-primary"
        onClick={saveBlog}
        style={styles.button}
      >
        Submit
      </button>
    </div>
  );
}
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "30px",
    maxWidth: "800px",
    margin: "50px auto",
  },
  input: {
    width: "100%",
    padding: "10px",
    height: "100%",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
};
