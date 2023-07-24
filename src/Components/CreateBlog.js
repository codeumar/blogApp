import React, { useState } from "react";
export default function CreateBlog() {
  const [DescriptionText, setDescriptionText] = useState("");
  const [TitleText, setTitleText] = useState("");
  const setPostTitleText = (event) => {
    setTitleText(event.target.value);
  };
  const DescriptionHandleInputChange = (event) => {
    setDescriptionText(event.target.value);
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
        placeholder="Write here -- Todays Toughts..."
        onChange={DescriptionHandleInputChange}
        style={styles.input}
      />
      <button type="Submit" className="btn btn-primary">
        {" "}
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
