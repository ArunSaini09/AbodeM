import React from "react";
import { BrowserRouter, Routes, Route, Link, NavLink, Navigate } from "react-router-dom";
import AboutUsPage from "./pages/AboutUsPage";
import {  AuthProvider } from "./context/AuthContext";
import {  HouseDataProvider } from "./context/HouseDataContext";
import { useAuth } from "./context/AuthContext";
import "./App.css";
import AuthButton from "./components/AuthButton";
import SignUpButton from "./components/SignupButton";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PrivateRouteRequiresAuth from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";
import ShowHomePage from "./pages/ShowHomePage";
import PropertyForm from "./pages/form/PropertyForm";

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
}

function App() {
	const auth = useAuth();
	
	return (
		<AuthProvider>
			<BrowserRouter>
				<Navigation isAuthenticated={auth.isAuthenticated}/>
				<HouseDataProvider>
					<div className="container-xl text-center">
						<div className="row justify-content-center">
							<Routes>
								<Route path="/signup" element={<SignUpPage />} />
								<Route path="/login" element={<LoginPage />} />
								<Route path="/posts/new" element={ <PrivateRouteRequiresAuth> <PropertyForm /> </PrivateRouteRequiresAuth> } />
								<Route path="/posts/:id" element={ <ShowHomePage /> } />
								<Route path="/about-us" element={ <AboutUsPage /> } />
								<Route path="/" element={ <HomePage />} />
							</Routes>
						</div>
					</div>
				</HouseDataProvider>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
