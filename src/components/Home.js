import "./Home.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserDataContext } from "./UserDataContext";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//import { useState } from "react";
//import CreateMeeting from "../CreateMeeting";

const Home = () => {
  const { handleChange, token } = useContext(UserDataContext);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [disbledBtn, setDisabledBtn] = useState(false);
  //26IDIXU5

  const handleJoinMeeting = async () => {
    setMessage("Buscando reunión...");
    setDisabledBtn(true);
    try {
      const res = await axios.get(
        `https://camtomx-4c4e45a60b73.herokuapp.com/api/apps/w2m/get-meeting-info/${token}`
      );
      console.log(res);

      if (res.status === 200) {
        setTimeout(() => {
          setMessage("");
        }, 1000);

        navigate(`/join-meeting`);
      }
    } catch (err) {
      if (err.response.status === 404) {
        setMessage("Token no encontrado");
        setTimeout(() => {
          setMessage("");
          setDisabledBtn(false);
        }, 1500);
      }
    }
  };

  return (
    <div className="home-container">
      <h1>Coordina reuniones sin esfuerzo</h1>
      <h3>
        Encuentra horarios convenientes para todos con nuestra herramienta de
        programación
      </h3>
      <div className="token-container">
        <h3>¿Te invitaron a un evento?</h3>
        <input
          type="text"
          placeholder="Ingresa el código aquí"
          id="token"
          onChange={handleChange}
          value={token}
          name="token"
          autoComplete="off"
        />
        <span>{message}</span>
        <button disabled={disbledBtn} onClick={handleJoinMeeting}>
          Unirme al evento
        </button>
      </div>
      <Link to="/create-meeting">
        <button>Crear nuevo evento</button>
      </Link>
    </div>
  );
};

export default Home;