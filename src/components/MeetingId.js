import React, { useContext, useEffect } from "react";
import { UserDataContext } from "./UserDataContext";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./MeetingId.css";

const MeetingId = () => {
  const { id } = useContext(UserDataContext);
  const [form, setForm] = useState({
    nombre: "",
    duracion: "",
    cantidad: 0,
  });
  const params = useParams();
  const meetingId = params.id;
  //console.log(params, id);
  const horas = [
    "00:00",
    "00:15",
    "00:30",
    "00:45",
    "01:00",
    "01:15",
    "01:30",
    "01:45",
    "02:00",
    "02:15",
    "02:30",
    "02:45",
    "03:00",
    "03:15",
    "03:30",
    "03:45",
    "04:00",
    "04:15",
    "04:30",
    "04:45",
    "05:00",
    "05:15",
    "05:30",
    "05:45",
    "06:00",
    "06:15",
    "06:30",
    "06:45",
    "07:00",
    "07:15",
    "07:30",
    "07:45",
    "08:00",
    "08:15",
    "08:30",
    "08:45",
    "09:00",
    "09:15",
    "09:30",
    "09:45",
    "10:00",
    "10:15",
    "10:30",
    "10:45",
    "11:00",
    "11:15",
    "11:30",
    "11:45",
    "12:00",
    "12:15",
    "12:30",
    "12:45",
    "13:00",
    "13:15",
    "13:30",
    "13:45",
    "14:00",
    "14:15",
    "14:30",
    "14:45",
    "15:00",
    "15:15",
    "15:30",
    "15:45",
    "16:00",
    "16:15",
    "16:30",
    "16:45",
    "17:00",
    "17:15",
    "17:30",
    "17:45",
    "18:00",
    "18:15",
    "18:30",
    "18:45",
    "19:00",
    "19:15",
    "19:30",
    "19:45",
    "20:00",
    "20:15",
    "20:30",
    "20:45",
    "21:00",
    "21:15",
    "21:30",
    "21:45",
    "22:00",
    "22:15",
    "22:30",
    "22:45",
    "23:00",
    "23:15",
    "23:30",
    "23:45",
  ];
  useEffect(() => {
    async function fechData() {
      try {
        const res = await axios.get(
          `https://camtomx-4c4e45a60b73.herokuapp.com/api/apps/w2m/get-meeting-info/${meetingId}`,
          {
            params: {
              meetingId: id,
            },
          }
        );
        setForm({
          nombre: res.data.adminName,
          duracion: res.data.expirationDate,
          cantidad: res.data.lengthMeeting,
        });

        //console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
    fechData();
  }, [id, meetingId]);

  return (
    <div className="meeting-container">
      <section>
        <h1>Hola {form.nombre}</h1>
        <h5>El id de tu evento es: {meetingId}</h5>
        <p>Nombre: {form.nombre}</p>
        <p>Duracion del evento: {form.cantidad} días</p>
        <p>Tiempo: {form.duracion} minutos</p>
      </section>
      <section className="schedules-container">
        <div className="btn-containers">
          <button>Horario 1</button>
          <button>Horario 2</button>
        </div>
        <div className="schedules">
          <div className="day">
            <span>Domingo</span>
            <div className="selects">
              <select name="domingo" id="domingo">
                {horas.map((el, index) => (
                  <option value={el} key={index}>
                    {el}
                  </option>
                ))}
              </select>
              <span> - </span>
              <select name="domingo" id="domingo">
                {horas.map((el, index) => (
                  <option value={el} key={index}>
                    {el}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <hr />
          <div className="day">
            <span>Lunes</span>
            <div className="selects">
              <select name="domingo" id="domingo">
                {horas.map((el, index) => (
                  <option value={el} key={index}>
                    {el}
                  </option>
                ))}
              </select>
              <span> - </span>
              <select name="domingo" id="domingo">
                {horas.map((el, index) => (
                  <option value={el} key={index}>
                    {el}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <hr />
          <div className="day">
            <span>Martes</span>
            <div className="selects">
              <select name="domingo" id="domingo">
                {horas.map((el, index) => (
                  <option value={el} key={index}>
                    {el}
                  </option>
                ))}
              </select>
              <span> - </span>
              <select name="domingo" id="domingo">
                {horas.map((el, index) => (
                  <option value={el} key={index}>
                    {el}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <hr />
          <div className="day">
            <span>Miércoles</span>
            <div className="selects">
              <select name="domingo" id="domingo">
                {horas.map((el, index) => (
                  <option value={el} key={index}>
                    {el}
                  </option>
                ))}
              </select>
              <span> - </span>
              <select name="domingo" id="domingo">
                {horas.map((el, index) => (
                  <option value={el} key={index}>
                    {el}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <hr />
          <div className="day">
            <span>Jueves</span>
            <div className="selects">
              <select name="domingo" id="domingo">
                {horas.map((el, index) => (
                  <option value={el} key={index}>
                    {el}
                  </option>
                ))}
              </select>
              <span> - </span>
              <select name="domingo" id="domingo">
                {horas.map((el, index) => (
                  <option value={el} key={index}>
                    {el}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <hr />
          <div className="day">
            <span>Viernes</span>
            <div className="selects">
              <select name="domingo" id="domingo">
                {horas.map((el, index) => (
                  <option value={el} key={index}>
                    {el}
                  </option>
                ))}
              </select>
              <span> - </span>
              <select name="domingo" id="domingo">
                {horas.map((el, index) => (
                  <option value={el} key={index}>
                    {el}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <hr />
          <div className="day">
            <span>Sábado</span>
            <div className="selects">
              <select name="domingo" id="domingo">
                {horas.map((el, index) => (
                  <option value={el} key={index}>
                    {el}
                  </option>
                ))}
              </select>
              <span> - </span>
              <select name="domingo" id="domingo">
                {horas.map((el, index) => (
                  <option value={el} key={index}>
                    {el}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/*Aqui acaban los selects*/}
        </div>
      </section>
    </div>
  );
};
export default MeetingId;
// 26IDIXU5 id de una reunion para pruebas

/*
import React, { useContext } from "react";
import { UserDataContext } from "./UserDataContext";

const MeetingId = () => {
  const { form } = useContext(UserDataContext);
  const { id } = useContext(UserDataContext);
  const { nombre, duracion, cantidad } = form;

  console.log(nombre, duracion, cantidad, id);

  return (
    <div>
      <h1>Hola {nombre}</h1>
      <h5>El id de tu evento es: {id}</h5>
      <p>Nombre: {nombre}</p>
      <p>Duracion del evento: {cantidad} días</p>
      <p>Tiempo: {duracion} minutos</p>
    </div>
  );
};
export default MeetingId;
*/
