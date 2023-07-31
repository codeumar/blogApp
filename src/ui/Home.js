import React, { useEffect, useState } from "react";
import CreateBlog from "../Components/CreateBlog";
import CommentsModal from "../Components/CommentsModal";
import DeleteModal from "../Components/DeleteModal";
import EditModal from "../Components/EditModal";
import fetchDataFromApi from "../Services/Api";

export default function Home() {
  const [Alldata, setAllData] = useState([]);
  const [postid, setpostid] = useState("");
  const [currentpost, setcurrentpost] = useState("");
  const [commentPostata, setCommentPostData] = useState("");

  const [commentModalIsOpen, setCommentModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [EditModalIsOpen, setEditModalIsOpen] = useState(false);

  const loggedUserID = localStorage.getItem("loggedUserID") ?? "";

  const clodeEditModal = () => {
    setEditModalIsOpen((value)=>{value=false});
  };
  const clodeDeleteModal = () => {
    setDeleteModalIsOpen((value)=>{value=false});
  };

  const closeCommentModal = () => {
    setCommentModalIsOpen((value)=>{value=false});
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
  }, [commentModalIsOpen]);
  useEffect(() => {
    fetchDataFromApi(setAllData)
  }, []);

  return (
    <>
      {loggedUserID ? (
        <CreateBlog data={Alldata} fun={setAllData} savedata={setAllData} />
      ) : (
        <></>
      )}

      <CommentsModal
        isOpen={commentModalIsOpen}
        closeModal={closeCommentModal}
        commentPostData={commentPostata}
      />
      <DeleteModal
        isOpen={deleteModalIsOpen}
        closeModal={clodeDeleteModal}
        id={Alldata}
      />
      <EditModal
        isOpen={EditModalIsOpen}
        closeModal={clodeEditModal}
        currpost={currentpost}
        alldata={Alldata}
      />

      <div className='inputBox'>
        <ul>
          {Alldata.map((item) => (
            <div className='inputBox'>
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
                    ></i>
                    Delete
                  </>
                ) : (
                  <></>
                )}
                <i
                  className="bi bi-card-text ms-5"
                  onClick={() => {
                    setCommentModalIsOpen(true);
                    setCommentPostData(item);
                  }}
                >
                  Comment
                </i>
                {item.userId == loggedUserID ? (
                  <>
                    <i
                      className="bi bi-pencil-square ms-5"
                      onClick={() => {
                        setEditModalIsOpen(true);
                        setcurrentpost(item);
                      }}
                    >
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

        {/* <ul>
          {data.map((item) => (
            <div style={styles.container}>
              <h1 key={item.userId}></h1>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <div className="btn-group btn-group-toggle">
                {item.userId == loggedUserID ? (
                  <>
                    <i className="bi bi-trash ms-5">Delete</i>
                  </>
                ) : (
                  <></>
                )}
                <i className="bi bi-card-text ms-5">Comment</i>
                {item.userId == loggedUserID ? (
                  <>
                    <i className="bi bi-pencil-square ms-5">Edit</i>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ))}
        </ul> */}
      </div>
    </>
  );
}

