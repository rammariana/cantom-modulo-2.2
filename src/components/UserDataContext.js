import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import axios from "axios";

export const UserDataContext = React.createContext();

export const UserDataProvider = ({ children }) => {
  const navigate = useNavigate();
  let [id, setId] = useState("");
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
  const [isChecked, setIsChecked] = useState(false);
  const [myIndex, setMyIndex] = useState(0);
  const [arrayHours, setArrayHours] = useState([]);
  // Funciones

  const setIdGlobal = async (form, idMeeting) => {
    const formData = {
      nombre: form.nombre,
      duracion: form.duracion,
      cantidad: form["cantidad"],
    };
    setId(idMeeting);
    navigate(`/meeting/${idMeeting}`, { state: { formData, idMeeting } });
    console.log(idMeeting);
  };

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

  const handleChecked = (e) => {
    setIsChecked(!isChecked);
    if (arrayHours.length > 0) {
      setArrayHours([...arrayHours]);
    } else {
      setArrayHours([bla]);
    }
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
  };

  useEffect(() => {
    console.log(arrayHours);
  }, [arrayHours]);

  const data = {
    setIdGlobal,
    id,
    handleChecked,
    handleClickAdd,
    arrayHours,
    isChecked,
  };
  return (
    <UserDataContext.Provider value={data}>{children}</UserDataContext.Provider>
  );
};

/*
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserDataContext = React.createContext();

export const UserDataProvider = ({ children }) => {
  const navigate = useNavigate();
  let [error, setError] = useState("");
  let [id, setId] = useState(0);
  const [form, setForm] = useState({
    nombre: "",
    duracion: "",
    cantidad: 0,
  });

  // Funciones

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(form);
  };

  const handleSubmit = (e, form) => {
    e.preventDefault();

    if (form.duracion !== "" && form.nombre !== "" && form.cantidad !== "") {
      console.log(form.nombre, form.duracion, form["cantidad"]);
      const formData = {
        nombre: form.nombre,
        duracion: form.duracion,
        cantidad: form["cantidad"],
      };
      const idMeeting = Math.floor(Math.random() * 999999999) + 1;
      //console.log(idMeeting);
      setId(idMeeting);
      navigate(`/meeting/:${idMeeting}`, { state: { formData, id } });
    } else {
      setError("Necesitas completar todos los campos");
      setTimeout(() => {
        setError("");
      }, 2000);
      //console.log(setError);
    }
  };

  const data = { form, handleChange, handleSubmit, error, id };
  return (
    <UserDataContext.Provider value={data}>{children}</UserDataContext.Provider>
  );
};

/*

let usuarios= [
    {
       userName: 'Mariana8765', 
       horariosDisponibles: ['23092023-120-430', '23092023-215-310', '24092023-450-320']
    },
    {
       userName: 'Pedro6755', 
       horariosDisponibles: ['23092023-210-430', '25092023-215-310', '24092023-250-320']
    },
    {
       userName: 'Lola0987', 
       horariosDisponibles: ['22092023-120-430', '23092023-215-310', '24092023-450-320']
    },
    ]

var fechaActual = new Date();
var diasASumar = 26;

 let dia;
let arrayDia = [];
    

for(var i = 1; i <= diasASumar; i++){
  var fechaNueva = new Date(fechaActual);
  fechaNueva.setDate(fechaActual.getDate() + i)
    
  var dd = fechaNueva.getDate()
  var mm = '0'.concat(fechaNueva.getMonth())
  var yy = fechaNueva.getFullYear()
   
  let claveDia = `${dd}-${mm}-${yy}`;
  let objDia = {};
  objDia[claveDia] = []
  dia.push(objDia)

   
  // Crear objeto con clave de cada dia y valor de array
  // para rellenarlo con tooodos los dias repetidos y comparar
  // para luego filtrar
  let clave = `${dd}${mm}${yy}`;
  let obj = {};
  obj[clave] = []
  arrayDia.push(obj)
  
  
  
   
}
  // Metiendo las horas en el dia correspondiente

   arrayDia.forEach(e => {
    const clave = Object.keys(e)[0];
    //console.log(clave)
        usuarios.forEach(el => {
     
            el.horariosDisponibles.forEach(element => {
                if (clave === element.split('-')[0]) {
                e[clave].push(element.replace(/^\d+-/, ''));
                }
                //console.log(element.replace(/^\d+-/, ''))
                //console.log(, 'hola')
            })
        })
 
    });
 
      
  
       console.log(arrayDia)


*/
