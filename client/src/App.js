import React from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import PostsListPage from "./pages/PostsListPage";
import ShowPostPage from "./pages/ShowPostPage";
import AboutUsPage from "./pages/AboutUsPage";
import PropertyForm from "./pages/form/PropertyForm";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import AuthButton from "./components/AuthButton";
import SignUpButton from "./components/SignupButton";

function Navigation(props) {
	return (
		<nav className="navbar navbar-expand-sm navbar-dark bg-dark shadow mb-3">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
					Home
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
	);
}

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Navigation />
				<div className="container-xl text-center">
					<div className="row justify-content-center">
						<Routes>
							<Route path="/posts/new" element={<PropertyForm />} />
							<Route path="/posts/:id" element={<ShowPostPage />} />
							<Route path="/about-us" element={<AboutUsPage />} />
							<Route path="/" element={<PostsListPage />} />
						</Routes>
					</div>
				</div>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
