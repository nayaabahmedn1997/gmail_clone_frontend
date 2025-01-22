import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check if the token exists (replace this logic with your own auth check)
  const token = localStorage.getItem("token-url");

  if (!token) {
    // Redirect to login if the token is not present
    return <Navigate to="/login" replace />;
  }

  // Render the protected component if the token exists
  return children;
};

export default ProtectedRoute;