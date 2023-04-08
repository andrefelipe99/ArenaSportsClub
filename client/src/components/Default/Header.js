import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Form } from "react-bootstrap";
import logo from "../../assets/images/logo1.jpg";
import { useLocation, Link } from "react-router-dom";
import TeamDataService from "../../services/team";
import ChampionshipDataService from "../../services/championship";
import Search from "./Search";
import "../../styles/components/Default/Header.css";

export function Header() {
  const [searchField, setSearchField] = useState("");
  const [listTeams, setListTeams] = useState([]);
  const [listChamps, setListChamps] = useState([]);
  const location = useLocation();
  const [width, setWidth] = useState(window.innerWidth);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
    };

    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchField(value);
  };

  useEffect(() => {
    if (searchField === "") {
      setListTeams([]);
      setListChamps([]);
    } else {
      TeamDataService.getTeams(searchField).then((response) => {
        setListTeams(response.data.team);
      });
      ChampionshipDataService.getChampionships(searchField).then((response) => {
        setListChamps(response.data.championship);
      });
    }
  }, [searchField]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const changeExpanded = () => {
    if (expanded) setExpanded(false);
    else setExpanded(true);
  };

  return (
    <>
      <Navbar className="bg-teal" fixed="top" sticky="top" expand="lg">
        <Container>
          <Link to="/" className="brand-header">
            <Navbar.Brand>
              <img src={logo} alt="Logo" className="logo-header"></img>
              {width > 380 ? <>Arena Sport Club</> : <>Arena SC</>}
            </Navbar.Brand>
          </Link>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={(e) => {
              e.preventDefault();
              changeExpanded();
            }}
          />
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
            <Form
              className="d-flex"
              onSubmit={(e) => {
                submitHandler(e);
              }}
            >
              <Form.Control
                type="search"
                placeholder="Pesquisar"
                className="search-header"
                aria-label="Search"
                value={searchField}
                onChange={handleSearch}
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div id="position-search" className={expanded ? "expanded-search" : ""}>
        {listTeams?.length > 0 || listChamps?.length > 0 ? (
          <Search
            theme={"nav"}
            listTeams={listTeams}
            listChamps={listChamps}
            setSearchField={setSearchField}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
