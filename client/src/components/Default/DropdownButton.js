import React, { useContext } from "react";
import { Context } from "../../context/AuthProvider";
import { NavDropdown } from "react-bootstrap";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";

export function DropdownButton({ show, setShow, showCreate, setShowCreate }) {
  const { authenticated, handleLogout } = useContext(Context);

  const dropDownIcon = () => {
    if (authenticated) return <FaUserCircle className="icon-header" />;
    else return <FaRegUserCircle className="icon-header" />;
  };

  const login = () => {
    if (!show) setShow(true);
  };

  const create = () => {
    if (!showCreate) setShowCreate(true);
  };

  return (
    <>
      {authenticated ? (
        <NavDropdown title={dropDownIcon()} id="nav-dropdown">
          <NavDropdown.Item
            eventKey="2"
            onClick={() => {
              handleLogout();
            }}
          >
            Sair
          </NavDropdown.Item>
        </NavDropdown>
      ) : (
        <NavDropdown title={dropDownIcon()} id="nav-dropdown">
          <NavDropdown.Item
            eventKey="3"
            onClick={() => {
              login();
            }}
          >
            Entrar
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="4"
            onClick={() => {
              create();
            }}
          >
            Cadastrar
          </NavDropdown.Item>
        </NavDropdown>
      )}
    </>
  );
}
