import React from "react";
import Container from "react-bootstrap/Container";
import { IoMdFootball } from "react-icons/io";
import { BsFileFill } from "react-icons/bs";
import { IconContext } from "react-icons/lib";
import "../styles/components/ButtonSum.css";

function ButtonSumMatch({ actived, listMatch }) {
  function CountGoals(event, half) {
    var countHome = 0;
    var countAway = 0;
    event.map((event) => {
      if (
        (event.type === "GOAL" || event.type === "OG") &&
        parseInt(event.time.replace("'", "")) <= 45 &&
        half === "first-half"
      ) {
        if (event.side === "home") {
          countHome++;
        } else {
          countAway++;
        }
      } else if (
        (event.type === "GOAL" || event.type === "OG") &&
        parseInt(event.time.replace("'", "")) > 45 &&
        half === "second-half"
      ) {
        if (event.side === "home") {
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
      if (event.type === "GOAL") {
        return (
          <div className={className}>
            <div className="time-box"> {event.time} </div>
            <div className="sum-icon">
              <IoMdFootball title="Gol marcado" />
            </div>
            <div> {event.description}</div>
          </div>
        );
      } else if (event.type === "YC") {
        return (
          <div className={className}>
            <div className="time-box"> {event.time} </div>
            <div className="sum-icon">
              <IconContext.Provider value={{ color: "yellow" }}>
                <BsFileFill title="Cartão Amarelo" />
              </IconContext.Provider>
            </div>
            <div> {event.description}</div>
          </div>
        );
      } else if (event.type === "RC") {
        return (
          <div className={className}>
            <div className="time-box"> {event.time} </div>
            <div className="sum-icon">
              <IconContext.Provider value={{ color: "red" }}>
                <BsFileFill title="Cartão Vermelho" />
              </IconContext.Provider>
            </div>
            <div> {event.description}</div>
          </div>
        );
      } else if (event.type === "OG") {
        return (
          <div className={className}>
            <div className="time-box"> {event.time} </div>
            <div className="sum-icon">
              <IconContext.Provider value={{ color: "red" }}>
                <IoMdFootball title="Gol contra" />
              </IconContext.Provider>
            </div>
            <div> {event.description}</div>
          </div>
        );
      } else if (event.type === "YR") {
        return (
          <div className={className}>
            <div className="time-box"> {event.time} </div>

            <div className="sum-icon">
              <IconContext.Provider value={{ color: "yellow" }}>
                <BsFileFill title="Cartão Amarelo" />
              </IconContext.Provider>
              <IconContext.Provider value={{ color: "red" }}>
                <BsFileFill title="Cartão Vermelho" />
              </IconContext.Provider>
            </div>

            <div> {event.description}</div>
          </div>
        );
      } else {
        return <></>;
      }
    } else {
      if (event.type === "GOAL") {
        return (
          <div className={className}>
            <div> {event.description}</div>
            <div className="sum-icon">
              <IoMdFootball title="Gol marcado" />
            </div>
            <div className="time-box"> {event.time} </div>
          </div>
        );
      } else if (event.type === "YC") {
        return (
          <div className={className}>
            <div> {event.description}</div>
            <div className="sum-icon">
              <IconContext.Provider value={{ color: "yellow" }}>
                <BsFileFill title="Cartão Amarelo" />
              </IconContext.Provider>
            </div>
            <div className="time-box"> {event.time} </div>
          </div>
        );
      } else if (event.type === "RC") {
        return (
          <div className={className}>
            <div> {event.description}</div>
            <div className="sum-icon">
              <IconContext.Provider value={{ color: "red" }}>
                <BsFileFill title="Cartão Vermelho" />
              </IconContext.Provider>
            </div>
            <div className="time-box"> {event.time} </div>
          </div>
        );
      } else if (event.type === "OG") {
        return (
          <div className={className}>
            <div> {event.description}</div>
            <div className="sum-icon">
              <IconContext.Provider value={{ color: "red" }}>
                <IoMdFootball title="Gol contra" />
              </IconContext.Provider>
            </div>
            <div className="time-box"> {event.time} </div>
          </div>
        );
      } else if (event.type === "YR") {
        return (
          <div className={className}>
            <div> {event.description}</div>

            <div className="sum-icon">
              <IconContext.Provider value={{ color: "yellow" }}>
                <BsFileFill title="Cartão Amarelo" />
              </IconContext.Provider>
              <IconContext.Provider value={{ color: "red" }}>
                <BsFileFill title="Cartão Vermelho" />
              </IconContext.Provider>
            </div>

            <div className="time-box"> {event.time} </div>
          </div>
        );
      } else {
        return <></>;
      }
    }
  }

  return (
    actived && (
      <Container id="container-buttonSum">
        {listMatch[0]?.events.length > 0 ? (
          <>
            <div id="sum-section">
              <div id="sum-section_title">
                <span> 1º TEMPO </span>
                <span> {CountGoals(listMatch[0]?.events, "first-half")}</span>
              </div>
              <div className="sum-sideBox">
                {typeof listMatch[0]?.events === "undefined" ? (
                  <p>Loading...</p>
                ) : (
                  listMatch[0].events.map((event, i) => (
                    <div key={i}>
                      {parseInt(event.time.replace("'", "")) <= 45 ? (
                        event.side === "home" ? (
                          <div className="sum-event">
                            {Events(event, "sum-icon-home")}
                          </div>
                        ) : (
                          <div className="sum-event">
                            {Events(event, "sum-icon-away")}
                          </div>
                        )
                      ) : (
                        <></>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
            <div id="sum-section">
              <div id="sum-section_title">
                <span> 2º TEMPO </span>
                <span> {CountGoals(listMatch[0]?.events, "second-half")}</span>
              </div>

              <div className="sum-sideBox">
                {typeof listMatch[0]?.events === "undefined" ? (
                  <p>Loading...</p>
                ) : (
                  listMatch[0].events.map((event, i) => (
                    <div key={i}>
                      {parseInt(event.time.replace("'", "")) > 45 ? (
                        event.side === "home" ? (
                          <div className="sum-event">
                            {Events(event, "sum-icon-home")}
                          </div>
                        ) : (
                          <div className="sum-event">
                            {Events(event, "sum-icon-away")}
                          </div>
                        )
                      ) : (
                        <></>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        ) : (
          <div id="sum-section_Notitle">
            <span> SUMÁRIO NÃO DISPONIBILIZADO </span>
          </div>
        )}
      </Container>
    )
  );
}

export default ButtonSumMatch;
