import React, { useState, useContext, useEffect } from "react";
import { Context } from "../context/AuthProvider";
import { Container, Row, Col } from "react-bootstrap";
import SideBar from "../components/Home/SideBar";
import Results from "../components/Home/Results";
import UserDataService from "../services/user";
import "../styles/pages/Home.css";

export function Home() {
  const { authenticated } = useContext(Context);
  const [favoritesChamp, setFavoritesChamp] = useState(
    JSON.parse(window.localStorage.getItem("favorites-champ")) || []
  );
  const [favoritesTeams, setFavoritesTeams] = useState(
    JSON.parse(window.localStorage.getItem("favorites-teams")) || []
  );

  useEffect(() => {
    if (authenticated)
      UserDataService.getFavorites(
        JSON.parse(localStorage.getItem("idUser"))
      ).then((response) => {
        if (response.data.championships.length > 0)
          setFavoritesChamp(response.data.championships);
        else setFavoritesChamp([]);
        if (response.data.teams.length > 0)
          setFavoritesTeams(response.data.teams);
        else setFavoritesTeams([]);
      });
  }, [authenticated]);

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
