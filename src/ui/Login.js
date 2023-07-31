import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login(props) {
  
  const navigate = useNavigate();
  
  const [emailText, setEmail] = useState("");
  const [passwordText, setPassword] = useState("");
  
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  
  const existingData = JSON.parse(localStorage.getItem("users")) || [];
  function checkEmailInArray(array, emailToCheck) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].email === emailToCheck) {
        return i;

      }
    }
    return -1;
  }
  const clickhandler = (e) => {
    if (emailText === "" || passwordText === "") {
      alert("All Field Are Required");
    } else {
      const index=checkEmailInArray(existingData,emailText);
      
      if (index>=0) {
        if(passwordText==existingData[index].password){
          localStorage.setItem("loggedin",true);
          localStorage.setItem("loggedUserID",existingData[index].id)
          props.state(existingData[index]);
          navigate("/");
        }
        else{
          alert("Invalid Password");
        }
        
      } else {
        alert("Invalid Email..!");
      }
    }
    e.preventDefault();
  };
  return (
    <div className="container">
      <form>
        <div>
          <h1>Login Form</h1>
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            value={emailText}
            onChange={emailHandler}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            onChange={passwordHandler}
            value={passwordText}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <div>
          <p>Pelase Fill corrctly..!</p>
        </div>
        <button type="submit" className="btn btn-primary" onClick={clickhandler}>
          Submit
        </button>
        <button
          className="btn btn-primary ms-2"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Signup
        </button>
      </form>
    </div>
  );
}
