import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthButton = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.isAuthenticated) {
    return (
      <Link className="btn btn-primary me-3" to="/login">
        Login
      </Link>
    );
  }

  const logout = () => {
    auth.signout().then(() => navigate("/login"));
  };

  return (
    <div className="text-black">
      Welcome! {auth.user.name}
      <button className="btn btn-primary ms-3" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default AuthButton;
