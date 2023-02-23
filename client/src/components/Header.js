import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import logo from "../assets/images/logo1.jpg";
import "../styles/components/Header.css";
import TeamDataService from "../services/team";
import Search from "./Home/Search";

function HeaderApp() {
  const [searchField, setSearchField] = useState("");
  const [listTeams, setListTeams] = useState([]);

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchField(value);
  };

  useEffect(() => {
    if (searchField === "") {
      setListTeams([]);
    } else {
      TeamDataService.getTeams(searchField).then((response) => {
        setListTeams(response.data.team);
      });
    }
  }, [searchField]);

  return (
    <>
      <Navbar className="bg-teal" fixed="top" sticky="top" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="Logo" height="60" width="60"></img> Arena Sport
            Club
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <Nav.Link href="/partida/1370">
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
              <Nav.Link href="/equipe">
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
                value={searchField}
                onChange={handleSearch}
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div id="position-search">
        {listTeams?.length > 0 ? (
          <Search theme={"nav"} listTeams={listTeams} />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default HeaderApp;
