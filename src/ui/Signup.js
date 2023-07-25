import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const [nameText, setName] = useState("");
  const [emailText, setEmail] = useState("");
  const [passwordText, setPassword] = useState("");
  const nameHandler = (event) => {
    setName(event.target.value);
  };
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  function generateUniqueId() {
    const newUniqueId =
      Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

    return newUniqueId;
  }

  const formData = {
    userId: generateUniqueId(),
    name: nameText,
    email: emailText,
    password: passwordText,
  };
  const navigate = useNavigate();
  const existingData = JSON.parse(localStorage.getItem("users")) || [];
  function checkEmailInArray(array, emailToCheck) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].email === emailToCheck) {
        return true;
      }
    }
    return false;
  }
  const clickhandler = (e) => {
    if (emailText === "" || nameText === "" || passwordText === "") {
      alert("All Field Are Required");
    } else {
      if (checkEmailInArray(existingData, emailText)) {
        alert("This email Already Exists ");
      } else {
        existingData.push(formData);
        localStorage.setItem("users", JSON.stringify(existingData));
        localStorage.setItem("loggedin", true);
        navigate("/home");
      }
    }
    e.preventDefault();
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="mb-0">Sign Up</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label htmlFor="username">Name</label>
                  <input
                    onChange={nameHandler}
                    type="text"
                    value={nameText}
                    className="form-control"
                    id="username"
                    name="username"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlfor="email">Email</label>
                  <input
                    value={emailText}
                    type="email"
                    onChange={emailHandler}
                    className="form-control"
                    id="email"
                    name="email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlfor="password">Password</label>
                  <input
                    onChange={passwordHandler}
                    type="password"
                    value={passwordText}
                    className="form-control"
                    id="password"
                    name="password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={clickhandler}
                >
                  Sign Up
                </button>
                <button
                  className="btn btn-primary ms-2"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Already have an account?
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
