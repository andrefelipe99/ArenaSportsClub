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
    fetch("/match")
      .then((response) => response.json())
      .then((data) => {
        setListMatch(data);
      });
  }, []);

  return (
    <Container>
      <div>
        <div>
          {typeof listMatch.match === "undefined" ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="nameCamp">
                <h1>{listMatch.match[0].championship}</h1>
              </div>
              <Row md={12} id="row-content-match">
                <div className="content-match">
                  <Col md={3} id="col-content-match">
                    <img
                      src={listMatch.match[0].teams.homeImg}
                      alt={`${listMatch.match[0].teams.homeName}`}
                      width="128px"
                    />
                    <h3 className="teams-name">
                      {" "}
                      {listMatch.match[0].teams.homeName}{" "}
                    </h3>
                  </Col>
                  <Col md={6} id="col-results-match">
                    <h1>
                      {listMatch.match[0].scoreHome} X{" "}
                      {listMatch.match[0].scoreAway}{" "}
                    </h1>
                  </Col>
                  <Col md={3} id="col-content-match">
                    <img
                      src={listMatch.match[0].teams.awayImg}
                      alt={`${listMatch.match[0].teams.awayName}`}
                      width="128px"
                    />
                    <h3 className="teams-name">
                      {" "}
                      {listMatch.match[0].teams.awayName}
                    </h3>
                  </Col>

                  <p className="p_matchTime">
                    {" "}
                    {listMatch.match[0].day} - {listMatch.match[0].schedule}
                  </p>
                  <p className="p_matchStadium">
                    {" "}
                    {listMatch.match[0].stadium}
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
