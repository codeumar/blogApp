import React, { useEffect, useState } from "react";
import CreateBlog from "../Components/CreateBlog";

export default function Home(props) {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${itemsPerPage}`
        );
        const jsonData = await response.json();
        setData(jsonData);
        const totalItems = parseInt(response.headers.get("X-Total-Count"));
        setTotalPages(Math.ceil(totalItems / itemsPerPage));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((page) => page - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((page) => page + 1);
  };
  return (
    <>
      
      <CreateBlog />
      <div style={styles.container}>
        <ul>
          {data.map((item) => (
            <div style={styles.container}>
              <h1 key={item.userId}></h1>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </ul>
        <row>
          <button
            className="btn btn-primary p-3 ml-2"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous Page
          </button>
          <button
            className="btn btn-primary p-3 ml-2"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next Page
          </button>
        </row>
        <div></div>
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
