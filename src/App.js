import "./App.css";
import React, { useState } from "react";
import Login from "./ui/Login";
import Signup from "./ui/Signup";
import Home from "./ui/Home";
import Navbar from "./Components/Navbar";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./ui/PageNotFound";
import ProtectedRoutes from "./Services/ProtectedRoutes";

export default function App() {
  const [currUser, setUser] = useState(null);

  const setUserState = (e) => {
    setUser(e);
    console.log(currUser);
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
        <Route path="/home" element={<Home userId={currUser} />} />
        {/* <Route path="/" element={<ProtectedRoutes userId={currUser} />}></Route> */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
