//import firebaseConfig from "../config.js";
//import { Redirect } from "react-router-dom";
//import { auth } from "../config";
//import { signInWithEmailAndPassword } from "firebase/auth";
import appFirebase from "../config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { AuthContext } from "./Auth";
import { Link, Navigate } from "react-router-dom";
import "./Login.css";

const auth = getAuth(appFirebase);

const LogIn = () => {
  let [visible, setVisible] = useState(false);
  let [input, setInput] = useState("password");
  let [error, setError] = useState("");

  const handleVisible = () => {
    setVisible(!visible);
    setInput(visible ? "password" : "text");
    console.log(visible);
  };
  //
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    try {
      await signInWithEmailAndPassword(auth, email.value, password.value);
      /**
       firebaseConfig
        .auth()
        .signInWithEmailAndPassword(email.value, password.value);
      */
    } catch (err) {
      setError("Invalid email");
      setTimeout(() => setError(""), 1500);
    }
  };
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="login-component">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        {/*<label for="email">Email</label>*/}
        <input type="email" name="email" placeholder="Email" />
        {/*<label for="password">Password</label>*/}
        <div className="input-field">
          <input type={input} name="password" placeholder="Password" />
          <span onClick={handleVisible}>
            {visible ? (
              <ion-icon name="eye"></ion-icon>
            ) : (
              <ion-icon name="eye-off"></ion-icon>
            )}
          </span>
        </div>
        <span>{error}</span>
        <button type="submit">Submit</button>
        <p>No registered yet?</p> <Link to="/signup">Sign Up</Link>
      </form>
    </div>
  );
};

export default LogIn;
