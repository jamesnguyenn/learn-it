import React, { useContext } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { auth } = useContext(AuthContext);
  if (auth.authLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
