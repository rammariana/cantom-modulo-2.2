import "./Home.css";
import { Link } from "react-router-dom";
//import { useState } from "react";
import { useContext } from "react";
import { UserDataContext } from "./UserDataContext";
//import CreateMeeting from "../CreateMeeting";

const Home = () => {
  const { handleChange, token } = useContext(UserDataContext);
  //26IDIXU5

  return (
    <div className="home-container">
      <h1>Coordina reuniones sin esfuerzo</h1>
      <h3>
        Encuentra horarios convenientes para todos con nuestra herramienta de
        programación
      </h3>
      <div className="token-container">
        <h3>¿Te invitaron a un evento?</h3>
        <input
          type="text"
          placeholder="Ingresa el código aquí"
          id="token"
          onChange={handleChange}
          value={token}
          name="token"
          autoComplete="off"
        />
        <Link to="/join-meeting">Unirme al evento</Link>
        {/* Aqui debe ir una redireccion a la vista donde se captura el nombre del usuario*/}
      </div>
      <button>
        <Link to="/create-meeting">Crear nuevo evento</Link>
      </button>
      {/* Aqui debe ir una redireccion a la pag crear evento*/}
    </div>
  );
};

export default Home;