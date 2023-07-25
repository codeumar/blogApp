import "./App.css";
import React, { useState } from "react";
import Login from "./ui/Login";
import Signup from "./ui/Signup";
import Home from "./ui/Home";
import Navbar from "./Components/Navbar";
 import ProtectedRoutes from "./Services/ProtectedRoutes";
 

import { Route, Routes } from "react-router-dom";
import PageNotFound from "./ui/PageNotFound";

export default function App() {
  const [currUser, setUser] = useState([]);

  const setUserState = (e) => {
    setUser(e);
  };
  return (
    <>
      <Navbar user={currUser} />

      <Routes>
        <Route
          path="/login"
          element={<Login user={currUser} state={setUserState} />}
        />
        <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home user={currUser} />} />
        {/* <Route path="/" element={<ProtectedRoutes user={currUser} />}></Route> */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
