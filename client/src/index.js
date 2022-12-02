import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {  AuthProvider } from "./context/AuthContext";

// React 17 style loading of application
ReactDOM.render(<AuthProvider>
                    <App />
                </AuthProvider>
                , document.getElementById("root"));
