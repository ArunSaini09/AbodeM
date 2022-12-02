import React from "react";
import { BrowserRouter, Routes, Route, Link, NavLink, Navigate } from "react-router-dom";
import PostsListPage from "./pages/PostsListPage";
import ShowPostPage from "./pages/ShowPostPage";
import AboutUsPage from "./pages/AboutUsPage";
import PropertyForm from "./pages/form/PropertyForm";
import {  AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";
import "./App.css";
import AuthButton from "./components/AuthButton";
import SignUpButton from "./components/SignupButton";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PrivateRouteRequiresAuth from "./components/PrivateRoute";

<<<<<<< HEAD

function Navigation(props) {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark shadow mb-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          AbodeM
        </Link>
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/posts/new">
              Form
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/about-us">
              About Us
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
=======
function Navigation() {
	return (
		<>
			<nav className="navbar navbar-expand-sm navbar-light shadow mb-3">
				<div className="container-fluid">
					<Link className="navbar-brand" to="/">
						AbodeM
					</Link>
					<ul className="navbar-nav me-auto">
						<li className="nav-item">
							<NavLink className="nav-link" to="/posts/new">
								Form
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/about-us">
								About Us
							</NavLink>
						</li>
					</ul>
					<AuthButton/>
					<SignUpButton/>
				</div>
			</nav>
		</>
	);
>>>>>>> deaf891ffdd64ab51a55af37009df52ae4d119fc
}

function App() {

	const auth = useAuth();
	
	return (
		<AuthProvider>
			<BrowserRouter>
				<Navigation isAuthenticated={auth.isAuthenticated}/>
				<div className="container-xl text-center">
					<div className="row justify-content-center">
						<Routes>
							<Route path="/signup" element={<SignUpPage />} />
							<Route path="/login" element={<LoginPage />} />
							<Route path="/posts/new" element={<PrivateRouteRequiresAuth> <PropertyForm /> </PrivateRouteRequiresAuth>} />
							<Route path="/posts/:id" element={<ShowPostPage />} />
							<Route path="/about-us" element={<AboutUsPage />} />
							<Route path="/" element={ <PrivateRouteRequiresAuth> <PostsListPage /> </PrivateRouteRequiresAuth>} />
						</Routes>
					</div>
				</div>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
