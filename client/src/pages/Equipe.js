import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ButtonTest } from "../components/ButtonTest";
import React, { useState } from "react";

export function Equipe() {
  const [butao, setButao] = useState({ disabou: false, valor: 2 });

  const handleSubmit = () => {
    if (!butao.disabou)
      setButao((butao) => ({
        ...butao,
        disabou: true,
      }));
  };

  const handleTirar = () => {
    if (butao.disabou)
      setButao((butao) => ({
        ...butao,
        disabou: false,
      }));
  };

  return (
    <Container>
      <div>
        <Button onClick={handleSubmit} disabled={butao.disabou}>
          Tire
        </Button>
        <Button onClick={handleTirar}>Destire</Button>
        <Link to="/">
          <ButtonTest />
        </Link>
      </div>
    </Container>
  );
}
