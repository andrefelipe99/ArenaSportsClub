import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
//import { Link } from "react-router-dom";
import "../styles/pages/Championship.css";

export function Championship() {
  const [championship, setChampionship] = useState([]);

  useEffect(() => {
    fetch("/camp")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.camp);
        setChampionship(data.camp);
      });
  }, []);

  //feito pelo chat GPT daqui pra baixo

  return (
    <Container>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Logo</th>
              <th>Pontos</th>
            </tr>
          </thead>
          <tbody>
            {championship[0]?.table.map((row) => (
              <tr key={row.nome}>
                <td>{row.nome}</td>
                <td>
                  <img src={row.logo} alt={row.nome} width="30px" />
                </td>
                <td>{row.pontos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}
