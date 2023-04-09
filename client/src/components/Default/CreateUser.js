import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import "../../styles/components/Default/CreateUser.css";
import UserDataService from "../../services/user.js";

export function CreateUser({ showCreate, setShowCreate }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    UserDataService.getPost(name, email, password).then((response) => {
      console.log(response.data);
    });
    console.log(`Nome: ${name}, Email: ${email}, Senha: ${password}`);
  };
  const handleClose = () => setShowCreate(false);

  return (
    <Modal
      show={showCreate}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Cadastro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
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

          <div className="button-create">
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
            <Button variant="primary" type="submit">
              Cadastrar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
