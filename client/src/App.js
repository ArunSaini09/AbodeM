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
import HomeListPage from "./pages/HomeListPage";
import SingleHomePage from "./pages/SingleHomePage";
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
							<NavLink className="nav-link" to="/form/new">
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
				<HouseDataProvider isAuthenticated={auth.isAuthenticated}>
					<div className="container-xl text-center">
						<div className="row justify-content-center">
							<Routes>
								<Route path="/signup" element={<SignUpPage />} />
								<Route path="/login" element={<LoginPage />} />
								<Route path="/form/new" element={ <PrivateRouteRequiresAuth><PropertyForm /></PrivateRouteRequiresAuth> } />
								<Route path="/home/:id" element={ <PrivateRouteRequiresAuth><SingleHomePage /></PrivateRouteRequiresAuth> } />
								<Route path="/about-us" element={ <PrivateRouteRequiresAuth><AboutUsPage /></PrivateRouteRequiresAuth>} />
								<Route path="/" element={ <PrivateRouteRequiresAuth><HomeListPage /></PrivateRouteRequiresAuth>} />
							</Routes>
						</div>
					</div>
				</HouseDataProvider>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
