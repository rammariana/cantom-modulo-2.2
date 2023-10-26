import "./UserInMeeting.css";

const UserInMeeting = () => {
  const arrayDiasDosponibles = ["Lunes", "Miércoles", "Viernes"];
  // Este array viene de la api

  return (
    <div className="userInMeeting-container">
      <h1>Nombre de reunión</h1>
      <p>Bienvenid@ 'Nombre de usuario'</p>
      <div className="label-container">
        <span>1</span>
        <label>
          Dentro de los días y horarios seleccionados para el evento, elige los
          que mejor te funcionan
        </label>
      </div>
      <section className="select-schedules">
        <small>2 días disponibles</small>
        {/*<h4>
          Lunes <span>x</span>
        </h4>
        <div className="div-available-hours">
          <div className="hours">
            <div className="hour">10:00</div>
          </div>
          <div className="minutes">
            <div className="min"></div>
            <div className="min"></div>
            <div className="min"></div>
            <div className="min"></div>
          </div>
        </div>
        <div className="div-available-hours">
          <div className="hours">
            <div className="hour">11:00</div>
          </div>
          <div className="minutes">
            <div className="min"></div>
            <div className="min"></div>
            <div className="min"></div>
            <div className="min"></div>
          </div>
  </div>
  */}

        <div id="carouselExample" className="carousel slide">
          <div className="carousel-inner">
            {arrayDiasDosponibles.map((e, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={index}
              >
                <h4>{e}</h4>
                <div className="div-available-hours">
                  <div className="hours">
                    <div className="hour">10:00</div>
                  </div>
                  <div className="minutes">
                    <div className="min"></div>
                    <div className="min"></div>
                    <div className="min"></div>
                    <div className="min"></div>
                  </div>
                </div>
                <div className="div-available-hours">
                  <div className="hours">
                    <div className="hour">11:00</div>
                  </div>
                  <div className="minutes">
                    <div className="min"></div>
                    <div className="min"></div>
                    <div className="min"></div>
                    <div className="min"></div>
                  </div>
                </div>
                <div className="div-available-hours">
                  <div className="hours">
                    <div className="hour">12:00</div>
                  </div>
                  <div className="minutes">
                    <div className="min"></div>
                    <div className="min"></div>
                    <div className="min"></div>
                    <div className="min"></div>
                  </div>
                </div>
                <div className="div-available-hours">
                  <div className="hours">
                    <div className="hour">13:00</div>
                  </div>
                  <div className="minutes">
                    <div className="min"></div>
                    <div className="min"></div>
                    <div className="min"></div>
                    <div className="min"></div>
                  </div>
                </div>
                <div className="div-available-hours">
                  <div className="hours">
                    <div className="hour">14:00</div>
                  </div>
                  <div className="minutes">
                    <div className="min"></div>
                    <div className="min"></div>
                    <div className="min"></div>
                    <div className="min"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span>
              <ion-icon name="arrow-round-back"></ion-icon>
            </span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span>
              <ion-icon name="arrow-round-forward"></ion-icon>
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};
export default UserInMeeting;
/*
  <div id="carouselExample" class="carousel slide">
          <div class="carousel-inner">
            {arrayDiasDosponibles.map(
              (e, index) =>
                index >= 0 && (
                  <div class="carousel-item" key={index}>
                    <h4>{e}</h4>
                  </div>
                )
            )}
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
*/
