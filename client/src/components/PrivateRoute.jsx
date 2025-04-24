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
// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// const PrivateRoute = ({ children }) => {
//   const token = useSelector((state) => state.auth.token);
//   return token ? children : <Navigate to="/login" />;
// };

// export default PrivateRoute;


// import { Navigate } from "react-router-dom";
// import React from "react";
// export default function ProtectedRoute({ children }) {
//   const isFirstVisit = !localStorage.getItem("visited");
//   const token = localStorage.getItem("token");

//   localStorage.setItem("visited", "true"); // mark visited

//   if (!token && isFirstVisit) {
//     return <Navigate to="/register" />;
//   } else if (!token) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// }

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


