import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  const hasVisited = localStorage.getItem("visited");

  // First-time visit: redirect to register
  if (!token && !hasVisited) {
    localStorage.setItem("visited", "true");
    return <Navigate to="/register" />;
  }

  // Subsequent visits without token: redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // User is authenticated
  return children;
};

export default PrivateRoute;


