import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import MatchDataService from "../../services/match.js";
import ResultsChampionship from "../Championship/Results.js";
import { useParams } from "react-router-dom";

function ButtonResume({ actived, team }) {
  let { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [matchsData, setMatchsData] = useState([]);
  const [buttonExpand, setButtonExpand] = useState([]);

  useEffect(() => {
    MatchDataService.getPastMatchsByTeam(id).then((response) => {
      setMatchsData(response.data);
      setExpand(response?.data.length);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      MatchDataService.getPastMatchsByTeam(id).then((response) => {
        setMatchsData(response.data);
      });
    }, 15000);
    return () => clearTimeout(timer);
  });

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
          <div className="spinner-buttonMatchs">
            <Spinner animation="border" />
          </div>
        ) : matchsData?.length === 0 ? (
          <div className="match-section_title">
            <span>NENHUMA PARTIDA ENCERRADA ENCONTRADA PARA ESTA EQUIPE</span>
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

export default ButtonResume;
