import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthButton = () => {
  const { auth, isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const logout = () => {
    auth.signout().then(() => navigate("/login"));
  };
  if (!JSON.stringify(isAuthenticated)) {
    return (
      <Link className="btn btn-primary me-3" to="/login">
        Login
        <button className="btn btn-primary ms-3" onClick={logout}>
          Logout
        </button>
      </Link>
    );
  }

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
