import "../styles/components/Footer.css";
import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

function FooterApp() {
  return (
    <MDBFooter id="footer" className="text-center text-lg-start text-muted">
      <section className="Footer-section">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                Arena Sport Club
              </h6>
              <p>Produto criado com finalidade acadêmica.</p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contato</h6>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="me-4 text-reset"
              >
                insta de dede
              </a>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2023 Copyright:
        <a
          className="text-reset fw-bold"
          href="https://mdbootstrap.com/"
          target="_blank"
          rel="noreferrer"
        >
          MDBootstrap.com
        </a>
      </div>
    </MDBFooter>
  );
}

export default FooterApp;
