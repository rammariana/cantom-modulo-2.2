import React, { useContext, useEffect } from "react";
//import { UserDataContext } from "./UserDataContext";
import { useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./MeetingFinal.css";
import { UserDataContext } from "./UserDataContext";
import CopyIcon from "../assets/copy-icon.svg";

const WeekTable = () => {
  const [slots, setSlots] = useState(weekLapsesGlobalArray);
  const [form, setForm] = useState({});
  const { setToken, token } = useContext(UserDataContext);
  const [usersInMeeting, setUsersInMeeting] = useState([]);
  const [copied, setCopied] = useState(false);

  const params = useParams();
  setToken(params.meetingId.replace(/:/, ""));
  //console.log(token);
  //console.log(form);
  useEffect(() => {
    async function fechData() {
      try {
        const res = await axios.get(
          `https://camtomx-4c4e45a60b73.herokuapp.com/api/apps/w2m/get-meeting-info/${token}`,
          {
            params: {
              meetingId: token,
            },
          }
        );
        const infoUsuarios = res.data.users;
        const userNames = infoUsuarios.map((e) => e.userName);
        setUsersInMeeting(userNames);
        setForm(res.data);
        setSlots(res.data.weeklyTable);
        console.log(form);
      } catch (err) {
        console.log(err);
      }
    }
    fechData();
  }, [token]);
  // copiar enlace

  const handleCopyLink = () => {
    const linkToCopy = `whentomeetup.com/meeting-final/${token}`;
    try {
      navigator.clipboard.writeText(linkToCopy);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      alert("No se pudo copiar el enlace: ", error);
    }
  };

  // Determine the color based on the count
  const getColor = (usersAvailable) => {
    const numberOfUsers = form.users?.length;

    if (numberOfUsers === usersAvailable) {
      return `rgb(134, 156, 255)`;
    } else {
      let intensity1 = 103 * (usersAvailable / numberOfUsers);
      let intensity2 = 139 * (usersAvailable / numberOfUsers);
      return `rgb(${255 - intensity1}, ${255 - intensity2}, 255)`;
    }
  };

  return (
    <div className="meeting-final-container">
      <h1>{form.eventName || "Evento " + form.meetingId}</h1>
      {/*<p>Encuentra cuando pueden asistir todos los invitados a tu evento</p>*/}
      <section className="data-container">
        <p>
          El administrador del evento es <b>{form.adminName}</b>
        </p>
        <p>
          Duración del evento: <b>{form.lengthMeeting} minutos</b>
        </p>
      </section>
      <Link to="/join-meeting">
        <button>Unirme al evento</button>
      </Link>
      <div className="copy-container">
        {copied && <span className="copied">copiado!</span>}
        <button className="no-decoration-button" onClick={handleCopyLink}>
          {" "}
          <span>
            <img src={CopyIcon} alt="" />
          </span>
          Copiar enlace a evento
        </button>
      </div>

      {/*<Link to="/create-meeting">
        <button className="no-decoration-button">Crear nuevo evento</button>
  </Link>*/}
      <section className="users-list">
        <br />
        <h5>Usuarios en el evento</h5>
        <br />
        <div className="list">
          {usersInMeeting.map((e, index) => (
            <p key={index}>{e[0].toUpperCase().concat(e.slice(1))}</p>
          ))}
        </div>
      </section>
      <div className="gradient-container">
        <small>Ninguno disponible</small>
        <div className="gradient">
          <span class="gradient-fragment uno"></span>
          <span class="gradient-fragment dos"></span>
          <span class="gradient-fragment tres"></span>
          <span class="gradient-fragment cuatro"></span>
          <span class="gradient-fragment cinco"></span>
        </div>
        <small>Todos disponibles</small>
      </div>
      <table className="styled-table">
        <thead>
          <tr style={{ fontSize: "3vw" }}>
            <th className="empty-cell"></th>
            <th>D</th>
            <th>L</th>
            <th>M</th>
            <th>X</th>
            <th>J</th>
            <th>V</th>
            <th>S</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(slots.domingo).map((time, i) => (
            <tr style={{ fontSize: "2vw" }} key={i}>
              {time % 60 === 0 ? (
                <td className="empty-cell hours-cell">{`${time / 60}:00 `}</td>
              ) : (
                <td className="empty-cell hours-cell"></td>
              )}
              {Object.values(slots).map((day, j) => (
                <td
                  key={j}
                  style={{
                    backgroundColor: getColor(day[time]),
                    color: "white",
                  }}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

//array de prueba

export default WeekTable;

/*const userIntervals = [
  "domingo--0-60",
  "domingo--0-60",
  "domingo--0-60",
  "domingo--0-60",
  "domingo--255-320",
  "lunes--0-75",
  "martes--420-720",
  "miercoles--420-720",
  "martes--435-720",
  "viernes--1200-1260",
  "sabado--300-360",
  "domingo--600-660",
  "lunes--120-180",
  "martes--900-960",
  "miercoles--600-660",
  "jueves--360-420",
  "viernes--240-300",
  "sabado--1080-1140",
  "domingo--1200-1260",
  "lunes--540-600",
  "martes--300-360",
  "miercoles--720-780",
  "jueves--660-720",
  "viernes--780-840",
  "sabado--960-1020",
  "domingo--540-600",
  "lunes--780-840",
  "martes--240-300",
  "miercoles--120-180",
  "jueves--720-780",
  "viernes--1140-1200",
  "sabado--240-300",
  "domingo--360-420",
  "lunes--360-420",
  "martes--840-900",
  "miercoles--840-900",
  "jueves--300-360",
  "viernes--900-960",
  "sabado--120-180",
  "domingo--180-240",
  "lunes--960-1020",
  "martes--600-660",
  "miercoles--660-720",
  "jueves--780-840",
  "viernes--1020-1080",
  "sabado--360-420",
  "domingo--480-540",
  "lunes--420-480",
  "martes--720-780",
  "miercoles--480-540",
  "jueves--840-900",
  "viernes--360-420",
  "sabado--840-900",
  "domingo--720-780",
  "lunes--1020-1080",
  "martes--1020-1080",
  "miercoles--1020-1080",
  "jueves--1020-1080",
  "viernes--1020-1080",
  "sabado--1020-1080",
  "domingo--0-60",
  "domingo--0-60",
  "domingo--0-60",
  "domingo--0-60",
  "domingo--255-320",
  "lunes--0-75",
  "martes--420-720",
  "miercoles--420-720",
  "martes--435-720",
  "viernes--1200-1260",
  "sabado--300-360",
  "domingo--600-660",
  "lunes--120-180",
  "martes--900-960",
  "miercoles--600-660",
  "jueves--360-420",
  "viernes--240-300",
  "sabado--1080-1140",
  "domingo--1200-1260",
  "lunes--540-600",
  "martes--300-360",
  "miercoles--720-780",
  "jueves--660-720",
  "viernes--780-840",
  "sabado--960-1020",
  "domingo--540-600",
  "lunes--780-840",
  "martes--240-300",
  "miercoles--120-180",
  "jueves--720-780",
  "viernes--1140-1200",
  "sabado--240-300",
  "domingo--360-420",
  "lunes--360-420",
  "martes--840-900",
  "miercoles--840-900",
  "jueves--300-360",
  "viernes--900-960",
  "sabado--120-180",
  "domingo--180-240",
  "lunes--960-1020",
  "martes--600-660",
  "miercoles--660-720",
  "jueves--780-840",
  "viernes--1020-1080",
  "sabado--360-420",
  "domingo--480-540",
  "lunes--420-480",
  "martes--720-780",
  "miercoles--480-540",
  "jueves--840-900",
  "viernes--360-420",
  "sabado--840-900",
  "domingo--720-780",
  "lunes--1020-1080",
  "martes--1020-1080",
  "miercoles--1020-1080",
  "jueves--1020-1080",
  "viernes--1020-1080",
  "sabado--1020-1080",
];*/

let weekLapsesGlobalArray = {
  domingo: {
    0: 0,
    15: 0,
    30: 0,
    45: 0,
    60: 0,
    75: 0,
    90: 0,
    105: 0,
    120: 0,
    135: 0,
    150: 0,
    165: 0,
    180: 0,
    195: 0,
    210: 0,
    225: 0,
    240: 0,
    255: 0,
    270: 0,
    285: 0,
    300: 0,
    315: 0,
    330: 0,
    345: 0,
    360: 0,
    375: 0,
    390: 0,
    405: 0,
    420: 0,
    435: 0,
    450: 0,
    465: 0,
    480: 0,
    495: 0,
    510: 0,
    525: 0,
    540: 0,
    555: 0,
    570: 0,
    585: 0,
    600: 0,
    615: 0,
    630: 0,
    645: 0,
    660: 0,
    675: 0,
    690: 0,
    705: 0,
    720: 0,
    735: 0,
    750: 0,
    765: 0,
    780: 0,
    795: 0,
    810: 0,
    825: 0,
    840: 0,
    855: 0,
    870: 0,
    885: 0,
    900: 0,
    915: 0,
    930: 0,
    945: 0,
    960: 0,
    975: 0,
    990: 0,
    1005: 0,
    1020: 0,
    1035: 0,
    1050: 0,
    1065: 0,
    1080: 0,
    1095: 0,
    1110: 0,
    1125: 0,
    1140: 0,
    1155: 0,
    1170: 0,
    1185: 0,
    1200: 0,
    1215: 0,
    1230: 0,
    1245: 0,
    1260: 0,
    1275: 0,
    1290: 0,
    1305: 0,
    1320: 0,
    1335: 0,
    1350: 0,
    1365: 0,
    1380: 0,
    1395: 0,
    1410: 0,
    1425: 0,
  },
  lunes: {
    0: 0,
    15: 0,
    30: 0,
    45: 0,
    60: 0,
    75: 0,
    90: 0,
    105: 0,
    120: 0,
    135: 0,
    150: 0,
    165: 0,
    180: 0,
    195: 0,
    210: 0,
    225: 0,
    240: 0,
    255: 0,
    270: 0,
    285: 0,
    300: 0,
    315: 0,
    330: 0,
    345: 0,
    360: 0,
    375: 0,
    390: 0,
    405: 0,
    420: 0,
    435: 0,
    450: 0,
    465: 0,
    480: 0,
    495: 0,
    510: 0,
    525: 0,
    540: 0,
    555: 0,
    570: 0,
    585: 0,
    600: 0,
    615: 0,
    630: 0,
    645: 0,
    660: 0,
    675: 0,
    690: 0,
    705: 0,
    720: 0,
    735: 0,
    750: 0,
    765: 0,
    780: 0,
    795: 0,
    810: 0,
    825: 0,
    840: 0,
    855: 0,
    870: 0,
    885: 0,
    900: 0,
    915: 0,
    930: 0,
    945: 0,
    960: 0,
    975: 0,
    990: 0,
    1005: 0,
    1020: 0,
    1035: 0,
    1050: 0,
    1065: 0,
    1080: 0,
    1095: 0,
    1110: 0,
    1125: 0,
    1140: 0,
    1155: 0,
    1170: 0,
    1185: 0,
    1200: 0,
    1215: 0,
    1230: 0,
    1245: 0,
    1260: 0,
    1275: 0,
    1290: 0,
    1305: 0,
    1320: 0,
    1335: 0,
    1350: 0,
    1365: 0,
    1380: 0,
    1395: 0,
    1410: 0,
    1425: 0,
  },
  martes: {
    0: 0,
    15: 0,
    30: 0,
    45: 0,
    60: 0,
    75: 0,
    90: 0,
    105: 0,
    120: 0,
    135: 0,
    150: 0,
    165: 0,
    180: 0,
    195: 0,
    210: 0,
    225: 0,
    240: 0,
    255: 0,
    270: 0,
    285: 0,
    300: 0,
    315: 0,
    330: 0,
    345: 0,
    360: 0,
    375: 0,
    390: 0,
    405: 0,
    420: 0,
    435: 0,
    450: 0,
    465: 0,
    480: 0,
    495: 0,
    510: 0,
    525: 0,
    540: 0,
    555: 0,
    570: 0,
    585: 0,
    600: 0,
    615: 0,
    630: 0,
    645: 0,
    660: 0,
    675: 0,
    690: 0,
    705: 0,
    720: 0,
    735: 0,
    750: 0,
    765: 0,
    780: 0,
    795: 0,
    810: 0,
    825: 0,
    840: 0,
    855: 0,
    870: 0,
    885: 0,
    900: 0,
    915: 0,
    930: 0,
    945: 0,
    960: 0,
    975: 0,
    990: 0,
    1005: 0,
    1020: 0,
    1035: 0,
    1050: 0,
    1065: 0,
    1080: 0,
    1095: 0,
    1110: 0,
    1125: 0,
    1140: 0,
    1155: 0,
    1170: 0,
    1185: 0,
    1200: 0,
    1215: 0,
    1230: 0,
    1245: 0,
    1260: 0,
    1275: 0,
    1290: 0,
    1305: 0,
    1320: 0,
    1335: 0,
    1350: 0,
    1365: 0,
    1380: 0,
    1395: 0,
    1410: 0,
    1425: 0,
  },
  miercoles: {
    0: 0,
    15: 0,
    30: 0,
    45: 0,
    60: 0,
    75: 0,
    90: 0,
    105: 0,
    120: 0,
    135: 0,
    150: 0,
    165: 0,
    180: 0,
    195: 0,
    210: 0,
    225: 0,
    240: 0,
    255: 0,
    270: 0,
    285: 0,
    300: 0,
    315: 0,
    330: 0,
    345: 0,
    360: 0,
    375: 0,
    390: 0,
    405: 0,
    420: 0,
    435: 0,
    450: 0,
    465: 0,
    480: 0,
    495: 0,
    510: 0,
    525: 0,
    540: 0,
    555: 0,
    570: 0,
    585: 0,
    600: 0,
    615: 0,
    630: 0,
    645: 0,
    660: 0,
    675: 0,
    690: 0,
    705: 0,
    720: 0,
    735: 0,
    750: 0,
    765: 0,
    780: 0,
    795: 0,
    810: 0,
    825: 0,
    840: 0,
    855: 0,
    870: 0,
    885: 0,
    900: 0,
    915: 0,
    930: 0,
    945: 0,
    960: 0,
    975: 0,
    990: 0,
    1005: 0,
    1020: 0,
    1035: 0,
    1050: 0,
    1065: 0,
    1080: 0,
    1095: 0,
    1110: 0,
    1125: 0,
    1140: 0,
    1155: 0,
    1170: 0,
    1185: 0,
    1200: 0,
    1215: 0,
    1230: 0,
    1245: 0,
    1260: 0,
    1275: 0,
    1290: 0,
    1305: 0,
    1320: 0,
    1335: 0,
    1350: 0,
    1365: 0,
    1380: 0,
    1395: 0,
    1410: 0,
    1425: 0,
  },
  jueves: {
    0: 0,
    15: 0,
    30: 0,
    45: 0,
    60: 0,
    75: 0,
    90: 0,
    105: 0,
    120: 0,
    135: 0,
    150: 0,
    165: 0,
    180: 0,
    195: 0,
    210: 0,
    225: 0,
    240: 0,
    255: 0,
    270: 0,
    285: 0,
    300: 0,
    315: 0,
    330: 0,
    345: 0,
    360: 0,
    375: 0,
    390: 0,
    405: 0,
    420: 0,
    435: 0,
    450: 0,
    465: 0,
    480: 0,
    495: 0,
    510: 0,
    525: 0,
    540: 0,
    555: 0,
    570: 0,
    585: 0,
    600: 0,
    615: 0,
    630: 0,
    645: 0,
    660: 0,
    675: 0,
    690: 0,
    705: 0,
    720: 0,
    735: 0,
    750: 0,
    765: 0,
    780: 0,
    795: 0,
    810: 0,
    825: 0,
    840: 0,
    855: 0,
    870: 0,
    885: 0,
    900: 0,
    915: 0,
    930: 0,
    945: 0,
    960: 0,
    975: 0,
    990: 0,
    1005: 0,
    1020: 0,
    1035: 0,
    1050: 0,
    1065: 0,
    1080: 0,
    1095: 0,
    1110: 0,
    1125: 0,
    1140: 0,
    1155: 0,
    1170: 0,
    1185: 0,
    1200: 0,
    1215: 0,
    1230: 0,
    1245: 0,
    1260: 0,
    1275: 0,
    1290: 0,
    1305: 0,
    1320: 0,
    1335: 0,
    1350: 0,
    1365: 0,
    1380: 0,
    1395: 0,
    1410: 0,
    1425: 0,
  },
  viernes: {
    0: 0,
    15: 0,
    30: 0,
    45: 0,
    60: 0,
    75: 0,
    90: 0,
    105: 0,
    120: 0,
    135: 0,
    150: 0,
    165: 0,
    180: 0,
    195: 0,
    210: 0,
    225: 0,
    240: 0,
    255: 0,
    270: 0,
    285: 0,
    300: 0,
    315: 0,
    330: 0,
    345: 0,
    360: 0,
    375: 0,
    390: 0,
    405: 0,
    420: 0,
    435: 0,
    450: 0,
    465: 0,
    480: 0,
    495: 0,
    510: 0,
    525: 0,
    540: 0,
    555: 0,
    570: 0,
    585: 0,
    600: 0,
    615: 0,
    630: 0,
    645: 0,
    660: 0,
    675: 0,
    690: 0,
    705: 0,
    720: 0,
    735: 0,
    750: 0,
    765: 0,
    780: 0,
    795: 0,
    810: 0,
    825: 0,
    840: 0,
    855: 0,
    870: 0,
    885: 0,
    900: 0,
    915: 0,
    930: 0,
    945: 0,
    960: 0,
    975: 0,
    990: 0,
    1005: 0,
    1020: 0,
    1035: 0,
    1050: 0,
    1065: 0,
    1080: 0,
    1095: 0,
    1110: 0,
    1125: 0,
    1140: 0,
    1155: 0,
    1170: 0,
    1185: 0,
    1200: 0,
    1215: 0,
    1230: 0,
    1245: 0,
    1260: 0,
    1275: 0,
    1290: 0,
    1305: 0,
    1320: 0,
    1335: 0,
    1350: 0,
    1365: 0,
    1380: 0,
    1395: 0,
    1410: 0,
    1425: 0,
  },
  sabado: {
    0: 0,
    15: 0,
    30: 0,
    45: 0,
    60: 0,
    75: 0,
    90: 0,
    105: 0,
    120: 0,
    135: 0,
    150: 0,
    165: 0,
    180: 0,
    195: 0,
    210: 0,
    225: 0,
    240: 0,
    255: 0,
    270: 0,
    285: 0,
    300: 0,
    315: 0,
    330: 0,
    345: 0,
    360: 0,
    375: 0,
    390: 0,
    405: 0,
    420: 0,
    435: 0,
    450: 0,
    465: 0,
    480: 0,
    495: 0,
    510: 0,
    525: 0,
    540: 0,
    555: 0,
    570: 0,
    585: 0,
    600: 0,
    615: 0,
    630: 0,
    645: 0,
    660: 0,
    675: 0,
    690: 0,
    705: 0,
    720: 0,
    735: 0,
    750: 0,
    765: 0,
    780: 0,
    795: 0,
    810: 0,
    825: 0,
    840: 0,
    855: 0,
    870: 0,
    885: 0,
    900: 0,
    915: 0,
    930: 0,
    945: 0,
    960: 0,
    975: 0,
    990: 0,
    1005: 0,
    1020: 0,
    1035: 0,
    1050: 0,
    1065: 0,
    1080: 0,
    1095: 0,
    1110: 0,
    1125: 0,
    1140: 0,
    1155: 0,
    1170: 0,
    1185: 0,
    1200: 0,
    1215: 0,
    1230: 0,
    1245: 0,
    1260: 0,
    1275: 0,
    1290: 0,
    1305: 0,
    1320: 0,
    1335: 0,
    1350: 0,
    1365: 0,
    1380: 0,
    1395: 0,
    1410: 0,
    1425: 0,
  },
};
