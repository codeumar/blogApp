import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {

  const navigate = useNavigate();
  const isLoggedIn = JSON.parse(localStorage.getItem("loggedin")) ?? false;
  const signOutClickHandler=()=>{
    localStorage.setItem("loggedin",false);
    navigate("/");
  }
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">
        {props.user?
        <>
        Welcome <b>
        {props.user}
        </b> </>:
        <>Blog</>
        }
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        
        {isLoggedIn ? (
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" onClick={signOutClickHandler}>
                  Signout
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Login
                </a>
                <li className="nav-item">
                  <a className="nav-link" href="/signup">
                    Signup
                  </a>
                </li>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
