import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import UserDataService from "../../services/user.js";
import { Context } from "../../context/AuthProvider.js";
import "../../styles/components/Default/Login.css";

export function Login({ show, setShow, setShowToast, setToastMessage }) {
  const { handleLogin } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === "" || password === "") setError("Preencha todos os campos!");
    else {
      UserDataService.getUser(email, password)
        .then((response) => {
          setError("");
          handleLogin(response.data.token, response.data.idUser);
          setShowToast(true);
          setToastMessage(`Seja bem vindo ${response.data.nameUser}!`);
          handleClose();
        })
        .catch((response) => setError(response.response.data.error));
    }
  };

  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose} keyboard={false}>
      <Modal.Header>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Digite seu email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Digite sua senha"
            />
          </Form.Group>
          <Form.Label className="error-login">{error}</Form.Label>
          <div className="button-login">
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
            <Button variant="success" type="submit">
              Entrar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
