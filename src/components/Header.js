import React from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import MeetingId from "./MeetingId";
import "./Header.css";
import { UserDataProvider } from "./UserDataContext";
import CreateMeeting from "./CreateMeeting";

const Header = () => {
  const location = useLocation();
  //console.log(location);

  return (
    <>
      <nav className="nav-links">
        <div className="logo">
          <Link to="/">Logo</Link>
        </div>
        {location.pathname !== "/login" && location.pathname !== "/signup" && (
          <div className="login-container">
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
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
        <Route exact path="/create-meeting" element={<CreateMeeting />} />
      </Routes>
    </>
  );
};
export default Header;
