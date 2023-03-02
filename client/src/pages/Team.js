import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
//import { Link } from "react-router-dom";
import "../styles/pages/Team.css";

export function Team() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetch("https://arena-sports-club-api.vercel.app/equipe")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.equipe);
        setTeam(data.equipe);
      });
  }, []);

  const [butao, setButao] = useState({ disabou: false });
  const [butao2, setButao2] = useState({ disabou: true });

  const handleSubmit = () => {
    if (!butao.disabou) setButao({ disabou: true });
    if (butao2.disabou) setButao2({ disabou: false });
  };

  const handleTirar = () => {
    if (butao.disabou) setButao({ disabou: false });
    if (!butao2.disabou) setButao2({ disabou: true });
  };

  return (
    <Container>
      <div>
        <img src={team[0]?.img} alt={`${team[0]?.img}`} />
        <p>{team[0]?.name}</p>
        <Button onClick={handleSubmit} disabled={butao.disabou}>
          Teste desativar
        </Button>
        <p></p>
        <Button onClick={handleTirar} disabled={butao2.disabou}>
          Teste ativar
        </Button>
      </div>
    </Container>
  );
}
