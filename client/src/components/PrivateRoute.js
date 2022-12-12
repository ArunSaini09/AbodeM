import { useAuth } from "../context/AuthContext";
import React, { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

function PrivateRouteRequiresAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();
  const isAuthenticated = useAuth();
  console.log(JSON.stringify(isAuthenticated) + "yes");

  let { recievedAuthenticationResponse, isAuthenticated } = auth;

  useEffect(() => {
    // Perform the authentication check asynchronously.
    if (!recievedAuthenticationResponse) return;
  }, [recievedAuthenticationResponse]);

  return !recievedAuthenticationResponse ? (
    <LoadingSpinner />
  ) : !isAuthenticated ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    children
  );
}

export default PrivateRouteRequiresAuth;
