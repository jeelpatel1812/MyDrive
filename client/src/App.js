import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import { NotFoundPage } from './components/NotFoundPage/notFoundPage';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("google_token") !== null;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <GoogleOAuthProvider clientId="544963894891-dphtp4netkdopif27sll3n0tt4qqgkhq.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/loading" element={<div/>} />
          <Route path="*" element={<NotFoundPage />} />
          
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
