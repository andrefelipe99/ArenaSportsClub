import React, { useState, useEffect, useContext } from "react";
import { Context } from "../context/AuthProvider";
import { Container, Button, Spinner } from "react-bootstrap";
import ButtonInfos from "../components/Team/ButtonInfos";
import ButtonTitles from "../components/Team/ButtonTitles";
import ButtonResume from "../components/Team/ButtonResume";
import ButtonMatchs from "../components/Team/ButtonMatchs";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import TeamDataService from "../services/team.js";
import UserDataService from "../services/user";
import { useParams } from "react-router-dom";
import "../styles/pages/Team.css";

export function Team() {
  let { id } = useParams();
  const { authenticated } = useContext(Context);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonChange, setButtonChange] = useState({
    informations: true,
    titles: false,
    result: false,
    calendar: false,
  });
  const [favoritesTeams, setFavoritesTeams] = useState(
    JSON.parse(window.localStorage.getItem("favorites-teams")) || []
  );

  useEffect(() => {
    TeamDataService.getTeamById(id).then((response) => {
      setTeam(response.data[0]);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      TeamDataService.getTeamById(id).then((response) => {
        setTeam(response.data[0]);
      });
    }, 606000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (authenticated)
      UserDataService.getFavorites(
        JSON.parse(localStorage.getItem("idUser"))
      ).then((response) => {
        if (response.data.championships.length > 0)
          localStorage.setItem(
            "favorites-champ",
            JSON.stringify(response.data.championships)
          );
        else localStorage.setItem("favorites-champ", JSON.stringify([]));
        if (response.data.teams.length > 0)
          setFavoritesTeams(response.data.teams);
        else setFavoritesTeams([]);
      });
  }, [authenticated]);

  useEffect(() => {
    window.localStorage.setItem(
      "favorites-teams",
      JSON.stringify(favoritesTeams)
    );
    if (authenticated)
      UserDataService.setFavorites(
        JSON.parse(localStorage.getItem("idUser")),
        favoritesTeams,
        JSON.parse(window.localStorage.getItem("favorites-champ"))
      );
    // eslint-disable-next-line
  }, [favoritesTeams]);

  const addFavoriteTeam = () => {
    if (team !== undefined) {
      let { idTeam, name, img } = team;
      setFavoritesTeams((favorite) => [...favorite, { idTeam, name, img }]);
    }
  };

  const removeFavoriteTeam = () => {
    window.localStorage.removeItem("favorites-teams");
    if (team !== undefined)
      setFavoritesTeams(
        favoritesTeams.filter((champ) => champ.idTeam !== team.idTeam)
      );
  };

  const isFavoriteTeam = () =>
    favoritesTeams?.some((champ) => champ.idTeam === team.idTeam);

  const changeSelected = (buttonName) => {
    if (buttonName === "buttonInfos") {
      setButtonChange({
        informations: true,
        titles: false,
        result: false,
        calendar: false,
      });
    } else if (buttonName === "buttonTitles") {
      setButtonChange({
        informations: false,
        titles: true,
        result: false,
        calendar: false,
      });
    } else if (buttonName === "buttonResult") {
      setButtonChange({
        informations: false,
        titles: false,
        result: true,
        calendar: false,
      });
    } else {
      setButtonChange({
        informations: false,
        titles: false,
        result: false,
        calendar: true,
      });
    }
  };

  return (
    <Container>
      {loading ? (
        <div className="spinner-buttonMatchs">
          <Spinner animation="border" />
        </div>
      ) : typeof team?.name === "undefined" ? (
        <div className="match-section_title">
          <span>EQUIPE NÃO ENCONTRADA</span>
        </div>
      ) : (
        <>
          <div className="heading">
            <img
              className="heading_logo heading_logo--1"
              src={team.img}
              alt={`${team.name}`}
              title={`${team.name}`}
            />
            <div className="heading_title">
              <div className="heading_name">{team.name}</div>
            </div>
            <button
              id="button-favorite-championship"
              onClick={(e) => {
                e.preventDefault();
                isFavoriteTeam() ? removeFavoriteTeam() : addFavoriteTeam();
              }}
            >
              {isFavoriteTeam() ? (
                <AiFillStar className="icon-championship" />
              ) : (
                <AiOutlineStar className="icon-championship" />
              )}
            </button>
          </div>

          <div className="button-group-championship">
            <Button
              id={
                buttonChange.informations
                  ? "button-championship-selected"
                  : "button-championship"
              }
              title="Informações"
              onClick={() => changeSelected("buttonInfos")}
            >
              INFORMAÇÕES
            </Button>
            <Button
              id={
                buttonChange.titles
                  ? "button-championship-selected"
                  : "button-championship"
              }
              title="Títulos"
              onClick={() => changeSelected("buttonTitles")}
            >
              TÍTULOS
            </Button>
            <Button
              id={
                buttonChange.result
                  ? "button-championship-selected"
                  : "button-championship"
              }
              title="Resultados"
              onClick={() => changeSelected("buttonResult")}
            >
              RESULTADOS
            </Button>
            <Button
              id={
                buttonChange.calendar
                  ? "button-championship-selected"
                  : "button-championship"
              }
              title="Calendário"
              onClick={() => changeSelected("buttonCalendar")}
            >
              CALENDÁRIO
            </Button>
          </div>

          <div>
            <ButtonInfos actived={buttonChange.informations} team={team} />
            <ButtonTitles actived={buttonChange.titles} team={team} />
            <ButtonResume actived={buttonChange.result} team={team} />
            <ButtonMatchs actived={buttonChange.calendar} team={team} />
          </div>
        </>
      )}
    </Container>
  );
}
