import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import { AuthProvider } from "./Auth";
import MeetingId from "./MeetingId";
import "./Header.css";
import { UserDataProvider } from "./UserDataContext";

const Header = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <nav className="nav-links">
          <div className="logo">
            <Link to="/">Logo</Link>
          </div>
          <div className="login-container">
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </nav>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <UserDataProvider>
                <Home />
              </UserDataProvider>
            }
          />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/login" element={<LogIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route
            exact
            path="/meeting/:id"
            element={
              <UserDataProvider>
                <MeetingId />
              </UserDataProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
export default Header;
