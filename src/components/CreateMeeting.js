//import { AuthContext } from "./Auth";
import React, { useContext, useEffect } from "react";
import { UserDataContext } from "./UserDataContext";
import { useState } from "react";
import axios from "axios";
import "./CreateMeeting.css";
import SelectAvailableHours from "./SelectAvailableHours";
import { useNavigate } from "react-router-dom";

const CreateMeeting = () => {
  //const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setIdGlobal, formGlobal, setFormG } = useContext(UserDataContext);
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
  const [disabledBtn, setDisabledBtn] = useState(false);
  let [error, setError] = useState("");
  let [creando, setCreando] = useState("");

  const hours = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 120, 180];

  //cada vez que form cambia, el Form Global se actualiza
  useEffect(() => {
    setFormG(form);
    //console.log(form);
  }, [form]);

  /*la primera vez que el componente carga, 
  / se revisa si FormGlobal contiene info y la carga, de lo contrario se inicia form vacio*/
  useEffect(() => {
    if (Object.keys(formGlobal).length !== 0) {
      setForm(formGlobal);
    }
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  //esta funcion actualiza el horario segun los cambios del componente SelectAvailableHours
  const setFormSchedule = (schedule) => {
    setForm({ ...form, horarios: schedule });
  };

  //funcion que checa que los dias seleccionados no esten vacios
  function validateForm(formObject) {
    let errorMessage = '';
    let hasAtLeastOneItem = false;

    if(form.duracion == "" || form.nombre == "" || form.evento == "" || form.cantidad == ""){
      errorMessage = 'Necesitas completar todos los campos'
      setError(errorMessage);
      return hasAtLeastOneItem;
    }
  
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

  const handleSubmit = async (e, form) => {
    e.preventDefault();
    setCreando("Creando...");
    setDisabledBtn(true);

    if (validateForm(form)) {
      //convertir horarios a formato 'L-600-720'
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
        const res = await axios.post(
          "https://camtomx-4c4e45a60b73.herokuapp.com/api/apps/w2m/new-meeting",
          {
            lengthMeeting: form.cantidad,
            expirationDate: form.duracion,
            adminName: form.nombre,
            eventName: form.evento,
            adminHours: proposedHours,
          }
        );
        const idMeeting = res.data.meetingId;
        setIdGlobal(form, idMeeting);
        if (res.status === 200) {
          setCreando("");
          navigate(`/meeting/${idMeeting}`);
          //setDisabledBtn(false);
        }
        //console.log(form);
        //console.log(res.data.meetingId);
      } catch (err) {
        console.log(err);
        setCreando("");
        setDisabledBtn(false);
        setError("Ocurrió un error, intente más tarde");
        setTimeout(() => {
          setError("");
        }, 1500);
      }
    } else {
      setCreando("")
      setDisabledBtn(false)
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
          value={form.evento}
        />
        <div className="label-container">
          <span className="createMeeting-span">3</span>
          <label>Selecciona el límite del evento y su duración</label>
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

        <SelectAvailableHours
          setFormScheduleParentComponent={setFormSchedule}
        />
        {/*Aqui acaba la seccion calendario*/}
        <div className="error-success-container">
          <span className="creando">{creando}</span>
          <span className="error" style={{ color: "red" }}>
            {error}
          </span>
        </div>
        <button onClick={(e) => handleSubmit(e, form)} disabled={disabledBtn}>
          Crear
        </button>
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
/**/