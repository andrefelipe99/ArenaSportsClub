import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SideBar from "../components/Home/SideBar";
import Results from "../components/Home/Results";
import "../styles/pages/Home.css";

export function Home() {
  return (
    <Container id="container-home">
      <Row md={12}>
        <Col md={3} sm={12} id="content-side-bar-home">
          <SideBar />
        </Col>
        <Col md={9} sm={12} id="content-matchs-home">
          <Results />
        </Col>
      </Row>
    </Container>
  );
}
