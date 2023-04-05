import React from "react";
import { MDBFooter } from "mdb-react-ui-kit";
import { BsGithub } from "react-icons/bs";
import { Col, Row, Container } from "react-bootstrap";
import "../../styles/components/Default/Footer.css";

export function Footer() {
  return (
    <MDBFooter id="footer" className="text-center text-lg-start">
      <Container>
        <Row>
          <Col md={4} lg={4} xl={4} className="footer-div mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-3">© Arena Sport Club</h6>
            <span>Projeto criado com finalidade acadêmica.</span>
          </Col>

          <Col md={4} lg={4} xl={4} className="footer-div mx-auto mb-md-0 mb-4">
            <h6 className="text-uppercase fw-bold mb-3">Contato</h6>
            <a
              href="https://github.com/andrefelipe99/ArenaSportsClub"
              target="_blank"
              rel="noreferrer"
              className="text-reset"
              id="footer-link"
            >
              <BsGithub className="footer-icon"></BsGithub>
              Github do projeto
            </a>
          </Col>
        </Row>
      </Container>

      {/* <div
        className="text-center p-2"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © Copyright:
        <a
          className="text-reset fw-bold"
          href="https://mdbootstrap.com/"
          target="_blank"
          rel="noreferrer"
          id="footer-link"
        >
          {" "}
          MDBootstrap.com
        </a>
      </div> */}
    </MDBFooter>
  );
}
