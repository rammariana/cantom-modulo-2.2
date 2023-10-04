import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
//import { Redirect } from "react-router-dom";
//import firebaseConfig from "../config";
import "./Login.css";
import appFirebase from "../config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(appFirebase);

const SignUp = () => {
  let [visible, setVisible] = useState(false);
  let [input, setInput] = useState("password");
  let [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const handleVisible = () => {
    setVisible(!visible);
    setInput(visible ? "password" : "text");
    console.log(visible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      await createUserWithEmailAndPassword(auth, email.value, password.value);
      setCurrentUser(true);
      /*firebaseConfig
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      setCurrentUser(true);*/
    } catch (error) {
      setError("Invalid email");
      setTimeout(() => setError(""), 1500);
    }
  };
  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="login-component">
      <h1>Sign Up</h1>
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
        <p>Do you have an acount?</p> <Link to="/login">Log In</Link>
      </form>
    </div>
  );
};

export default SignUp;
