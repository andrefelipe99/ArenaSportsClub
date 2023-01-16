import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
//import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Match.css";

export function Match() {
  const [listMatch, setListMatch] = useState([{}]);

  useEffect(() => {
    fetch("/partida")
      .then((response) => response.json())
      .then((data) => {
        setListMatch(data);
      });
  }, []);

  return (
    <Container>
      <div>
        <div className="top-nameCamp">
          {typeof listMatch.partida === "undefined" ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="nameCamp">
                <h1>{listMatch.partida[0].nomeCampeonato}</h1>
              </div>
              <Row md={12} style={{ margin: 0}}>
                <div className="content-match">
                  <Col md={3} style={{ textAlign: "center" }}>
                    <img
                      src={listMatch.partida[0].imgUrlCasa}
                      alt={`${listMatch.partida[0].equipeCasa}`}
                      width="80"
                    />
                    <h3> {listMatch.partida[0].equipeCasa} </h3>
                  </Col>
                  <Col md={6} style={{ textAlign: "center" }}>
                    <h1>
                      {listMatch.partida[0].placarCasa} X{" "}
                      {listMatch.partida[0].placarFora}{" "}
                    </h1>
                  </Col>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <img
                      src={listMatch.partida[0].imgUrlFora}
                      alt={`${listMatch.partida[0].equipeFora}`}
                      width="80"
                    />
                    <h2> {listMatch.partida[0].equipeFora}</h2>
                  </Col>

                  <p className="datas">{listMatch.partida[0].data}</p>
                </div>
              </Row>
            </>
          )}
        </div>
      </div>
    </Container>
  );
}
