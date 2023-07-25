import React, { useEffect, useState } from "react";
import CreateBlog from "../Components/CreateBlog";
import CommentsModal from "../Components/CommentsModal";
import DeleteModal from "../Components/DeleteModal";
import EditModal from "../Components/EditModal";

export default function Home() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]); // all previous blogs postes in array in lcoal storage
  useEffect(() => {
    const storedData = localStorage.getItem("blogs");
    if (storedData) {
      setData2(JSON.parse(storedData));
    }
  }, []);
  const [Alldata, setAllData] = useState([]);
  const [postid, setpostid] = useState("");
  const [currentpost, setcurrentpost] = useState("");

  const [commentModalIsOpen, setCommentModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [EditModalIsOpen, setEditModalIsOpen] = useState(false);

  const loggedUserID = localStorage.getItem("loggedUserID") ?? "";

  const clodeEditModal = () => {
    setEditModalIsOpen(false);
  };
  const clodeDeleteModal = () => {
    setDeleteModalIsOpen(false);
  };
  const openCommentModal = () => {
    setCommentModalIsOpen(true);
  };

  const closeCommentModal = () => {
    setCommentModalIsOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Alldata = JSON.parse(localStorage.getItem("blogs"));
        setAllData(Alldata);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts`
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loggedUserID ? <CreateBlog data={data2} fun={setData2}  savedata={setAllData} /> : <></>}

      <CommentsModal
        isOpen={commentModalIsOpen}
        closeModal={closeCommentModal}
      />
      <DeleteModal
        isOpen={deleteModalIsOpen}
        closeModal={clodeDeleteModal}
        id={postid}
      />
      <EditModal isOpen={EditModalIsOpen} closeModal={clodeEditModal}  currpost={currentpost}/>

      <div style={styles.container}>
        <ul>
          {Alldata.map((item) => (
            <div style={styles.container}>
              <h1 key={item.userId}></h1>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <div className="btn-group btn-group-toggle">
                {item.userId == loggedUserID ? (
                  <>
                    <i
                      className="bi bi-trash ms-5"
                      onClick={() => {
                        setDeleteModalIsOpen(true);
                        setpostid(item.id);
                      }}
                    ></i>{" "}
                    Delete
                  </>
                ) : (
                  <></>
                )}
                <i
                  className="bi bi-card-text ms-5"
                  onClick={openCommentModal}
                ></i>{" "}
                Comment
                {item.userId == loggedUserID ? (
                  <>
                    <i className="bi bi-pencil-square ms-5" onClick={() => {
                        setEditModalIsOpen(true);
                        setcurrentpost(item);
                      }}>
                        Edit
                        </i> 
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ))}
        </ul>

        <ul>
          {data.map((item) => (
            <div style={styles.container}>
              <h1 key={item.userId}></h1>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <div className="btn-group btn-group-toggle">
                {item.userId == loggedUserID ? (
                  <>
                    <i className="bi bi-trash ms-5"></i> Delete
                  </>
                ) : (
                  <></>
                )}
                <i className="bi bi-card-text ms-5" onClick={openCommentModal}>
                  Comment
                </i>
                {item.userId == loggedUserID ? (
                  <>
                    <i className="bi bi-pencil-square ms-5"></i> Edit
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ))}
        </ul>
      </div>
    </>
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
