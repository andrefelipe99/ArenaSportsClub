import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Form } from "react-bootstrap";
import logo from "../../assets/images/logo1.jpg";
import { useLocation, Link } from "react-router-dom";
import TeamDataService from "../../services/team";
import Search from "./Search";
import "../../styles/components/Default/Header.css";

export function Header() {
  const [searchField, setSearchField] = useState("");
  const [listTeams, setListTeams] = useState([]);
  const location = useLocation();

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
          <Navbar.Brand>
            <Link to="/" className="link-header">
              <img src={logo} alt="Logo" className="logo-header"></img> Arena
              Sport Club
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <Link
                to="/"
                className={
                  location.pathname === "/" ? "match-header" : "link-header"
                }
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/183/183129.png"
                  alt="Search"
                  className="nav-img"
                />{" "}
                <span className="nav-font" title="Resultados">
                  RESULTADOS
                </span>
              </Link>
              <Link
                to="/noticias"
                className={
                  location.pathname === "/noticias"
                    ? "championship-header"
                    : "link-header"
                }
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/81/81460.png"
                  alt="Search"
                  className="nav-img"
                />{" "}
                <span className="nav-font" title="Notícias">
                  NOTÍCIAS
                </span>
              </Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Pesquisar"
                className="me-2 search-header"
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
          <Search
            theme={"nav"}
            listTeams={listTeams}
            setSearchField={setSearchField}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
