import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import ButtonSumMatch from "../components/Match/ButtonSum";
import ButtonEstMatch from "../components/Match/ButtonEst";
import ButtonForMatch from "../components/Match/ButtonFor";
import MatchDataService from "../services/match.js";
import { useParams } from "react-router-dom";
import "../styles/pages/Match.css";

export function Match() {
  let { id } = useParams();
  const [listMatch, setListMatch] = useState([{}]);
  const [buttonChange, setButtonChange] = useState({
    sumario: true,
    estatistica: false,
    formacao: false,
  });

  const changeSelected = (buttonName) => {
    if (buttonName === "buttonSum") {
      setButtonChange({ sumario: true, estatistica: false, formacao: false });
    } else if (buttonName === "buttonFor") {
      setButtonChange({ sumario: false, estatistica: false, formacao: true });
    } else {
      setButtonChange({ sumario: false, estatistica: true, formacao: false });
    }
  };

  useEffect(() => {
    MatchDataService.getMatch(id).then((response) =>
      setListMatch(response.data)
    );
  }, [id]);

  return (
    <Container>
      <div>
        <div>
          {typeof listMatch[0]?.teams?.homeImg === "undefined" ? (
            <div id="match-section_title">
              <span> PARTIDA NÃO ENCONTRADA </span>
            </div>
          ) : (
            <>
              <div className="nameCamp">
                <h1>{listMatch[0].championship}</h1>
              </div>
              <Row md={12} id="row-content-match">
                <div className="content-match">
                  <Col md={3} id="col-content-match">
                    <img
                      src={listMatch[0].teams.homeImg}
                      alt={`${listMatch[0].teams.homeName}`}
                      width="128px"
                    />
                    <span className="teams-name">
                      {listMatch[0].teams.homeName}
                    </span>
                  </Col>
                  <Col md={6} id="col-results-match">
                    <div>
                      <span className="p_matchTime">{listMatch[0].turn}</span>
                    </div>
                    <div>
                      <span className="number-results-match">
                        {listMatch[0].scoreHome}
                      </span>
                      <span className="number-results-match">-</span>
                      <span className="number-results-match">
                        {listMatch[0].scoreAway}
                      </span>
                    </div>
                    <div>
                      <span className=".p_matchTime">{listMatch[0].time}</span>
                    </div>
                  </Col>
                  <Col md={3} id="col-content-match">
                    <img
                      src={listMatch[0].teams.awayImg}
                      alt={`${listMatch[0].teams.awayName}`}
                      width="128px"
                    />
                    <span className="teams-name">
                      {listMatch[0].teams.awayName}
                    </span>
                  </Col>

                  <p className="p_matchTime">
                    {listMatch[0].day} - {listMatch[0].schedule}
                  </p>
                  {listMatch[0].stadium !== "TBC (TBC)" ? (
                    <p className="p_matchStadium"> {listMatch[0].stadium}</p>
                  ) : (
                    <p className="p_matchStadium"></p>
                  )}

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
                <ButtonEstMatch
                  actived={buttonChange.estatistica}
                  listMatch={listMatch}
                />
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
