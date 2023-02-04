import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonSumMatch from "../components/ButtonSum";
import ButtonEstMatch from "../components/ButtonEst";
import ButtonForMatch from "../components/ButtonFor";
import "../styles/pages/Match.css";

export function Match() {
  const [listMatch, setListMatch] = useState([{}]);
  const [buttonChange, setButtonChange] = useState({
    sumario: true,
    estatistica: false,
    formacao: false,
  });

  const changeSelected = (buttonName) => {
    console.log(buttonChange);
    if (buttonName === "buttonSum") {
      setButtonChange({ sumario: true, estatistica: false, formacao: false });
    } else if (buttonName === "buttonFor") {
      setButtonChange({ sumario: false, estatistica: false, formacao: true });
    } else {
      setButtonChange({ sumario: false, estatistica: true, formacao: false });
    }
    console.log(buttonChange);
  };

  useEffect(() => {
    fetch("/partida")
      .then((response) => response.json())
      .then((data) => {
        setListMatch(data);
      });
  }, []);

  return (
    <Container>
      <div>
        <div>
          {typeof listMatch.partida === "undefined" ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="nameCamp">
                <h1>{listMatch.partida[0].campeonato}</h1>
              </div>
              <Row md={12} id="row-content-match">
                <div className="content-match">
                  <Col md={3} id="col-content-match">
                    <img
                      src={listMatch.partida[0].equipes.casaImg}
                      alt={`${listMatch.partida[0].equipes.casaNome}`}
                      width="128px"
                    />
                    <h3 className="teams-name">
                      {" "}
                      {listMatch.partida[0].equipes.casaNome}{" "}
                    </h3>
                  </Col>
                  <Col md={6} id="col-results-match">
                    <h1>
                      {listMatch.partida[0].placarCasa} X{" "}
                      {listMatch.partida[0].placarFora}{" "}
                    </h1>
                  </Col>
                  <Col md={3} id="col-content-match">
                    <img
                      src={listMatch.partida[0].equipes.foraImg}
                      alt={`${listMatch.partida[0].equipes.foraNome}`}
                      width="128px"
                    />
                    <h3 className="teams-name">
                      {" "}
                      {listMatch.partida[0].equipes.foraNome}
                    </h3>
                  </Col>

                  <p className="p_matchTime"> {listMatch.partida[0].horario}</p>
                  <p className="p_matchStadium">
                    {" "}
                    {listMatch.partida[0].estadio}
                  </p>

                  <div className="button-group-match">
                    <Button
                      id={
                        buttonChange.sumario
                          ? "button-match-selected"
                          : "button-match"
                      }
                      title="Sumário"
                      onClick={() => changeSelected("buttonSum")}
                    >
                      SUMÁRIO
                    </Button>
                    <Button
                      id={
                        buttonChange.estatistica
                          ? "button-match-selected"
                          : "button-match"
                      }
                      title="Estatísticas"
                      onClick={() => changeSelected("buttonEst")}
                    >
                      ESTATÍSTICAS
                    </Button>
                    <Button
                      id={
                        buttonChange.formacao
                          ? "button-match-selected"
                          : "button-match"
                      }
                      title="Formação"
                      onClick={() => changeSelected("buttonFor")}
                    >
                      FORMAÇÃO
                    </Button>
                  </div>
                </div>
              </Row>
              <div>
                <ButtonSumMatch
                  actived={buttonChange.sumario}
                  listMatch={listMatch}
                />
                <ButtonEstMatch actived={buttonChange.estatistica} />
                <ButtonForMatch
                  actived={buttonChange.formacao}
                  listMatch={listMatch}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </Container>
  );
}
