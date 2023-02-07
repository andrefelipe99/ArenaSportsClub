import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import SideBar from "../components/SideBar";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import { AiOutlineStar, AiFillStar } from "react-icons/ai";
// import { Button } from "react-bootstrap";
import "../styles/pages/Tabela.css";

export function Tabela() {
  const [backendData, setBackendData] = useState([{}]);
  // const [favorites, setFavorites] = useState(
  //   JSON.parse(window.localStorage.getItem("favorites-home")) || []
  // );

  // useEffect(() => {
  //   window.localStorage.setItem("favorites-home", JSON.stringify(favorites));
  // }, [favorites]);

  useEffect(() => {
    fetch(
      //"https://soccer.sportmonks.com/api/v2.0/standings/season/19735?api_token=EyTipP3KYREnTTUsvLNXeaRO29eD10yZcovutsceLeo7dtCXtwdiicwJHm3p&include="
      "/api"
    )
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  // const addFavorite = (campeonato, i) => {
  //   if (campeonato !== "undefined") {
  //     let { idMatch } = campeonato;
  //     setFavorites((favorite) => [...favorite, { idMatch }]);
  //   }
  // };

  // const removeFavorite = (campeonato) => {
  //   window.localStorage.removeItem("favorites-home");
  //   if (backendData !== "undefined")
  //     setFavorites(
  //       favorites.filter((camp) => camp.idMatch !== campeonato.idMatch)
  //     );
  // };

  // const isFavorite = (campeonato) =>
  //   favorites?.some((camp) => camp.idMatch === campeonato.idMatch);

  return (
    <Container>
      <Row md={12}>
        <Col md={3} id="content-side-bar-home">
          <SideBar />
        </Col>
        <Col md={9} id="content-matchs-home">
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
        </Col>
      </Row>
    </Container>
  );
}
