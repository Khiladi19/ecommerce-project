// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// export default function PrivateRoute({ children }) {
//   const { user } = useSelector((state) => state.auth);
//   console.log("user :-",user)

//   // If not logged in, redirect to login
//   if (!user || !user.token) {
//     return <Navigate to="/login" replace />;
//   }

//   // Else allow access
//   return children;
// }

// components/PrivateRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

