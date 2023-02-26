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
    resultado: true,
    calendario: false,
    tabela: false,
    estatistica: false,
  });

  const changeSelected = (buttonName) => {
    if (buttonName === "buttonResume") {
      setButtonChange({
        resultado: true,
        calendario: false,
        tabela: false,
        estatistica: false,
      });
    } else if (buttonName === "buttonMatchs") {
      setButtonChange({
        resultado: false,
        calendario: true,
        tabela: false,
        estatistica: false,
      });
    } else if (buttonName === "buttonTable") {
      setButtonChange({
        resultado: false,
        calendario: false,
        tabela: true,
        estatistica: false,
      });
    } else {
      setButtonChange({
        resultado: false,
        calendario: false,
        tabela: false,
        estatistica: true,
      });
    }
  };

  useEffect(() => {
    fetch("/camp")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.camp);
        setChampionship(data.camp);
      });
  }, []);

  return (
    <Container>
      <div>
        {typeof championship[0]?.name === "undefined" ? (
          <div id="match-section_title">
            <span> CAMPEONATO NÃO ENCONTRADO </span>
          </div>
        ) : (
          <>
            <div className="heading">
              <img
                className="heading_logo heading_logo--1"
                src={championship[0].img}
                alt={`${championship[0].name}`}
                width="128px"
              />
              <div className="heading_title">
                <div className="heading_name">{championship[0].name}</div>
              </div>
              <div className="heading_info">{championship[0].season}</div>
            </div>
            <div className="button-group-championship">
              <Button
                id={
                  buttonChange.resultado
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
                  buttonChange.calendario
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
                  buttonChange.tabela
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
                  buttonChange.estatistica
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
                actived={buttonChange.resultado}
                listMatch={championship}
              />
              <ButtonMatchs
                actived={buttonChange.calendario}
                listMatch={championship}
              />
              <ButtonTable
                actived={buttonChange.tabela}
                listMatch={championship}
              />
              <ButtonStatistic
                actived={buttonChange.estatistica}
                listMatch={championship}
              />
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
