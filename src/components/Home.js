import "./Home.css";
import { Link } from "react-router-dom";
//import CreateMeeting from "../CreateMeeting";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Coordina reuniones sin esfuerzo</h1>
      <h3>
        Encuentra horarios convenientes para todos con nuestra herramienta de
        programación
      </h3>
      <div className="token-container">
        <h3>¿Te invitaron al evento?</h3>
        <input type="text" placeholder="Ingresa el código aquí" />
        <p>Unirme al evento</p>
        {/* Aqui debe ir una redireccion a la url del evento*/}
      </div>
      <button>
        <Link to="/create-meeting">Crear nuevo evento</Link>
      </button>
      {/* Aqui debe ir una redireccion a la pag crear evento*/}
    </div>
  );
};

export default Home;

/*
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./Auth";
import "./Home.css";
import { UserDataContext } from "./UserDataContext";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const { form, handleChange, handleSubmit, error } =
    useContext(UserDataContext);
  const hours = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

  return (
    <div className="home-container">
      <h1>Crear Reunión</h1>
      <form>
        <input
          onChange={handleChange}
          type="text"
          name="nombre"
          placeholder="Nombre"
          autoComplete="off"
          value={form.nombre}
        />
        <input
          onChange={handleChange}
          type="number"
          name="cantidad"
          min="0"
          placeholder="Cantidad de días"
          value={form["cantidad"]}
        />
        <div className="form-minutos">
          <select name="duracion" value={form.duracion} onChange={handleChange}>
            <option value="" disabled></option>
            {hours.map((el, index) => (
              <option key={index} value={el}>
                {el}
              </option>
            ))}
          </select>
          <p>Minutos</p>
        </div>
        <span>{error}</span>
        <button onClick={(e) => handleSubmit(e, form)}>Crear</button>
      </form>

      {currentUser ? (
        <p>
          You are logged - <Link to="/dashboard">View Dashboard</Link>
        </p>
      ) : (
        <p>
          <Link to="/login">Log In</Link>
          
        </p>
      )}
    </div>
  );
};

export default Home;
*/
