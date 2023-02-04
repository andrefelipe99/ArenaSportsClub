import Container from "react-bootstrap/Container";
import "../styles/components/ButtonSum.css";
import { IoMdFootball } from "react-icons/io";
import { BsFileFill } from "react-icons/bs";
import { IconContext } from "react-icons/lib";

function CountGoals(event, half) {
  var countHome = 0;
  var countAway = 0;
  event.map((event, i) => {
    if (
      (event.tipo === "GOL" || event.tipo === "GC") &&
      parseInt(event.tempo.replace("'", "")) <= 45 &&
      half === "first-half"
    ) {
      if (event.lado === "casa") {
        countHome++;
      } else {
        countAway++;
      }
    } else if (
      (event.tipo === "GOL" || event.tipo === "GC") &&
      parseInt(event.tempo.replace("'", "")) > 45 &&
      half === "second-half"
    ) {
      if (event.lado === "casa") {
        countHome++;
      } else {
        countAway++;
      }
    }
    return <></>;
  });
  return countHome + " - " + countAway;
}

function Events(event, className) {
  if (className === "sum-icon-home") {
    if (event.tipo === "GOL") {
      return (
        <div className={className}>
          <div className="time-box"> {event.tempo} </div>
          <div className="sum-icon">
            {" "}
            <IoMdFootball title="Gol marcado" />
          </div>
          <div> {event.descricao}</div>
        </div>
      );
    } else if (event.tipo === "CA") {
      return (
        <div className={className}>
          <div className="time-box"> {event.tempo} </div>
          <div className="sum-icon">
            {" "}
            <IconContext.Provider value={{ color: "yellow" }}>
              <BsFileFill title="Cartão Amarelo" />
            </IconContext.Provider>
          </div>
          <div> {event.descricao}</div>
        </div>
      );
    } else if (event.tipo === "CV") {
      return (
        <div className={className}>
          <div className="time-box"> {event.tempo} </div>
          <div className="sum-icon">
            {" "}
            <IconContext.Provider value={{ color: "red" }}>
              <BsFileFill title="Cartão Vermelho" />
            </IconContext.Provider>
          </div>
          <div> {event.descricao}</div>
        </div>
      );
    } else if (event.tipo === "GC") {
      return (
        <div className={className}>
          <div className="time-box"> {event.tempo} </div>
          <div className="sum-icon">
            {" "}
            <IconContext.Provider value={{ color: "red" }}>
              <IoMdFootball title="Gol contra" />
            </IconContext.Provider>
          </div>
          <div> {event.descricao}</div>
        </div>
      );
    } else if (event.tipo === "CAV") {
      return (
        <div className={className}>
          <div className="time-box"> {event.tempo} </div>
          <>
            <div className="sum-icon">
              {" "}
              <IconContext.Provider value={{ color: "yellow" }}>
                <BsFileFill title="Cartão Amarelo" />
              </IconContext.Provider>
              <IconContext.Provider value={{ color: "red" }}>
                <BsFileFill title="Cartão Vermelho" />
              </IconContext.Provider>
            </div>
          </>
          <div> {event.descricao}</div>
        </div>
      );
    } else {
      return <></>;
    }
  } else {
    if (event.tipo === "GOL") {
      return (
        <div className={className}>
          <div> {event.descricao}</div>
          <div className="sum-icon">
            {" "}
            <IoMdFootball title="Gol marcado" />
          </div>
          <div className="time-box"> {event.tempo} </div>
        </div>
      );
    } else if (event.tipo === "CA") {
      return (
        <div className={className}>
          <div> {event.descricao}</div>
          <div className="sum-icon">
            {" "}
            <IconContext.Provider value={{ color: "yellow" }}>
              <BsFileFill title="Cartão Amarelo" />
            </IconContext.Provider>
          </div>
          <div className="time-box"> {event.tempo} </div>
        </div>
      );
    } else if (event.tipo === "CV") {
      return (
        <div className={className}>
          <div> {event.descricao}</div>
          <div className="sum-icon">
            {" "}
            <IconContext.Provider value={{ color: "red" }}>
              <BsFileFill title="Cartão Vermelho" />
            </IconContext.Provider>
          </div>
          <div className="time-box"> {event.tempo} </div>
        </div>
      );
    } else if (event.tipo === "GC") {
      return (
        <div className={className}>
          <div> {event.descricao}</div>
          <div className="sum-icon">
            {" "}
            <IconContext.Provider value={{ color: "red" }}>
              <IoMdFootball title="Gol contra" />
            </IconContext.Provider>
          </div>
          <div className="time-box"> {event.tempo} </div>
        </div>
      );
    } else if (event.tipo === "CAV") {
      return (
        <div className={className}>
          <div> {event.descricao}</div>
          <>
            <div className="sum-icon">
              {" "}
              <IconContext.Provider value={{ color: "yellow" }}>
                <BsFileFill title="Cartão Amarelo" />
              </IconContext.Provider>
              <IconContext.Provider value={{ color: "red" }}>
                <BsFileFill title="Cartão Vermelho" />
              </IconContext.Provider>
            </div>
          </>
          <div className="time-box"> {event.tempo} </div>
        </div>
      );
    } else {
      return <></>;
    }
  }
}

function ButtonSumMatch({ actived, listMatch }) {
  return (
    actived && (
      <Container id="container-buttonSum">
        <div id="sum-section">
          <div id="sum-section_title">
            <span> 1º TEMPO </span>
            <span>
              {" "}
              {CountGoals(listMatch.partida[0].eventos, "first-half")}
            </span>
          </div>
          <div className="sum-sideBox">
            {typeof listMatch.partida === "undefined" ? (
              <p>Loading...</p>
            ) : (
              listMatch.partida[0].eventos.map((event, i) => (
                <>
                  {parseInt(event.tempo.replace("'", "")) <= 45 ? (
                    event.lado === "casa" ? (
                      <div className="sum-event" key={i}>
                        {Events(event, "sum-icon-home")}
                      </div>
                    ) : (
                      <div className="sum-event" key={i}>
                        {Events(event, "sum-icon-away")}
                      </div>
                    )
                  ) : (
                    <></>
                  )}
                </>
              ))
            )}
          </div>
        </div>
        <div id="sum-section">
          <div id="sum-section_title">
            <span> 2º TEMPO </span>
            <span>
              {" "}
              {CountGoals(listMatch.partida[0].eventos, "second-half")}
            </span>
          </div>

          <div className="sum-sideBox">
            {typeof listMatch.partida === "undefined" ? (
              <p>Loading...</p>
            ) : (
              listMatch.partida[0].eventos.map((event, i) => (
                <>
                  {parseInt(event.tempo.replace("'", "")) > 45 ? (
                    event.lado === "casa" ? (
                      <div className="sum-event" key={i}>
                        {Events(event, "sum-icon-home")}
                      </div>
                    ) : (
                      <div className="sum-event" key={i}>
                        {Events(event, "sum-icon-away")}
                      </div>
                    )
                  ) : (
                    <></>
                  )}
                </>
              ))
            )}
          </div>
        </div>
      </Container>
    )
  );
}

export default ButtonSumMatch;
