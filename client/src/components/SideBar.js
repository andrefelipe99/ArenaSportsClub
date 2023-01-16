import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import React, { useEffect, useState } from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";

export function SideBar() {
  const [listaCampeonatos, setListaCampeonatos] = useState([{}]);
  // const [butao, setButao] = useState(false);

  useEffect(() => {
    fetch("/campeonatos")
      .then((response) => response.json())
      .then((data) => {
        setListaCampeonatos(data);
      });
  }, []);

  return (
    <Container>
      <div>
        <div>
          {typeof listaCampeonatos.campeonatos === "undefined" ? (
            <p>Loading...</p>
          ) : (
            listaCampeonatos.campeonatos.map((campeonato, i) => (
              <>
                <Link to="/equipe">
                  <ListGroup>
                    <ListGroup.Item
                      style={{
                        backgroundColor: "#4a8464",
                        fontFamily: "Barrio",
                        fontSize: "medium",
                      }}
                    >
                      <img
                        className="pad"
                        src={campeonato.paisUrl}
                        alt={`${campeonato.paisUrl}`}
                        width="25"
                      />
                      {campeonato.nome}
                    </ListGroup.Item>
                  </ListGroup>
                </Link>
              </>
            ))
          )}
        </div>
      </div>
    </Container>
  );
}
export default SideBar;
