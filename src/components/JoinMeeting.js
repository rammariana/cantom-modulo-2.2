import axios from "axios";
import { useEffect } from "react";
import { useContext, useState } from "react";
import "./JoinMeeting.css";
import { UserDataContext } from "./UserDataContext";
//import React from "react";

const JoinMeeting = () => {
  const { token } = useContext(UserDataContext);
  const [nombre, setNombre] = useState("");
  console.log("joinmeeting", token);

  const handleChange = (e) => {
    setNombre(e.target.value);
  };
  useEffect(() => {
    console.log(nombre);
  }, [nombre]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = Math.floor(Math.random() * 9999) + 1;
    const userName = nombre.concat(id);
    console.log(userName);

    const res = await axios.put(
      "https://camtomx-4c4e45a60b73.herokuapp.com/api/apps/w2m/new-user-in-meeting",

      {
        meetingId: token,
        userId: userName,
      }
    );
    console.log(res);
  };

  return (
    <div className="joinMeeting-container">
      <h1>Unirme al evento</h1>
      <form className="joinMeeting-inputs">
        <label htmlFor="nombre">¿Como te gusta que te llamen?</label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          autoComplete="off"
          placeholder="Ej. Pepe"
          value={nombre}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Unirme</button>
      </form>
      {/* Aquí va una redirección a la vista del usuario que se une y una petición para buscar el token y los datos de los dias permitidos y sus horarios*/}
    </div>
  );
};
export default JoinMeeting;
