import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function SideBar() {
  const [listaCampeonatos, setListaCampeonatos] = useState([{}]);
  const [favorites, setFavorites] = useState([{}]);

  const addFavorite = (campeonato) => {
    if (campeonato !== "undefined") {
      let { id, favorito, nome, paisUrl } = campeonato;
      setFavorites((favorite) => [
        ...favorite,
        { id, favorito, nome, paisUrl },
      ]);
    }
  };

  const removeFavorite = (campeonato) => {
    if (listaCampeonatos !== "undefined")
      setFavorites(favorites.filter((camp) => camp.id !== campeonato.id));
  };

  const isFavorite = (campeonato) =>
    favorites?.some((camp) => camp.id === campeonato.id);

  useEffect(() => {
    fetch("/campeonatos")
      .then((response) => response.json())
      .then((data) => {
        setListaCampeonatos(data);
      });
  }, []);

  return (
    <Container style={{ padding: 0 }}>
      <div>
        {typeof listaCampeonatos.campeonatos === "undefined" ? (
          <p>Loading...</p>
        ) : (
          listaCampeonatos.campeonatos.map((campeonato, i) => (
            <div key={i}>
              <>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <ListGroup>
                    <ListGroup.Item id="list-group-sidebar">
                      <Container>
                        <Row className="justify-content-md-center">
                          <Col md={2}>
                            <img
                              className="pad"
                              src={campeonato.paisUrl}
                              alt={`${campeonato.paisUrl}`}
                              width="25"
                            />
                          </Col>
                          <Col
                            md={7}
                            id="name-camp-sidebar"
                            title={campeonato.nome}
                          >
                            <span>{campeonato.nome}</span>
                          </Col>
                          <Col md={3}>
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
