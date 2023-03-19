import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
//import { Link } from "react-router-dom";
import "../styles/pages/Team.css";

export function Team() {
  // const [team, setTeam] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:5000/equipe")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setTeam(data.equipe);
  //     });
  // }, []);

  return (
    <Container>
      <p>Tela equipe</p>
    </Container>
  );
}
