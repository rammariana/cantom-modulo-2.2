import { useContext, useEffect } from "react";
import { UserDataContext } from "./UserDataContext";
import "./UserInMeeting.css";
import axios from "axios";
import { useState } from "react";
import SelectAvailableHours from "./SelectAvailableHours";
import { useNavigate } from "react-router-dom";

const UserInMeeting = () => {
  const { token, handleChange, name } = useContext(UserDataContext);
 const [disabledBtn, setDisabledBtn] = useState(false);
 let [error, setError] = useState("");
 const [admin, setAdmin] = useState();
 const [duracion, setDuracion] = useState();
 const [minutos, setMinutos] = useState();
 const [idReunion, setIdReunion] = useState();
 const [message, setMessage] = useState("");
 const [buscando, setBuscando] = useState("");
 const [eventName, setEventName] = useState();
 const navigate = useNavigate();
 //26IDIXU5
 // KWM0EWI0
 useEffect(() => {
   async function fetch() {
     console.log("nombre desde user in meeting", name);
     try {
       const res = await axios(
         `https://camtomx-4c4e45a60b73.herokuapp.com/api/apps/w2m/get-meeting-info/${token}`
       );
       setAdmin(res.data.adminName);
       setDuracion(res.data.expirationDate);
       setMinutos(res.data.lengthMeeting);
       setIdReunion(res.data.meetingId);
       setEventName(res.data.eventName);
       console.log(res);
     } catch (err) {
       console.log(err);
       // Poner un alert?
     }
   }
   fetch();
 }, [name, token]);

 const { formGlobal, setFormG } = useContext(UserDataContext);
 const [form, setForm] = useState({
   nombre: "",
   duracion: "",
   cantidad: 0,
   evento: "",
   horarios: {
     domingo: {
       isChecked: false,
       schedule: [],
     },
     lunes: {
       isChecked: false,
       schedule: [],
     },
     martes: {
       isChecked: false,
       schedule: [],
     },
     miercoles: {
       isChecked: false,
       schedule: [],
     },
     jueves: {
       isChecked: false,
       schedule: [],
     },
     viernes: {
       isChecked: false,
       schedule: [],
     },
     sabado: {
       isChecked: false,
       schedule: [],
     },
   },
 });

 //let [error, setError] = useState("");

 //ME TRAJE ESTO -------------------------------
 //cada vez que form cambia, el Form Global se actualiza
 useEffect(
   (el) => {
     setFormG(form);
     console.log(form, formGlobal);
   },
   [form]
 );

 /*la primera vez que el componente carga, 
  / se revisa si FormGlobal contiene info y la carga, de lo contrario se inicia form vacio*/
 useEffect(() => {
   if (Object.keys(formGlobal).length !== 0) {
     setForm(formGlobal);
     console.log("vacio", form);
   }
 }, []);

 //esta funcion actualiza el horario segun los cambios del componente SelectAvailableHours
 const setFormSchedule = (schedule) => {
   setForm({ ...form, horarios: schedule });
   console.log(schedule);
 };

 function validateFormUserInMeeting(formObject) {
  let errorMessage = '';
  let hasAtLeastOneItem = false;

  for (const day in formObject.horarios) {

      const dayInfo = formObject.horarios[day];

      if (dayInfo.isChecked && dayInfo.schedule.length === 0) {
        errorMessage = 'Agrega horarios a todos los días seleccionados'; 
        setError(errorMessage);
        console.log("hey")
        return hasAtLeastOneItem = false;
      }

      if (dayInfo.schedule.length > 0) {
        hasAtLeastOneItem = true;
      }
    }
    if(hasAtLeastOneItem == false){
      errorMessage = 'Ingresa al menos un horario disponible';
      setError(errorMessage);
      return hasAtLeastOneItem; 
    }
    return hasAtLeastOneItem;
}

 const handleSubmit = async () => {
   //const newNameUser = name;
   //console.log(newNameUser);

   setDisabledBtn(true);
   setBuscando("Uniendo...");

   if(validateFormUserInMeeting(form)){

    function getMinutesFromTime(time) {
      const [hours, minutes] = time.split(":");
      return parseInt(hours) * 60 + parseInt(minutes);
    }

    function convertIntervalsToMinutes(intervals) {
      const tiempoPropuesto = [];

      for (const day in intervals) {
        const daySchedule = intervals[day].schedule.map((interval) => {
          const [start, end] = interval.split("-");
          const startMinutes = getMinutesFromTime(start);
          const endMinutes = getMinutesFromTime(end);
          return `${day}--${startMinutes}-${endMinutes}`;
        });

        tiempoPropuesto.push(...daySchedule);
      }

      return tiempoPropuesto;
    }

    //CHECA EL OUPUT
    console.log(convertIntervalsToMinutes(form.horarios));
    const proposedHours = convertIntervalsToMinutes(form.horarios);
    try {
      const res = await axios.put(
        "https://camtomx-4c4e45a60b73.herokuapp.com/api/apps/w2m/new-user-in-meeting",
        {
          meetingId: token,
          userName: name,
          availableHours: proposedHours,
        }
      );
      if (res.status === 200) {
        setBuscando("");
      }
      navigate(`/meeting-final/:${idReunion}`);
      //console.log(res);
    } catch (err) {
      //console.log(err);
      setDisabledBtn(false);
      setBuscando("");
      setError("Ocurrió un error, intente más tarde");
      setTimeout(() => {
        setError("");
      }, 1500);
    }
  }else{
    setDisabledBtn(false);
    setBuscando("");
  }
 };

 const AddUserToMeeting = async (e) => {
   e.preventDefault();

   setMessage("Buscando reunión...");

   try {
     const res = await axios.get(
       `https://camtomx-4c4e45a60b73.herokuapp.com/api/apps/w2m/get-meeting-info/${token}`
     );
     console.log(res);

     if (res.status === 200) {
       navigate(`/join-meeting`);
       setMessage("Has entrado a la reunión");
       setTimeout(() => {
         setMessage("");
       }, 1500);
     }
   } catch (err) {
     if (err.response.status === 404) {
       setMessage("Token no encontrado");
       setTimeout(() => {
         setMessage("");
       }, 1500);
     }
   }
 };

 return (
   <div className="userInMeeting-container">
     {token && name ? (
       <>
         <h1>{eventName}</h1>
         <p className="nombre">
           Bienvenid@ {name[0].toUpperCase().concat(name.slice(1))}
         </p>
         <div className="data-reunion">
           <p>
             El administrador del evento es <b>{admin}</b>
           </p>
           <p>
             Fecha límite del evento: <b>{duracion}</b> días
           </p>
           <p>
             Duración del evento: <b>{minutos}</b> minutos
           </p>
           <p>
             ID de la reunión: <b>{idReunion}</b>
           </p>
         </div>
         <div className="label-container">
           <span>1</span>
           <label>Elige el horario que mejor te funciona</label>
         </div>
         <section className="select-schedules">
           <SelectAvailableHours
             setFormScheduleParentComponent={setFormSchedule}
           />
           <span style={{ color: "red" }}>{error}</span>
           <span>{buscando}</span>
           <button onClick={handleSubmit} disabled={disabledBtn}>
             Unirme al evento
           </button>
         </section>
       </>
     ) : (
       <>
         <form className="form-desubicado">
           <p>ID requerido</p>
           <input
             type="text"
             placeholder="Ingresa el código aquí"
             id="token"
             value={token}
             name="token"
             onChange={handleChange}
             autoComplete="off"
           />

           <span>{message}</span>
           <button onClick={AddUserToMeeting}>Unirte al evento</button>
         </form>
       </>
     )}
   </div>
 );
};

export default UserInMeeting;
