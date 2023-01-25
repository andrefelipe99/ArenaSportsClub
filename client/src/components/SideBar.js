import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { ImTrophy } from "react-icons/im";
import { GiStarsStack } from "react-icons/gi";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/components/SideBar.css";

export function SideBar() {
  const [listaCampeonatos, setListaCampeonatos] = useState([{}]);
  const [favorites, setFavorites] = useState(
    JSON.parse(window.localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    window.localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    fetch("/campeonatos")
      .then((response) => response.json())
      .then((data) => {
        setListaCampeonatos(data);
      });
  }, []);

  const addFavorite = (campeonato, i) => {
    if (campeonato !== "undefined") {
      let { id, favorito, nome, paisUrl } = campeonato;
      setFavorites((favorite) => [
        ...favorite,
        { id, favorito, nome, paisUrl },
      ]);
    }
  };

  const removeFavorite = (campeonato) => {
    window.localStorage.clear();
    if (listaCampeonatos !== "undefined")
      setFavorites(favorites.filter((camp) => camp.id !== campeonato.id));
  };

  const isFavorite = (campeonato) =>
    favorites?.some((camp) => camp.id === campeonato.id);

  return (
    <Container id="container-side-bar">
      <div>
        <div className="titleSideBar">
          <GiStarsStack />
          <span id="title-text-side-bar">Minhas Ligas</span>
        </div>
        {favorites[0]?.id === 0 || favorites.length === 0 ? (
          <span className="titleSideBar" id="title-text-side-bar">
            Nenhum Campeonato Adicionado
          </span>
        ) : (
          favorites.map((favorito, i) => (
            <div key={i}>
              <>
                <Link to="/" id="side-bar-link">
                  <ListGroup>
                    <ListGroup.Item id="list-group-sidebar">
                      <Container>
                        <Row className="justify-content-md-center">
                          <Col md={2}>
                            <img
                              className="pais-margin"
                              src={favorito.paisUrl}
                              alt={`${favorito.paisUrl}`}
                              width="25"
                            />
                          </Col>
                          <Col
                            md={8}
                            id="name-camp-sidebar"
                            title={favorito.nome}
                          >
                            <span>{favorito.nome}</span>
                          </Col>
                          <Col md={2}>
                            <Button
                              id="button-favorite"
                              onClick={() =>
                                isFavorite(favorito)
                                  ? removeFavorite(favorito)
                                  : addFavorite(favorito)
                              }
                            >
                              {isFavorite(favorito) ? (
                                <AiFillStar />
                              ) : (
                                <AiOutlineStar />
                              )}
                            </Button>
                          </Col>
                        </Row>
                      </Container>
                    </ListGroup.Item>
                  </ListGroup>
                </Link>
              </>
            </div>
          ))
        )}
        <div className="titleSideBar">
          <ImTrophy />
          <span id="title-text-side-bar">Principais Campeonatos</span>
        </div>
        {typeof listaCampeonatos.campeonatos === "undefined" ? (
          <p>Loading...</p>
        ) : (
          listaCampeonatos.campeonatos.map((campeonato, i) => (
            <div key={i}>
              <>
                <Link to="/" id="side-bar-link">
                  <ListGroup>
                    <ListGroup.Item id="list-group-sidebar">
                      <Container>
                        <Row className="justify-content-md-center">
                          <Col md={2}>
                            <img
                              className="pais-margin"
                              src={campeonato.paisUrl}
                              alt={`${campeonato.paisUrl}`}
                              width="25"
                            />
                          </Col>
                          <Col
                            md={8}
                            id="name-camp-sidebar"
                            title={campeonato.nome}
                          >
                            <span>{campeonato.nome}</span>
                          </Col>
                          <Col md={2}>
                            <Button
                              id="button-favorite"
                              onClick={() =>
                                isFavorite(campeonato)
                                  ? removeFavorite(campeonato)
                                  : addFavorite(campeonato)
                              }
                            >
                              {isFavorite(campeonato) ? (
                                <AiFillStar />
                              ) : (
                                <AiOutlineStar />
                              )}
                            </Button>
                          </Col>
                        </Row>
                      </Container>
                    </ListGroup.Item>
                  </ListGroup>
                </Link>
              </>
            </div>
          ))
        )}
      </div>
    </Container>
  );
}
export default SideBar;
