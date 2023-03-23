import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import MatchDataService from "../../services/match.js";
import ResultsChampionship from "./Results.js";
import "../../styles/components/Championship/ButtonMatchs.css";

function ButtonMatchs({ actived, championship }) {
  const [loading, setLoading] = useState(true);
  const [matchsData, setMatchsData] = useState([]);
  const [buttonExpand, setButtonExpand] = useState([]);

  useEffect(() => {
    MatchDataService.getMatchsByChampionship(1).then((response) => {
      setMatchsData(response.data);
      setExpand(response?.data.length);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    });
  }, [championship]);

  const setExpand = (length) => {
    const array = [];
    for (let index = 0; index < length; index++) {
      array.push({ i: index, value: true });
    }
    setButtonExpand(array);
  };

  return (
    actived && (
      <Container id="container-buttonMatch">
        {loading ? (
          <div className="spinner-results">
            <Spinner animation="border" />
          </div>
        ) : matchsData?.length === 0 ? (
          <div className="match-section_title">
            <span>NENHUMA PARTIDA FUTURA ENCONTRADA PARA ESTE CAMPEONATO</span>
          </div>
        ) : (
          <ResultsChampionship
            matchsData={matchsData}
            buttonExpand={buttonExpand}
            setButtonExpand={setButtonExpand}
          />
        )}
      </Container>
    )
  );
}

export default ButtonMatchs;
