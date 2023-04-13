import React, { useEffect, useState, useRef, useContext } from "react";
import { Context } from "../../context/AuthProvider";
import {
  Container,
  ListGroup,
  Row,
  Col,
  Button,
  Form,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineStar, AiFillStar, AiFillPlusCircle } from "react-icons/ai";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { ImTrophy } from "react-icons/im";
import { GiStarsStack } from "react-icons/gi";
import { MdGroups } from "react-icons/md";
import Search from "../Default/Search";
import TeamDataService from "../../services/team";
import ChampionshipDataService from "../../services/championship";
import UserDataService from "../../services/user";
import "../../styles/components/Home/SideBar.css";

export function SideBar({
  favoritesChamp,
  setFavoritesChamp,
  favoritesTeams,
  setFavoritesTeams,
}) {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [searchField, setSearchField] = useState("");
  const [championshipList, setChampionshipList] = useState([]);
  const [teamsSearchActive, setTeamsSearchActive] = useState(false);
  const [listTeams, setListTeams] = useState([]);
  const [buttonExpand, setButtonExpand] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const { authenticated } = useContext(Context);

  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      if (newWidth >= 768) setButtonExpand(true);
      setWidth(newWidth);
    };

    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  useEffect(() => {
    ChampionshipDataService.getChampionshipsPriority().then((response) => {
      setChampionshipList(response.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      ChampionshipDataService.getChampionshipsPriority().then((response) =>
        setChampionshipList(response.data)
      );
    }, 600000);
    return () => clearTimeout(timer);
  });

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
    if (authenticated)
      UserDataService.setFavorites(
        JSON.parse(localStorage.getItem("idUser")),
        favoritesTeams,
        favoritesChamp
      );
    // eslint-disable-next-line
  }, [favoritesChamp]);

  useEffect(() => {
    window.localStorage.setItem(
      "favorites-teams",
      JSON.stringify(favoritesTeams)
    );
    if (authenticated)
      UserDataService.setFavorites(
        JSON.parse(localStorage.getItem("idUser")),
        favoritesTeams,
        favoritesChamp
      );
    // eslint-disable-next-line
  }, [favoritesTeams]);

  const addFavoriteChamp = (championship, i) => {
    if (championship !== "undefined") {
      let { idChampionship, name, img, imgChampionship } = championship;
      setFavoritesChamp((favorite) => [
        ...favorite,
        { idChampionship, name, img, imgChampionship },
      ]);
    }
  };

  const removeFavoriteChamp = (championship) => {
    window.localStorage.removeItem("favorites-champ");
    if (championshipList !== undefined)
      setFavoritesChamp(
        favoritesChamp.filter(
          (camp) => camp.idChampionship !== championship.idChampionship
        )
      );
  };

  const isFavoriteChamp = (championship) =>
    favoritesChamp?.some(
      (camp) => camp.idChampionship === championship.idChampionship
    );

  const addFavoriteTeams = (team, i) => {
    if (team !== undefined) {
      let { idTeam, name, img } = team;
      setFavoritesTeams((favorite) => [...favorite, { idTeam, name, img }]);
    }
  };

  const removeFavoriteTeams = (team) => {
    window.localStorage.removeItem("favorites-teams");
    if (listTeams !== undefined)
      setFavoritesTeams(
        favoritesTeams.filter((tea) => tea.idTeam !== team.idTeam)
      );
  };

  const isFavoriteTeams = (team) =>
    favoritesTeams?.some((tea) => tea.idTeam === team.idTeam);

  const changeExpand = () => {
    if (buttonExpand) setButtonExpand(false);
    else setButtonExpand(true);
  };

  return (
    <Container id="container-side-bar">
      {width < 768 ? (
        <div id="titleSideBar" className="border-bottom-side-bar">
          <Col md={2} sm={2} xs={2} className="col-championship-results">
            <button
              onClick={(e) => {
                e.preventDefault();
                changeExpand();
              }}
              className="button-championship-results"
            >
              {buttonExpand ? (
                <MdOutlineKeyboardArrowUp />
              ) : (
                <MdOutlineKeyboardArrowDown />
              )}
            </button>
          </Col>
          <Col md={8} sm={8} xs={8} className="col-championship-results">
            <span>Meus favoritos</span>
          </Col>
          <Col md={2} sm={2} xs={2} />
        </div>
      ) : (
        <></>
      )}
      {buttonExpand ? (
        <>
          <div id="titleSideBar" className="border-bottom-side-bar">
            <GiStarsStack />
            <span id="title-text-side-bar">Meus campeonatos</span>
          </div>
          {loading ? (
            <div className="spinner-sidebar">
              <Spinner animation="border" />
            </div>
          ) : favoritesChamp[0]?.id === 0 || favoritesChamp.length === 0 ? (
            <span className="none-sidebar">Nenhum Campeonato favorito</span>
          ) : (
            favoritesChamp?.map((favorito, i) => (
              <Link
                key={i}
                to={`/campeonato/${favorito.idChampionship}`}
                id="side-bar-link"
              >
                <ListGroup>
                  <ListGroup.Item id="list-group-sidebar">
                    <Row className="justify-content-md-center">
                      <Col md={2} sm={2} xs={2} className="col-sidebar-center">
                        <img
                          className="pais-margin"
                          src={
                            favorito.imgChampionship !== ""
                              ? `${favorito.imgChampionship}`
                              : `${favorito.img}`
                          }
                          alt={`${favorito.img}`}
                          title={`${favorito.name}`}
                        />
                      </Col>
                      <Col
                        md={9}
                        sm={9}
                        xs={9}
                        id="name-camp-sidebar"
                        className="col-sidebar"
                      >
                        <span>{favorito.name}</span>
                      </Col>
                      <Col md={1} sm={1} xs={1} className="col-sidebar-left">
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
          {loading ? (
            <div className="spinner-sidebar">
              <Spinner animation="border" />
            </div>
          ) : typeof championshipList === "undefined" ? (
            <p>Loading...</p>
          ) : (
            championshipList?.map((championship, i) => (
              <Link
                key={i}
                to={`/campeonato/${championship.idChampionship}`}
                id="side-bar-link"
              >
                <ListGroup>
                  <ListGroup.Item id="list-group-sidebar">
                    <Row className="justify-content-md-center">
                      <Col md={2} sm={2} xs={2} className="col-sidebar-center">
                        <img
                          className="pais-margin"
                          src={
                            championship.imgChampionship !== ""
                              ? `${championship.imgChampionship}`
                              : `${championship.img}`
                          }
                          alt={`${championship.img}`}
                          title={`${championship.name}`}
                        />
                      </Col>
                      <Col
                        md={9}
                        sm={9}
                        xs={9}
                        id="name-camp-sidebar"
                        className="col-sidebar"
                      >
                        <span>{championship.name}</span>
                      </Col>
                      <Col md={1} sm={1} xs={1} className="col-sidebar-left">
                        <Button
                          id="button-favorite-sidebar"
                          onClick={(e) => {
                            e.preventDefault();
                            isFavoriteChamp(championship)
                              ? removeFavoriteChamp(championship)
                              : addFavoriteChamp(championship);
                          }}
                        >
                          {isFavoriteChamp(championship) ? (
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
          {loading ? (
            <div className="spinner-sidebar">
              <Spinner animation="border" />
            </div>
          ) : favoritesTeams[0]?.id === 0 || favoritesTeams.length === 0 ? (
            <span className="none-sidebar">Nenhuma Equipe favorita</span>
          ) : (
            favoritesTeams.map((favorito, i) => (
              <Link
                key={i}
                to={`/equipe/${favorito.idTeam}`}
                id="side-bar-link"
              >
                <ListGroup>
                  <ListGroup.Item id="list-group-sidebar">
                    <Row className="justify-content-md-center">
                      <Col md={2} sm={2} xs={2} className="col-sidebar-center">
                        <img
                          className="pais-margin"
                          src={favorito.img}
                          alt={`${favorito.img}`}
                          title={`${favorito.name}`}
                        />
                      </Col>
                      <Col
                        md={9}
                        sm={9}
                        xs={9}
                        id="name-camp-sidebar"
                        className="col-sidebar"
                      >
                        <span>{favorito.name}</span>
                      </Col>
                      <Col md={1} sm={1} xs={1} className="col-sidebar-left">
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
                <div className="spinner-sidebar">
                  <Spinner animation="border" />
                </div>
              )}
            </>
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
