import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import axios from "axios";

export const UserDataContext = React.createContext();

export const UserDataProvider = ({ children }) => {
  const navigate = useNavigate();
  let [id, setId] = useState("");

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
  const data = { setIdGlobal, id };
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
