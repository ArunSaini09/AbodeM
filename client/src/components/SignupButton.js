import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignUpButton = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.isAuthenticated) {
    return (
      <Link className="btn btn-primary me-1" to="/signup">
        Sign Up
      </Link>
    );
  }
  //if user is authenticated do not render the signup button
  return (
    <>
    </>
  )
  /* const logout = () => {
    auth.signout().then(() => navigate("/"));
  };

  return (
    <div className="text-white">
      Welcome! {auth.user.firstName}
      <button className="btn btn-primary" onClick={logout}>
        Logout
      </button>
    </div>
  ); */
};

export default SignUpButton;