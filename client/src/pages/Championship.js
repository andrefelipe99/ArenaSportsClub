import React, { useState, useEffect } from "react";
import { Container, Button, Spinner } from "react-bootstrap";
import ButtonResume from "../components/Championship/ButtonResume";
import ButtonMatchs from "../components/Championship/ButtonMatchs";
import ButtonTable from "../components/Championship/ButtonTable";
import ButtonStatistic from "../components/Championship/ButtonStatistic";
import ChampionshipDataService from "../services/championship";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import "../styles/pages/Championship.css";

export function Championship() {
  let { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [championship, setChampionship] = useState([]);
  const [buttonChange, setButtonChange] = useState({
    result: true,
    calendar: false,
    table: false,
    statistic: false,
  });
  const [favoritesChamp, setFavoritesChamp] = useState(
    JSON.parse(window.localStorage.getItem("favorites-champ")) || []
  );

  useEffect(() => {
    ChampionshipDataService.getChampionshipById(id).then((response) => {
      setChampionship(response.data[0]);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      ChampionshipDataService.getChampionshipById(id).then((response) => {
        setChampionship(response.data[0]);
      });
    }, 600000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    window.localStorage.setItem(
      "favorites-champ",
      JSON.stringify(favoritesChamp)
    );
  }, [favoritesChamp]);

  const addFavoriteChamp = () => {
    if (championship !== undefined) {
      let { idChampionship, name, img, imgChampionship } = championship;
      setFavoritesChamp((favorite) => [
        ...favorite,
        { idChampionship, name, img, imgChampionship },
      ]);
    }
  };

  const removeFavoriteChamp = () => {
    window.localStorage.removeItem("favorites-champ");
    if (championship !== undefined)
      setFavoritesChamp(
        favoritesChamp.filter(
          (champ) => champ.idChampionship !== championship.idChampionship
        )
      );
  };

  const isFavoriteChamp = () =>
    favoritesChamp?.some(
      (champ) => champ.idChampionship === championship.idChampionship
    );

  const changeSelected = (buttonName) => {
    if (buttonName === "buttonResume") {
      setButtonChange({
        result: true,
        calendar: false,
        table: false,
        statistic: false,
      });
    } else if (buttonName === "buttonMatchs") {
      setButtonChange({
        result: false,
        calendar: true,
        table: false,
        statistic: false,
      });
    } else if (buttonName === "buttonTable") {
      setButtonChange({
        result: false,
        calendar: false,
        table: true,
        statistic: false,
      });
    } else {
      setButtonChange({
        result: false,
        calendar: false,
        table: false,
        statistic: true,
      });
    }
  };

  return (
    <Container>
      {loading ? (
        <div className="spinner-buttonMatchs">
          <Spinner animation="border" />
        </div>
      ) : typeof championship?.name === "undefined" ? (
        <div className="match-section_title">
          <span>CAMPEONATO NÃO ENCONTRADO</span>
        </div>
      ) : (
        <>
          <div className="heading">
            <img
              className="heading_logo heading_logo--1"
              src={
                championship.imgChampionship !== ""
                  ? `${championship.imgChampionship}`
                  : `${championship.img}`
              }
              alt={`${championship.name}`}
              title={`${championship.name}`}
            />
            <div className="heading_title">
              <div className="heading_name">{championship.name}</div>
            </div>
            <button
              id="button-favorite-championship"
              onClick={(e) => {
                e.preventDefault();
                isFavoriteChamp() ? removeFavoriteChamp() : addFavoriteChamp();
              }}
            >
              {isFavoriteChamp() ? (
                <AiFillStar className="icon-championship" />
              ) : (
                <AiOutlineStar className="icon-championship" />
              )}
            </button>
          </div>

          <div className="button-group-championship">
            <Button
              id={
                buttonChange.result
                  ? "button-championship-selected"
                  : "button-championship"
              }
              title="Resultados"
              onClick={() => changeSelected("buttonResume")}
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
              onClick={() => changeSelected("buttonMatchs")}
            >
              CALENDÁRIO
            </Button>
            <Button
              id={
                buttonChange.table
                  ? "button-championship-selected"
                  : "button-championship"
              }
              title="Tabela"
              onClick={() => changeSelected("buttonTable")}
            >
              TABELA
            </Button>
            <Button
              id={
                buttonChange.statistic
                  ? "button-championship-selected"
                  : "button-championship"
              }
              title="Estatísticas"
              onClick={() => changeSelected("buttonStatistic")}
            >
              ESTATÍSTICAS
            </Button>
          </div>

          <div>
            <ButtonResume
              actived={buttonChange.result}
              championship={championship}
            />
            <ButtonMatchs
              actived={buttonChange.calendar}
              championship={championship}
            />
            <ButtonTable
              actived={buttonChange.table}
              championship={championship}
            />
            <ButtonStatistic
              actived={buttonChange.statistic}
              championship={championship}
            />
          </div>
        </>
      )}
    </Container>
  );
}
