import React, { useEffect, useState, useRef } from "react";
import { Container, ListGroup, Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineStar, AiFillStar, AiFillPlusCircle } from "react-icons/ai";
import { ImTrophy } from "react-icons/im";
import { GiStarsStack } from "react-icons/gi";
import { MdGroups } from "react-icons/md";
import Search from "../Default/Search";
import TeamDataService from "../../services/team";
import "../../styles/components/Home/SideBar.css";

export function SideBar() {
  const inputRef = useRef(null);
  const [searchField, setSearchField] = useState("");
  const [listaCampeonatos, setListaCampeonatos] = useState([]);
  const [favoritesChamp, setFavoritesChamp] = useState(
    JSON.parse(window.localStorage.getItem("favorites-champ")) || []
  );
  const [teamsSearchActive, setTeamsSearchActive] = useState(false);
  const [listTeams, setListTeams] = useState([]);
  const [favoritesTeams, setFavoritesTeams] = useState(
    JSON.parse(window.localStorage.getItem("favorites-teams")) || []
  );

  useEffect(() => {
    if (searchField === "") {
      setListTeams([]);
    } else {
      TeamDataService.getTeams(searchField).then((response) => {
        setListTeams(response.data.team);
      });
    }
  }, [searchField]);

  useEffect(() => {
    if (teamsSearchActive) inputRef.current.focus();
  }, [teamsSearchActive]);

  const changeActive = (active) => setTeamsSearchActive(active);

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchField(value);
  };

  useEffect(() => {
    window.localStorage.setItem(
      "favorites-champ",
      JSON.stringify(favoritesChamp)
    );
  }, [favoritesChamp]);

  useEffect(() => {
    window.localStorage.setItem(
      "favorites-teams",
      JSON.stringify(favoritesTeams)
    );
  }, [favoritesTeams]);

  useEffect(() => {
    fetch("http://localhost:5000/campeonatos")
      .then((response) => response.json())
      .then((data) => {
        setListaCampeonatos(data.campeonatos);
      });
  }, []);

  const addFavoriteChamp = (campeonato, i) => {
    if (campeonato !== "undefined") {
      let { id, nome, paisUrl } = campeonato;
      setFavoritesChamp((favorite) => [...favorite, { id, nome, paisUrl }]);
    }
  };

  const removeFavoriteChamp = (campeonato) => {
    window.localStorage.removeItem("favorites-champ");
    if (listaCampeonatos !== "undefined")
      setFavoritesChamp(
        favoritesChamp.filter((camp) => camp.id !== campeonato.id)
      );
  };

  const isFavoriteChamp = (campeonato) =>
    favoritesChamp?.some((camp) => camp.id === campeonato.id);

  const addFavoriteTeams = (team, i) => {
    if (team !== "undefined") {
      let { id, name, logo, locality } = team;
      setFavoritesTeams((favorite) => [
        ...favorite,
        { id, name, logo, locality },
      ]);
    }
  };

  const removeFavoriteTeams = (team) => {
    window.localStorage.removeItem("favorites-teams");
    if (listTeams !== "undefined")
      setFavoritesTeams(favoritesTeams.filter((tea) => tea.id !== team.id));
  };

  const isFavoriteTeams = (team) =>
    favoritesTeams?.some((tea) => tea.id === team.id);

  return (
    <Container id="container-side-bar">
      <div id="titleSideBar" className="border-bottom-side-bar">
        <GiStarsStack />
        <span id="title-text-side-bar">Meus campeonatos</span>
      </div>
      {favoritesChamp[0]?.id === 0 || favoritesChamp.length === 0 ? (
        <span id="titleSideBar">Nenhum Campeonato favorito</span>
      ) : (
        favoritesChamp.map((favorito, i) => (
          <Link key={i} to="/campeonato" id="side-bar-link">
            <ListGroup>
              <ListGroup.Item id="list-group-sidebar">
                <Row className="justify-content-md-center">
                  <Col md={2} sm={2}>
                    <img
                      className="pais-margin"
                      src={favorito.paisUrl}
                      alt={`${favorito.paisUrl}`}
                      title={`${favorito.nome}`}
                    />
                  </Col>
                  <Col md={8} sm={8} id="name-camp-sidebar">
                    <span>{favorito.nome}</span>
                  </Col>
                  <Col md={2} sm={2}>
                    <Button
                      id="button-favorite-sidebar"
                      onClick={(e) => {
                        e.preventDefault();
                        isFavoriteChamp(favorito)
                          ? removeFavoriteChamp(favorito)
                          : addFavoriteChamp(favorito);
                      }}
                    >
                      {isFavoriteChamp(favorito) ? (
                        <AiFillStar />
                      ) : (
                        <AiOutlineStar />
                      )}
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Link>
        ))
      )}
      <div id="titleSideBar" className="border-bottom-side-bar">
        <ImTrophy />
        <span id="title-text-side-bar">Principais Campeonatos</span>
      </div>
      {typeof listaCampeonatos === "undefined" ? (
        <p>Loading...</p>
      ) : (
        listaCampeonatos?.map((campeonato, i) => (
          <Link key={i} to="/campeonato" id="side-bar-link">
            <ListGroup>
              <ListGroup.Item id="list-group-sidebar">
                <Row className="justify-content-md-center">
                  <Col md={2} sm={2}>
                    <img
                      className="pais-margin"
                      src={campeonato.paisUrl}
                      alt={`${campeonato.paisUrl}`}
                      title={`${campeonato.nome}`}
                    />
                  </Col>
                  <Col md={8} sm={8} id="name-camp-sidebar">
                    <span>{campeonato.nome}</span>
                  </Col>
                  <Col md={2} sm={2}>
                    <Button
                      id="button-favorite-sidebar"
                      onClick={(e) => {
                        e.preventDefault();
                        isFavoriteChamp(campeonato)
                          ? removeFavoriteChamp(campeonato)
                          : addFavoriteChamp(campeonato);
                      }}
                    >
                      {isFavoriteChamp(campeonato) ? (
                        <AiFillStar />
                      ) : (
                        <AiOutlineStar />
                      )}
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Link>
        ))
      )}
      <div id="titleSideBar" className="border-bottom-side-bar">
        <MdGroups />
        <span id="title-text-side-bar">Minhas Equipes</span>
      </div>
      {favoritesTeams[0]?.id === 0 || favoritesTeams.length === 0 ? (
        <span id="titleSideBar">Nenhuma Equipe favorita</span>
      ) : (
        favoritesTeams.map((favorito, i) => (
          <Link key={i} to="/equipe" id="side-bar-link">
            <ListGroup>
              <ListGroup.Item id="list-group-sidebar">
                <Row className="justify-content-md-center">
                  <Col md={2}>
                    <img
                      className="pais-margin"
                      src={favorito.logo}
                      alt={`${favorito.logo}`}
                      title={`${favorito.name}`}
                    />
                  </Col>
                  <Col md={8} id="name-camp-sidebar">
                    <span>{favorito.name}</span>
                  </Col>
                  <Col md={2}>
                    <Button
                      id="button-favorite-sidebar"
                      onClick={(e) => {
                        e.preventDefault();
                        isFavoriteTeams(favorito)
                          ? removeFavoriteTeams(favorito)
                          : addFavoriteTeams(favorito);
                      }}
                    >
                      {isFavoriteTeams(favorito) ? (
                        <AiFillStar />
                      ) : (
                        <AiOutlineStar />
                      )}
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Link>
        ))
      )}
      <div id="titleSideBar" className="border-bottom-side-bar">
        <Button
          id="button-favorite-sidebar"
          onClick={(e) => {
            e.preventDefault();
            teamsSearchActive ? changeActive(false) : changeActive(true);
          }}
        >
          <AiFillPlusCircle />
          <span id="title-text-side-bar">Adicionar Equipe</span>
        </Button>
      </div>
      {teamsSearchActive ? (
        <>
          <div id="form-sidebar">
            <Form.Control
              type="search"
              placeholder="Pesquisar"
              aria-label="Search"
              value={searchField}
              onChange={handleSearch}
              ref={inputRef}
            />
          </div>
          {listTeams?.length > 0 ? (
            <Search
              theme={"side"}
              listTeams={listTeams}
              favoritesTeams={favoritesTeams}
              setFavoritesTeams={setFavoritesTeams}
              setSearchField={setSearchField}
            />
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </Container>
  );
}
export default SideBar;
