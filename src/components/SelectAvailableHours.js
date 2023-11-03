import React, { useEffect } from "react";
import { useState } from "react";
import "./SelectAvailableHours.css";

const SelectAvailableHours = ({ setFormScheduleParentComponent }) => {
  const [form, setForm] = useState({
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
  const [selectInicio, setSelectInicio] = useState(0);
  useEffect(() => {
    console.log(form);
    setFormScheduleParentComponent(form.horarios);
  }, [form]);

  /*const dias = [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
  ];*/

  const handleChecked = (e) => {
    //se crea un duplicado del form con el cambio check o unchecked al respectivo dia
    const newHorarios = {
      ...form.horarios,
      [e.target.name]: {
        ...form.horarios[e.target.name],
        isChecked: !form.horarios[e.target.name]?.isChecked,
      },
    };
    //se sobreescribe el form
    setForm({
      ...form,
      horarios: newHorarios,
    });
  };
  //agrega un intervalo de horas vacio (00:00 - 00:00)
  const handleAddSchedule = (e, dia) => {
    console.log(dia, form);
    const newSchedule = "00:00-00:00";

    setForm({
      ...form,
      horarios: {
        ...form.horarios,
        [dia]: {
          ...form.horarios[dia],
          schedule: [...form.horarios[dia].schedule, newSchedule],
        },
      },
    });
  };

  const handleRemoveSchedule = (e, dia, indexToRemove) => {
    setForm((prevForm) => {
      const updatedHorarios = { ...prevForm.horarios };
      const updatedSchedule = [...updatedHorarios[dia].schedule];

      updatedSchedule.splice(indexToRemove, 1);

      updatedHorarios[dia] = {
        ...updatedHorarios[dia],
        schedule: updatedSchedule,
      };

      return {
        ...prevForm,
        horarios: updatedHorarios,
      };
    });
  };

  const handleSelectChange = (e, type, dia, index) => {
    const selectedValue = e.target.value;

    setForm((prevForm) => {
      const updatedHorarios = { ...prevForm.horarios };
      const updatedSchedule = [...updatedHorarios[dia].schedule];
      const inicioIntervalo = updatedSchedule[index].split("-")[0];
      const finIntervalo = updatedSchedule[index].split("-")[1];
      let updatedInterval;

      if (type === "inicio") {
        setSelectInicio(selectedValue);
        console.log(selectInicio);

        // si updatedHorarios[dia].schedule[index] (separar los intervalos)

        updatedInterval = selectedValue + "-" + finIntervalo;
        console.log(updatedHorarios[dia]);

        if (index > 0) {
          const intervaloInicioActual = updatedSchedule[index]
            .split("-")[0]
            .replace(":", "");
          const intervaloFinalAnterior = updatedSchedule[index - 1]
            .split("-")[1]
            .replace(":", "");
          console.log(intervaloInicioActual, intervaloFinalAnterior);
          if (Number(intervaloInicioActual) < Number(intervaloFinalAnterior)) {
            console.log("solapado");
          }
        }
      } else if (type === "fin") {
        updatedInterval = inicioIntervalo + "-" + selectedValue;

        if (
          Number(selectInicio.replace(":", "")) >
          Number(e.target.value.replace(":", ""))
        ) {
          console.error("error intervalos");
          e.target.value = "00:00";
          return prevForm;
        }
      }

      updatedSchedule[index] = updatedInterval;
      updatedHorarios[dia] = {
        ...updatedHorarios[dia],
        schedule: updatedSchedule,
      };

      return {
        ...prevForm,
        horarios: updatedHorarios,
      };
    });
  };
  useEffect(() => {
    console.log(selectInicio);
  }, [selectInicio]);
  return (
    <div className="Schedules-Form">
      <section className="schedules-container">
        <div className="day">
          <div className="column-day">
            <div className="checkbox">
              <input
                type="checkbox"
                name="domingo"
                id="domingo"
                checked={form.horarios.domingo.isChecked}
                onChange={handleChecked}
              />
              <label htmlFor="domingo">Domingo</label>
            </div>
            <div className="icons">
              <ion-icon
                name="add"
                onClick={(e) => handleAddSchedule(e, "domingo")}
              ></ion-icon>
              <ion-icon name="copy"></ion-icon>
            </div>
          </div>
          <div className="column-schedule">
            {form.horarios.domingo.isChecked ? (
              form.horarios.domingo?.schedule?.map((intervalo, index) => (
                <div key={index} id={index}>
                  <div className="div-schedule">
                    <select
                      onChange={(e) =>
                        handleSelectChange(e, "inicio", "domingo", index)
                      }
                    >
                      {horas.map((horaInicio, index) => (
                        <option
                          key={index}
                          value={horaInicio}
                          selected={horaInicio === intervalo.split("-")[0]}
                        >
                          {horaInicio}
                        </option>
                      ))}
                    </select>
                    <p>-</p>
                    <select
                      onChange={(e) =>
                        handleSelectChange(e, "fin", "domingo", index)
                      }
                    >
                      {horas.map((horaFin, index) => (
                        <option
                          key={index}
                          value={horaFin}
                          selected={horaFin === intervalo.split("-")[1]}
                        >
                          {horaFin}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="trash">
                    <ion-icon
                      name="trash"
                      onClick={(e) => handleRemoveSchedule(e, "domingo", index)}
                    ></ion-icon>
                  </div>
                </div>
              ))
            ) : (
              <span>No seleccionado</span>
            )}
          </div>
        </div>
        <div className="day">
          <div className="column-day">
            <div className="checkbox">
              <input
                type="checkbox"
                name="lunes"
                id="lunes"
                checked={form.horarios.lunes.isChecked}
                onChange={handleChecked}
              />
              <label htmlFor="lunes">Lunes</label>
            </div>
            <div className="icons">
              <ion-icon
                name="add"
                onClick={(e) => handleAddSchedule(e, "lunes")}
              ></ion-icon>
              <ion-icon name="copy"></ion-icon>
            </div>
          </div>
          <div className="column-schedule">
            {form.horarios.lunes.isChecked ? (
              form.horarios.lunes?.schedule?.map((intervalo, index) => (
                <div key={index} id={index}>
                  <div className="div-schedule">
                    <select
                      onChange={(e) =>
                        handleSelectChange(e, "inicio", "lunes", index)
                      }
                    >
                      {horas.map((horaInicio, index) => (
                        <option
                          key={index}
                          value={horaInicio}
                          selected={horaInicio === intervalo.split("-")[0]}
                        >
                          {horaInicio}
                        </option>
                      ))}
                    </select>
                    <p>-</p>
                    <select
                      onChange={(e) =>
                        handleSelectChange(e, "fin", "lunes", index)
                      }
                    >
                      {horas.map((horaFin, index) => (
                        <option
                          key={index}
                          value={horaFin}
                          selected={horaFin === intervalo.split("-")[1]}
                        >
                          {horaFin}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="trash">
                    <ion-icon
                      name="trash"
                      onClick={(e) => handleRemoveSchedule(e, "lunes", index)}
                    ></ion-icon>
                  </div>
                </div>
              ))
            ) : (
              <span>No seleccionado</span>
            )}
          </div>
        </div>
        <div className="day">
          <div className="column-day">
            <div className="checkbox">
              <input
                type="checkbox"
                name="martes"
                id="martes"
                checked={form.horarios.martes.isChecked}
                onChange={handleChecked}
              />
              <label htmlFor="martes">Martes</label>
            </div>
            <div className="icons">
              <ion-icon
                name="add"
                onClick={(e) => handleAddSchedule(e, "martes")}
              ></ion-icon>
              <ion-icon name="copy"></ion-icon>
            </div>
          </div>
          <div className="column-schedule">
            {form.horarios.martes.isChecked ? (
              form.horarios.martes?.schedule?.map((intervalo, index) => (
                <div key={index} id={index}>
                  <div className="div-schedule">
                    <select
                      onChange={(e) =>
                        handleSelectChange(e, "inicio", "martes", index)
                      }
                    >
                      {horas.map((horaInicio, index) => (
                        <option
                          key={index}
                          value={horaInicio}
                          selected={horaInicio === intervalo.split("-")[0]}
                        >
                          {horaInicio}
                        </option>
                      ))}
                    </select>
                    <p>-</p>
                    <select
                      onChange={(e) =>
                        handleSelectChange(e, "fin", "martes", index)
                      }
                    >
                      {horas.map((horaFin, index) => (
                        <option
                          key={index}
                          value={horaFin}
                          selected={horaFin === intervalo.split("-")[1]}
                        >
                          {horaFin}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="trash">
                    <ion-icon
                      name="trash"
                      onClick={(e) => handleRemoveSchedule(e, "martes", index)}
                    ></ion-icon>
                  </div>
                </div>
              ))
            ) : (
              <span>No seleccionado</span>
            )}
          </div>
        </div>
        <div className="day">
          <div className="column-day">
            <div className="checkbox">
              <input
                type="checkbox"
                name="miercoles"
                id="miercoles"
                checked={form.horarios.miercoles.isChecked}
                onChange={handleChecked}
              />
              <label htmlFor="miercoles">Miércoles</label>
            </div>
            <div className="icons">
              <ion-icon
                name="add"
                onClick={(e) => handleAddSchedule(e, "miercoles")}
              ></ion-icon>
              <ion-icon name="copy"></ion-icon>
            </div>
          </div>
          <div className="column-schedule">
            {form.horarios.miercoles.isChecked ? (
              form.horarios.miercoles?.schedule?.map((intervalo, index) => (
                <div key={index} id={index}>
                  <div className="div-schedule">
                    <select
                      onChange={(e) =>
                        handleSelectChange(e, "inicio", "miercoles", index)
                      }
                    >
                      {horas.map((horaInicio, index) => (
                        <option
                          key={index}
                          value={horaInicio}
                          selected={horaInicio === intervalo.split("-")[0]}
                        >
                          {horaInicio}
                        </option>
                      ))}
                    </select>
                    <p>-</p>
                    <select
                      onChange={(e) =>
                        handleSelectChange(e, "fin", "miercoles", index)
                      }
                    >
                      {horas.map((horaFin, index) => (
                        <option
                          key={index}
                          value={horaFin}
                          selected={horaFin === intervalo.split("-")[1]}
                        >
                          {horaFin}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="trash">
                    <ion-icon
                      name="trash"
                      onClick={(e) =>
                        handleRemoveSchedule(e, "miercoles", index)
                      }
                    ></ion-icon>
                  </div>
                </div>
              ))
            ) : (
              <span>No seleccionado</span>
            )}
          </div>
        </div>
        <div className="day">
          <div className="column-day">
            <div className="checkbox">
              <input
                type="checkbox"
                name="jueves"
                id="jueves"
                checked={form.horarios.jueves.isChecked}
                onChange={handleChecked}
              />
              <label htmlFor="jueves">Jueves</label>
            </div>
            <div className="icons">
              <ion-icon
                name="add"
                onClick={(e) => handleAddSchedule(e, "jueves")}
              ></ion-icon>
              <ion-icon name="copy"></ion-icon>
            </div>
          </div>
          <div className="column-schedule">
            {form.horarios.jueves.isChecked ? (
              form.horarios.jueves?.schedule?.map((intervalo, index) => (
                <div key={index} id={index}>
                  <div className="div-schedule">
                    <select
                      onChange={(e) =>
                        handleSelectChange(e, "inicio", "jueves", index)
                      }
                    >
                      {horas.map((horaInicio, index) => (
                        <option
                          key={index}
                          value={horaInicio}
                          selected={horaInicio === intervalo.split("-")[0]}
                        >
                          {horaInicio}
                        </option>
                      ))}
                    </select>
                    <p>-</p>
                    <select
                      onChange={(e) =>
                        handleSelectChange(e, "fin", "jueves", index)
                      }
                    >
                      {horas.map((horaFin, index) => (
                        <option
                          key={index}
                          value={horaFin}
                          selected={horaFin === intervalo.split("-")[1]}
                        >
                          {horaFin}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="trash">
                    <ion-icon
                      name="trash"
                      onClick={(e) => handleRemoveSchedule(e, "jueves", index)}
                    ></ion-icon>
                  </div>
                </div>
              ))
            ) : (
              <span>No seleccionado</span>
            )}
          </div>
        </div>
        <div className="day">
          <div className="column-day">
            <div className="checkbox">
              <input
                type="checkbox"
                name="viernes"
                id="viernes"
                checked={form.horarios.viernes.isChecked}
                onChange={handleChecked}
              />
              <label htmlFor="viernes">Viérnes</label>
            </div>
            <div className="icons">
              <ion-icon
                name="add"
                onClick={(e) => handleAddSchedule(e, "viernes")}
              ></ion-icon>
              <ion-icon name="copy"></ion-icon>
            </div>
          </div>
          <div className="column-schedule">
            {form.horarios.viernes.isChecked ? (
              form.horarios.viernes?.schedule?.map((intervalo, index) => (
                <div key={index} id={index}>
                  <div className="div-schedule">
                    <select
                      onChange={(e) =>
                        handleSelectChange(e, "inicio", "viernes", index)
                      }
                    >
                      {horas.map((horaInicio, index) => (
                        <option
                          key={index}
                          value={horaInicio}
                          selected={horaInicio === intervalo.split("-")[0]}
                        >
                          {horaInicio}
                        </option>
                      ))}
                    </select>
                    <p>-</p>
                    <select
                      onChange={(e) =>
                        handleSelectChange(e, "fin", "viernes", index)
                      }
                    >
                      {horas.map((horaFin, index) => (
                        <option
                          key={index}
                          value={horaFin}
                          selected={horaFin === intervalo.split("-")[1]}
                        >
                          {horaFin}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="trash">
                    <ion-icon
                      name="trash"
                      onClick={(e) => handleRemoveSchedule(e, "viernes", index)}
                    ></ion-icon>
                  </div>
                </div>
              ))
            ) : (
              <span>No seleccionado</span>
            )}
          </div>
        </div>
        <div className="day">
          <div className="column-day">
            <div className="checkbox">
              <input
                type="checkbox"
                name="sabado"
                id="sabado"
                checked={form.horarios.sabado.isChecked}
                onChange={handleChecked}
              />
              <label htmlFor="sabado">Sábado</label>
            </div>
            <div className="icons">
              <ion-icon
                name="add"
                onClick={(e) => handleAddSchedule(e, "sabado")}
              ></ion-icon>
              <ion-icon name="copy"></ion-icon>
            </div>
          </div>
          <div className="column-schedule">
            {form.horarios.sabado.isChecked ? (
              form.horarios.sabado?.schedule?.map((intervalo, index) => (
                <div key={index} id={index}>
                  <div className="div-schedule">
                    <select
                      onChange={(e) =>
                        handleSelectChange(e, "inicio", "sabado", index)
                      }
                    >
                      {horas.map((horaInicio, index) => (
                        <option
                          key={index}
                          value={horaInicio}
                          selected={horaInicio === intervalo.split("-")[0]}
                        >
                          {horaInicio}
                        </option>
                      ))}
                    </select>
                    <p>-</p>
                    <select
                      onChange={(e) =>
                        handleSelectChange(e, "fin", "sabado", index)
                      }
                    >
                      {horas.map((horaFin, index) => (
                        <option
                          key={index}
                          value={horaFin}
                          selected={horaFin === intervalo.split("-")[1]}
                        >
                          {horaFin}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="trash">
                    <ion-icon
                      name="trash"
                      onClick={(e) => handleRemoveSchedule(e, "sabado", index)}
                    ></ion-icon>
                  </div>
                </div>
              ))
            ) : (
              <span>No seleccionado</span>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SelectAvailableHours;
/*
    {dias.map((dia) => (
          <div className="day">
            <div className="column-day">
              <div className="checkbox">
                <input
                  type="checkbox"
                  name={dia}
                  id={dia}
                  checked={form.horarios[dia]?.isChecked}
                  onChange={handleChecked}
                />
                <label htmlFor={dia}>{dia}</label>
              </div>
              <div className="icons">
                <ion-icon
                  name="add"
                  onClick={(e) => handleAddSchedule(e, dia)}
                ></ion-icon>
                <ion-icon name="copy"></ion-icon>
              </div>
            </div>
            <div className="column-schedule">
              {form.horarios[dia]?.isChecked ? (
                form.horarios[dia]?.schedule?.map((intervalo, index) => (
                  <div key={index} id={index}>
                    <div className="div-schedule">
                      <select
                        onChange={(e) =>
                          handleSelectChange(e, "inicio", dia, index)
                        }
                      >
                        {horas.map((horaInicio, index) => (
                          <option
                            key={index}
                            value={horaInicio}
                            selected={horaInicio === intervalo.split("-")[0]}
                          >
                            {horaInicio}
                          </option>
                        ))}
                      </select>
                      <p>-</p>
                      <select
                        onChange={(e) =>
                          handleSelectChange(e, "fin", dia, index)
                        }
                      >
                        {horas.map((horaFin, index) => (
                          <option
                            key={index}
                            value={horaFin}
                            selected={horaFin === intervalo.split("-")[1]}
                          >
                            {horaFin}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="trash">
                      <ion-icon
                        name="trash"
                        onClick={(e) => handleRemoveSchedule(e, dia, index)}
                      ></ion-icon>
                    </div>
                  </div>
                ))
              ) : (
                <span>No seleccionado</span>
              )}
            </div>
          </div>
        ))}
*/
//
