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
