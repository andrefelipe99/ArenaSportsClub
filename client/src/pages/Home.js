import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SideBar from "../components/Home/SideBar";
import Results from "../components/Home/Results";
import "../styles/pages/Home.css";

export function Home() {
  const [favoritesChamp, setFavoritesChamp] = useState(
    JSON.parse(window.localStorage.getItem("favorites-champ")) || []
  );
  const [favoritesTeams, setFavoritesTeams] = useState(
    JSON.parse(window.localStorage.getItem("favorites-teams")) || []
  );

  return (
    <Container id="container-home">
      <Row md={12}>
        <Col md={3} sm={12} id="content-side-bar-home">
          <SideBar
            favoritesChamp={favoritesChamp}
            setFavoritesChamp={setFavoritesChamp}
            favoritesTeams={favoritesTeams}
            setFavoritesTeams={setFavoritesTeams}
          />
        </Col>
        <Col md={9} sm={12} id="content-matchs-home">
          <Results
            favoritesChamp={favoritesChamp}
            favoritesTeams={favoritesTeams}
          />
        </Col>
      </Row>
    </Container>
  );
}
