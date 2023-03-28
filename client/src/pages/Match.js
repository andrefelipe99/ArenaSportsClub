import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col, Spinner } from "react-bootstrap";
import ButtonSumMatch from "../components/Match/ButtonSum";
import ButtonEstMatch from "../components/Match/ButtonEst";
import ButtonForMatch from "../components/Match/ButtonFor";
import MatchDataService from "../services/match.js";
import { useParams, Link } from "react-router-dom";
import "../styles/pages/Match.css";

export function Match() {
  let { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [listMatch, setListMatch] = useState([]);
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
    MatchDataService.getMatch(id).then((response) => {
      setListMatch(response.data[0]);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      MatchDataService.getMatch(id).then((response) =>
        setListMatch(response.data[0])
      );
    }, 30000);
    return () => clearTimeout(timer);
  });

  return (
    <Container id="container-match">
      <div>
        <div>
          {loading ? (
            <div className="spinner-buttonMatchs">
              <Spinner animation="border" />
            </div>
          ) : typeof listMatch?.teams?.homeImg === "undefined" ? (
            <div className="match-section_title">
              <span>PARTIDA NÃO ENCONTRADA</span>
            </div>
          ) : (
            <>
              <div className="nameCamp">
                {listMatch.idChampionship !== "" ? (
                  <Link
                    to={`/campeonato/${listMatch.idChampionship}`}
                    className="link-match"
                  >
                    <span>{listMatch.championship}</span>
                  </Link>
                ) : (
                  <span>{listMatch.championship}</span>
                )}
              </div>
              <Col md={12} sm={12} xs={12} id="row-content-match">
                <div className="content-match">
                  <Col md={4} sm={4} xs={4} className="col-content-match">
                    <img
                      src={listMatch.teams.homeImg}
                      alt={`${listMatch.teams.homeName}`}
                      title={`${listMatch.teams.homeName}`}
                      className="img-content-match"
                    />
                  </Col>
                  <Col md={4} sm={4} xs={4} id="col-results-match">
                    <span className="number-results-match">
                      {listMatch.scoreHome}
                    </span>
                    <span className="number-results-match">-</span>
                    <span className="number-results-match">
                      {listMatch.scoreAway}
                    </span>
                  </Col>
                  <Col md={4} sm={4} xs={4} className="col-content-match">
                    <img
                      src={listMatch.teams.awayImg}
                      alt={`${listMatch.teams.awayName}`}
                      title={`${listMatch.teams.awayName}`}
                      className="img-content-match"
                    />
                  </Col>
                  <Col className="col-content-match">
                    <span className="teams-name">
                      {listMatch.teams.homeName}
                    </span>
                  </Col>
                  <Col className="col-top-match">
                    <span className="time-match">{listMatch.time}</span>
                  </Col>
                  <Col className="col-content-match">
                    <span className="teams-name">
                      {listMatch.teams.awayName}
                    </span>
                  </Col>

                  <span className="time-match">
                    {listMatch.day} - {listMatch.schedule}
                  </span>
                  <span className="time-match">{listMatch.turn}</span>

                  {listMatch.stadium !== "TBC (TBC)" ? (
                    <p className="p_matchStadium"> {listMatch.stadium}</p>
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
              </Col>

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
