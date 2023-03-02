import React, { useEffect, useState } from "react";
import { Container, Col, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/components/Home/Results.css";

export function Results() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch(
      //"https://soccer.sportmonks.com/api/v2.0/standings/season/19735?api_token=EyTipP3KYREnTTUsvLNXeaRO29eD10yZcovutsceLeo7dtCXtwdiicwJHm3p&include="
      "https://arena-sports-club-api.vercel.app/api"
    )
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  return (
    <Container id="container-results">
      {typeof backendData.partidas === "undefined" ? (
        <p>Loading...</p>
      ) : (
        backendData.partidas.map((partida, i) => (
          <Link to="/partida/1370" id="link-home" key={i}>
            <ListGroup id="partida">
              <Col className="align-home" md={1}>
                <span className="matchs-text-home">{partida.data}</span>
              </Col>

              <Col className="align-team-home-home" md={3}>
                <span id="name-team-home" className="matchs-text-home">
                  {partida.equipeCasa}
                </span>
              </Col>
              <Col className="align-home" md={1}>
                <img
                  id="img-home"
                  src={partida.imgUrlCasa}
                  alt={`${partida.equipeCasa}`}
                  width="40"
                />
              </Col>
              <Col className="align-home" md={2}>
                <span className="match-result-home">
                  {partida.placarCasa} - {partida.placarFora}
                </span>
              </Col>
              <Col className="align-home" md={1}>
                <img
                  src={partida.imgUrlFora}
                  alt={`${partida.equipeFora}`}
                  width="40"
                />
              </Col>
              <Col className="align-team-away-home" md={3}>
                <span id="name-team-home" className="matchs-text-home">
                  {partida.equipeFora}
                </span>
              </Col>
            </ListGroup>
          </Link>
        ))
      )}
    </Container>
  );
}

export default Results;
