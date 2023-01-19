import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import SideBar from "../components/SideBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function Tabela() {
  const [backendData, setBackendData] = useState([{}]);
  // const [butao, setButao] = useState(false);

  useEffect(() => {
    fetch(
      //"https://soccer.sportmonks.com/api/v2.0/standings/season/19735?api_token=EyTipP3KYREnTTUsvLNXeaRO29eD10yZcovutsceLeo7dtCXtwdiicwJHm3p&include="
      "/api"
    )
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  return (
    <Container className="container-home">
      <div></div>
      <Row md={12}>
        <Col md={3} style={{ margin: 0 }}>
          <SideBar />
        </Col>
        <Col md={9}>
          <div className="back">
            <div className="back">
              {typeof backendData.partidas === "undefined" ? (
                <p>Loading...</p>
              ) : (
                backendData.partidas.map((partida, i) => (
                  <div
                    style={{
                      backgroundColor: "blue",
                      border: 0,
                      color: "white",
                    }}
                    className="partida"
                    key={i}
                  >
                    <img
                      className="pad"
                      src={partida.imgUrlCasa}
                      alt={`${partida.equipeCasa}`}
                      width="80"
                    />
                    <h1>
                      {partida.equipeCasa} {partida.placarCasa} X{" "}
                      {partida.placarFora} {partida.equipeFora}{" "}
                    </h1>
                    <img
                      className="pad"
                      src={partida.imgUrlFora}
                      alt={`${partida.equipeFora}`}
                      width="80"
                    />
                    <p className="datas">{partida.data}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
