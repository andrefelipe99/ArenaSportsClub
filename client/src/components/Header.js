import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function HeaderApp() {
  return (
    <Navbar className="bg-teal" fixed="top" sticky="top" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img src="logo1.jpg" alt="Logo" height="60" width="60"></img> Arena
          Sport Club
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Nav.Link href="/equipe">
              <img
                src="https://cdn-icons-png.flaticon.com/512/183/183129.png"
                height="22"
                width="22"
                alt="Search"
                className="nav-img"
              />{" "}
              <span className="nav-font" title="Resultados">
                RESULTADOS
              </span>
            </Nav.Link>
            <Nav.Link href="/">
              <img
                src="https://cdn-icons-png.flaticon.com/512/81/81460.png"
                height="22"
                width="22"
                alt="Search"
                className="nav-img"
              />{" "}
              <span className="nav-font" title="Notícias">
                NOTÍCIAS
              </span>
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Pesquisar"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-off">
              <img
                src="https://img.icons8.com/external-others-zufarizal-robiyanto/512/external-lup-mutuline-science-education-others-zufarizal-robiyanto.png"
                height="22"
                width="22"
                alt="Search"
              />
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderApp;
