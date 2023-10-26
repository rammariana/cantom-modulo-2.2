import React, { useContext, useEffect } from "react";
//import { AuthContext } from "./Auth";
import { UserDataContext } from "./UserDataContext";
import { useState } from "react";
import axios from "axios";
import "./CreateMeeting.css";

const CreateMeeting = () => {
  //const { currentUser } = useContext(AuthContext);
  const { setIdGlobal, arrayHours, handleClickAdd, handleChecked, isChecked } =
    useContext(UserDataContext);
  const [form, setForm] = useState({
    nombre: "",
    duracion: "",
    cantidad: 0,
  });

  let [error, setError] = useState("");
  const hours = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

  useEffect(() => {
    console.log(arrayHours);
  }, [arrayHours]);

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
      <h1>Crea un nuevo evento</h1>
      <form>
        <div className="label-container">
          <span className="createMeeting-span">1</span>
          <label htmlFor="nombre">¿Cómo te gusta que te llamen?</label>
        </div>
        <input
          onChange={handleChange}
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Ej. Pepe"
          autoComplete="off"
          value={form.nombre}
        />
        <div className="label-container">
          <span className="createMeeting-span">2</span>
          <label htmlFor="evento">Elige un nombre para tu evento</label>
        </div>
        <input
          onChange={handleChange}
          type="text"
          id="evento"
          name="evento"
          placeholder="Nombre del evento"
          autoComplete="off"
          value={form.nombre}
        />
        <div className="label-container">
          <span className="createMeeting-span">3</span>
          <label>Selecciona cuantos días durará el evento y su duración</label>
        </div>
        <div className="duration">
          <div className="duration-days">
            <input
              onChange={handleChange}
              type="number"
              name="cantidad"
              id="days"
              min="0"
              placeholder="0"
              value={form["cantidad"]}
            />
            <label htmlFor="days">Días</label>
          </div>
          <div className="duration-minutes">
            <select
              name="duracion"
              id="minutes"
              value={form.duracion}
              onChange={handleChange}
            >
              {hours.map((el, index) => (
                <option key={index} value={el}>
                  {el}
                </option>
              ))}
            </select>
            <label htmlFor="minutes">Minutos</label>
          </div>
        </div>
        {/*seccion calendario (dias/horas)*/}
        <div className="label-container">
          <span className="createMeeting-span">4</span>
          <label>
            Selecciona los días y horarios que propones para tu evento
          </label>
        </div>
        <small className="createMeeting-small">
          Tus invitados podrán elegir sólo entre los días y horarios que tú
          propones
        </small>
        <section className="schedules-container">
          <div className="day">
            <div className="column-day">
              <div className="checkbox">
                <input
                  type="checkbox"
                  name="domingo"
                  id="domingo"
                  checked={isChecked}
                  onChange={handleChecked}
                />
                <label htmlFor="domingo">Domingo</label>
              </div>
              <div className="icons">
                <ion-icon name="add" onClick={handleClickAdd}></ion-icon>
                <ion-icon name="copy"></ion-icon>
              </div>
            </div>
            <div className="column-schedule">
              {isChecked ? (
                arrayHours.map((e, index) => (
                  <div key={index} id={index}>
                    {e}
                  </div>
                ))
              ) : (
                <span>No seleccionado</span>
              )}
            </div>
          </div>
        </section>
        {/*Aqui acaba la seccion calendario*/}
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