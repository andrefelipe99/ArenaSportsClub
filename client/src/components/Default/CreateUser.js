import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import "../../styles/components/Default/CreateUser.css";
import UserDataService from "../../services/user.js";

export function CreateUser({
  showCreate,
  setShowCreate,
  setShowToast,
  setToastMessage,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (name === "" || email === "" || password === "")
      setError("Preencha todos os campos!");
    else {
      setError("");
      UserDataService.getPost(name, email, password)
        .then((response) => {
          setShowToast(true);
          setToastMessage(`Usuário criado com sucesso!`);
          handleClose();
        })
        .catch((response) => setError(response.response.data.error));
    }
  };
  const handleClose = () => setShowCreate(false);

  return (
    <Modal show={showCreate} onHide={handleClose} keyboard={false}>
      <Modal.Header>
        <Modal.Title>Cadastro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Digite seu nome"
            />
          </Form.Group>

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
          <div className="button-create">
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
            <Button variant="success" type="submit">
              Cadastrar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
