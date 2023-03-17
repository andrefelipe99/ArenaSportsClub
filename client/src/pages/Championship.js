import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
//import { Link } from "react-router-dom";
import ButtonResume from "../components/Championship/ButtonResume";
import ButtonMatchs from "../components/Championship/ButtonMatchs";
import ButtonTable from "../components/Championship/ButtonTable";
import ButtonStatistic from "../components/Championship/ButtonStatistic";
import "../styles/pages/Championship.css";

export function Championship() {
  const [championship, setChampionship] = useState([]);

  const [buttonChange, setButtonChange] = useState({
    result: true,
    calendar: false,
    table: false,
    statistic: false,
  });

  const changeSelected = (buttonName) => {
    if (buttonName === "buttonResume") {
      setButtonChange({
        result: true,
        calendar: false,
        table: false,
        statistic: false,
      });
    } else if (buttonName === "buttonMatchs") {
      setButtonChange({
        result: false,
        calendar: true,
        table: false,
        statistic: false,
      });
    } else if (buttonName === "buttonTable") {
      setButtonChange({
        result: false,
        calendar: false,
        table: true,
        statistic: false,
      });
    } else {
      setButtonChange({
        result: false,
        calendar: false,
        table: false,
        statistic: true,
      });
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/camp")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.camp);
        setChampionship(data.camp);
      });
  }, []);

  return (
    <Container>
      <div>
        {typeof championship[1]?.name === "undefined" ? (
          <div id="match-section_title">
            <span> CAMPEONATO NÃO ENCONTRADO </span>
          </div>
        ) : (
          <>
            <div className="heading">
              <img
                className="heading_logo heading_logo--1"
                src={championship[1].img}
                alt={`${championship[1].name}`}
                width="128px"
              />
              <div className="heading_title">
                <div className="heading_name">{championship[1].name}</div>
              </div>
            </div>
            <div className="button-group-championship">
              <Button
                id={
                  buttonChange.result
                    ? "button-championship-selected"
                    : "button-championship"
                }
                title="Resultados"
                onClick={() => changeSelected("buttonResume")}
              >
                RESULTADOS
              </Button>
              <Button
                id={
                  buttonChange.calendar
                    ? "button-championship-selected"
                    : "button-championship"
                }
                title="Calendário"
                onClick={() => changeSelected("buttonMatchs")}
              >
                CALENDÁRIO
              </Button>
              <Button
                id={
                  buttonChange.table
                    ? "button-championship-selected"
                    : "button-championship"
                }
                title="Tabela"
                onClick={() => changeSelected("buttonTable")}
              >
                TABELA
              </Button>
              <Button
                id={
                  buttonChange.statistic
                    ? "button-championship-selected"
                    : "button-championship"
                }
                title="Estatísticas"
                onClick={() => changeSelected("buttonStatistic")}
              >
                ESTATÍSTICAS
              </Button>
            </div>

            <div>
              <ButtonResume
                actived={buttonChange.result}
                championship={championship}
              />
              <ButtonMatchs
                actived={buttonChange.calendar}
                championship={championship}
              />
              <ButtonTable
                actived={buttonChange.table}
                championship={championship}
              />
              <ButtonStatistic
                actived={buttonChange.statistic}
                championship={championship}
              />
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
