import React, { useContext } from "react";
//import { AuthContext } from "./Auth";
import { UserDataContext } from "./UserDataContext";
import { useState } from "react";
import axios from "axios";
import "./CreateMeeting.css";

const CreateMeeting = () => {
  //const { currentUser } = useContext(AuthContext);
  const { setIdGlobal } = useContext(UserDataContext);
  const [form, setForm] = useState({
    nombre: "",
    duracion: "",
    cantidad: 0,
  });
  let [error, setError] = useState("");
  const hours = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    //console.log(form);
  };
  const handleSubmit = async (e, form) => {
    e.preventDefault();

    const res = await axios.post(
      "https://camtomx-4c4e45a60b73.herokuapp.com/api/apps/w2m/new-meeting",

      {
        lengthMeeting: form.cantidad,
        expirationDate: form.duracion,
        adminName: form.nombre,
      }
    );
    const idMeeting = res.data.meetingId;
    //console.log(form);
    //console.log(res.data.meetingId);

    if (form.duracion !== "" && form.nombre !== "" && form.cantidad !== "") {
      setIdGlobal(form, idMeeting);
    } else {
      setError("Necesitas completar todos los campos");
      setTimeout(() => {
        setError("");
      }, 2000);
      //console.log(setError);
    }
  };

  return (
    <div className="createmeeting-container">
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
      {/*}
      {currentUser ? (
        <p>
          You are logged - <Link to="/dashboard">View Dashboard</Link>
        </p>
      ) : (
        <p>
          <Link to="/login">Log In</Link>
        </p>
      )}*/}
    </div>
  );
};
export default CreateMeeting;
