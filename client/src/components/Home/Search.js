import React, { useEffect } from "react";
import { ListGroup, Button, Placeholder, Row, Col } from "react-bootstrap";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import "../../styles/components/Home/Search.css";

export function Search(props) {
  const { theme, listTeams } = props;
  const { favoritesTeams, setFavoritesTeams } = props;

  useEffect(() => {
    if (favoritesTeams !== undefined) {
      window.localStorage.setItem(
        "favorites-teams",
        JSON.stringify(favoritesTeams)
      );
    }
  }, [favoritesTeams]);

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
    if (favoritesTeams !== "undefined")
      setFavoritesTeams(favoritesTeams.filter((tea) => tea.id !== team.id));
  };

  const isFavoriteTeams = (team) =>
    favoritesTeams?.some((tea) => tea.id === team.id);

  return (
    <ListGroup id="display-search">
      {typeof listTeams === "undefined" ? (
        <ListGroup.Item id="list-group-sidebar-search">
          <Placeholder type="text" animation="glow">
            <Placeholder xs={8} />
          </Placeholder>
        </ListGroup.Item>
      ) : (
        listTeams?.map((team, i) => (
          <ListGroup.Item
            key={i}
            id="list-group-sidebar-search"
            className="justify-content-center-search"
          >
            <Row className="justify-content-md-center">
              <Col md={2}>
                <img
                  className="img-margin"
                  src={team.logo}
                  alt={`${team.logo}`}
                  width="40"
                />
              </Col>
              <Col md={8}>
                <Row>
                  <span className="name-search">{team.name}</span>
                </Row>
                <Row>
                  <span className="locality-search">{team.locality}</span>
                </Row>
              </Col>
              {favoritesTeams !== undefined ? (
                <Col md={2}>
                  <Button
                    id="button-favorite-sidebar"
                    onClick={(e) => {
                      e.preventDefault();
                      isFavoriteTeams(team)
                        ? removeFavoriteTeams(team)
                        : addFavoriteTeams(team);
                    }}
                  >
                    {isFavoriteTeams(team) ? <AiFillStar /> : <AiOutlineStar />}
                  </Button>
                </Col>
              ) : (
                <Col md={2}></Col>
              )}
            </Row>
          </ListGroup.Item>
        ))
      )}
    </ListGroup>
  );
}

export default Search;
