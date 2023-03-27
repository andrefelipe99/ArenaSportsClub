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
      setListMatch(response.data);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      MatchDataService.getMatch(id).then((response) =>
        setListMatch(response.data)
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
          ) : typeof listMatch[0]?.teams?.homeImg === "undefined" ? (
            <div className="match-section_title">
              <span>PARTIDA NÃO ENCONTRADA</span>
            </div>
          ) : (
            <>
              <div className="nameCamp">
                {listMatch[0].idChampionship !== "" ? (
                  <Link
                    to={`/campeonato/${listMatch[0].idChampionship}`}
                    className="link-match"
                  >
                    <h1>{listMatch[0].championship}</h1>
                  </Link>
                ) : (
                  <h1>{listMatch[0].championship}</h1>
                )}
              </div>
              <Row md={12} id="row-content-match">
                <div className="content-match">
                  <Col md={3} id="col-content-match">
                    <Row className="col-img-match">
                      <img
                        src={listMatch[0].teams.homeImg}
                        alt={`${listMatch[0].teams.homeName}`}
                        title={`${listMatch[0].teams.homeName}`}
                        className="img-content-match"
                      />
                    </Row>
                    <Row>
                      <span className="teams-name">
                        {listMatch[0].teams.homeName}
                      </span>
                    </Row>
                  </Col>
                  <Col md={6} id="col-results-match">
                    <div>
                      <span className="time-match">{listMatch[0].turn}</span>
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
                      <span className="time-match">{listMatch[0].time}</span>
                    </div>
                  </Col>
                  <Col md={3} id="col-content-match">
                    <Row className="col-img-match">
                      <img
                        src={listMatch[0].teams.awayImg}
                        alt={`${listMatch[0].teams.awayName}`}
                        title={`${listMatch[0].teams.awayName}`}
                        className="img-content-match"
                      />
                    </Row>
                    <Row>
                      <span className="teams-name">
                        {listMatch[0].teams.awayName}
                      </span>
                    </Row>
                  </Col>

                  <span className="time-match">
                    {listMatch[0].day} - {listMatch[0].schedule}
                  </span>
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
