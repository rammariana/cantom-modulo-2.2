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
    </div>
  );
};
export default MeetingId;
// 26IDIXU5 id de una reunion para pruebas
// enlace http://localhost:3000/meeting/26IDIXU5

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
