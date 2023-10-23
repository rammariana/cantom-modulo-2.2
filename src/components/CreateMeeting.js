import React, { useContext, useEffect } from "react";
//import { AuthContext } from "./Auth";
import { UserDataContext } from "./UserDataContext";
import { useState } from "react";
import axios from "axios";
import "./CreateMeeting.css";

const CreateMeeting = () => {
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

  //const { currentUser } = useContext(AuthContext);
  const { setIdGlobal } = useContext(UserDataContext);
  const [form, setForm] = useState({
    nombre: "",
    duracion: "",
    cantidad: 0,
  });

  const [isChecked, setIsChecked] = useState(false);
  /*
  const [scheduleIdCounter, setScheduleIdCounter] = useState(0);

  const generateUniqueId = () => {
    setScheduleIdCounter(scheduleIdCounter + 1);
    //console.log(scheduleIdCounter);
    return `schedule-${scheduleIdCounter}`;
  };

   function handleClickRemove(e) {
    
     console.log(e.target.closest(".schedule"));
    const scheduleId = e.target.closest(".schedule").id;
     const updatedSchedules = schedules.filter(
       (schedule) => schedule.key !== scheduleId
     );
     for (let i = 0; i < schedules.length; i++) {
       console.log(schedules[i]);
     }

     setSchedules(updatedSchedules);
   }
   const schedule = (
     <div className="schedule" key={scheduleIdCounter} id={scheduleIdCounter}>
       <div className="div-schedule">
         <select name="" id="">
           {horas.map((e, index) => (
             <option value="e" key={index}>
               {e}
             </option>
           ))}
         </select>
         <p>-</p>
         <select name="" id="">
           {horas.map((e, index) => (
             <option value="e" key={index}>
               {e}
             </option>
           ))}
         </select>
       </div>
       <div className="trash">
         <ion-icon name="trash" onClick={handleClickRemove}></ion-icon>
       </div>
     </div>
   );

   const [schedules, setSchedules] = useState([schedule]);
*/
  function handleClickRemove(e) {
    console.log(e.target.parentElement.parentElement.parentElement);
    console.log(arrayHours);
    const parentElement = e.target.parentElement.parentElement.parentElement;
    const removedIndex = parseInt(parentElement.getAttribute("id"), 10);

    const newArrayHours = arrayHours.filter(
      (element, index) => index !== removedIndex
    );

    setArrayHours(newArrayHours);
  }
  const [myIndex, setMyIndex] = useState(0);
  const [arrayHours, setArrayHours] = useState([]);
  const handleChecked = (e) => {
    setIsChecked(!isChecked);
    setArrayHours([bla]);
  };

  const bla = (
    <div key={myIndex} id={myIndex}>
      <div className="div-schedule">
        <select name="" id="">
          {horas.map((e, index) => (
            <option value="e" key={index}>
              {e}
            </option>
          ))}
        </select>
        <p>-</p>
        <select name="" id="">
          {horas.map((e, index) => (
            <option value="e" key={index}>
              {e}
            </option>
          ))}
        </select>
      </div>

      <div className="trash">
        <ion-icon name="trash" onClick={handleClickRemove}></ion-icon>
      </div>
    </div>
  );
  let [error, setError] = useState("");
  const hours = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
  const handleClickAdd = () => {
    const newIndex = myIndex + 1;
    setMyIndex(newIndex);
    //console.log(myIndex);

    const newBla = (
      <div key={newIndex} id={newIndex}>
        <div className="div-schedule">
          <select name="" id="">
            {horas.map((e, index) => (
              <option value="e" key={index}>
                {e}
              </option>
            ))}
          </select>
          <p>-</p>
          <select name="" id="">
            {horas.map((e, index) => (
              <option value="e" key={index}>
                {e}
              </option>
            ))}
          </select>
        </div>

        <div className="trash">
          <ion-icon name="trash" onClick={handleClickRemove}></ion-icon>
        </div>
      </div>
    );
    setArrayHours([...arrayHours, newBla]);
    /*const newSchedule = (
       <div
         className="schedule"
         key={generateUniqueId()}
         id={generateUniqueId()}
       >
         <div className="div-schedule">
           <select name="" id="">
             {horas.map((e, index) => (
               <option value="e" key={index}>
                 {e}
               </option>
             ))}
           </select>
           <p>-</p>
           <select name="" id="">
             {horas.map((e, index) => (
               <option value="e" key={index}>
                 {e}
               </option>
             ))}
           </select>
         </div>

         <div className="trash">
           <ion-icon name="trash" onClick={handleClickRemove}></ion-icon>
         </div>
       </div>
     );*/
    //setSchedules([...schedules, newSchedule]);
    //console.log(schedules);
  };

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
