import React, { useEffect, useState } from "react";
import { Container, Col, ListGroup, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import MatchDataService from "../../services/match.js";
import "../../styles/components/Home/Results.css";

export function Results() {
  const [backendData, setBackendData] = useState([]);
  const [dateFilter, setDateFilter] = useState("05-02-2023");
  const [buttonChange, setButtonChange] = useState({
    all: true,
    live: false,
    finished: false,
    next: false,
  });

  console.log(backendData);
  const changeDate = (dateChange) => setDateFilter(dateChange);
  const changeSelected = (buttonName) => {
    if (buttonName === "all")
      setButtonChange({ all: true, live: false, finished: false, next: false });
    else if (buttonName === "live")
      setButtonChange({ all: false, live: true, finished: false, next: false });
    else if (buttonName === "finished")
      setButtonChange({ all: false, live: false, finished: true, next: false });
    else
      setButtonChange({ all: false, live: false, finished: false, next: true });
  };

  useEffect(() => {
    MatchDataService.getMatchsByDate(dateFilter).then((response) =>
      setBackendData(response.data)
    );
  }, [dateFilter]);

  return (
    <Container id="container-results">
      <div className="button-group-results">
        <Button
          id={buttonChange.all ? "button-filter-selected" : "button-filter"}
          title="Todos"
          onClick={() => changeSelected("all")}
        >
          TODOS
        </Button>
        <Button
          id={buttonChange.live ? "button-filter-selected" : "button-filter"}
          title="Ao vivo"
          onClick={() => changeSelected("live")}
        >
          AO VIVO
        </Button>
        <Button
          id={
            buttonChange.finished ? "button-filter-selected" : "button-filter"
          }
          title="Finalizado"
          onClick={() => changeSelected("finished")}
        >
          FINALIZADO
        </Button>
        <Button
          id={buttonChange.next ? "button-filter-selected" : "button-filter"}
          title="Próximos"
          onClick={() => changeSelected("next")}
        >
          PRÓXIMOS
        </Button>
        <Form.Select
          onChange={(e) => changeDate(e.target.value)}
          className="form-results"
          aria-label="Default select example"
        >
          <option value={dateFilter}>{dateFilter}</option>
          <option value="06-02-2023">1</option>
          <option value="04-02-2023">2</option>
          <option value="05-02-2023">3</option>
        </Form.Select>
      </div>

      {backendData?.length === 0 ? (
        <p>Loading...</p>
      ) : (
        backendData?.map((championship, i) => (
          <div key={i}>
            <Link
              // to={`/campeonato/${championship.idChampionship}`}
              to={`/campeonato`}
              id="link-home"
            >
              <span>{championship._id.championship}</span>
            </Link>
            {championship?.matchs.map((match, i) => (
              <Link to={`/partida/${match.idMatch}`} id="link-home" key={i}>
                <ListGroup id="partida">
                  <Col className="align-home" md={1}>
                    <span className="matchs-text-home">{match.schedule}</span>
                  </Col>

                  <Col className="align-team-home-home" md={3}>
                    <span id="name-team-home" className="matchs-text-home">
                      {match.teams?.homeName}
                    </span>
                  </Col>
                  <Col className="align-home" md={1}>
                    <img
                      id="img-home"
                      src={match.teams?.homeImg}
                      alt={`${match.teams?.homeName}`}
                      width="50"
                      height="50"
                    />
                  </Col>
                  <Col className="align-home" md={2}>
                    <Col className="align-home" md={5}>
                      <span className="match-result-number-home">
                        {match.scoreHome}
                      </span>
                    </Col>
                    <Col className="align-home" md={2}>
                      <span className="match-result-home">-</span>
                    </Col>
                    <Col className="align-home" md={5}>
                      <span className="match-result-number-home">
                        {match.scoreAway}
                      </span>
                    </Col>
                  </Col>
                  <Col className="align-home" md={1}>
                    <img
                      src={match.teams?.awayImg}
                      alt={`${match.teams?.awayName}`}
                      width="50"
                      height="50"
                    />
                  </Col>
                  <Col className="align-team-away-home" md={3}>
                    <span id="name-team-home" className="matchs-text-home">
                      {match.teams?.awayName}
                    </span>
                  </Col>
                </ListGroup>
              </Link>
            ))}
          </div>
        ))
      )}
    </Container>
  );
}

export default Results;
