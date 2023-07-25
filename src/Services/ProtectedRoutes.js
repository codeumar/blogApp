import React from 'react'
import { Navigate } from 'react-router-dom';
import Home from '../ui/Home';

export default function ProtectedRoutes(props) {
    const auth=JSON.parse(localStorage.getItem("loggedin")) ?? false;
  return auth? < Navigate to="/home"   /> :<Navigate to={"/login"}/>
}
