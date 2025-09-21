// src/components/Layout.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate();

  // ✅ Check if a token is in localStorage
  const isLoggedIn = () => !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");  // clear the token
    navigate("/");                     // redirect to Home
  };

  return (
    <div>
      {/* --- Nav Bar --- */}
      <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Link to="/">Home</Link>

        {isLoggedIn() ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>

      {/* --- Page Content --- */}
      <main>{children}</main>
    </div>
  );
}
