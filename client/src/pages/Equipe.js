import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
//import { Link } from "react-router-dom";

import "../styles/pages/Equipe.css";

export function Equipe() {
  const [butao, setButao] = useState({ disabou: false });
  const [butao2, setButao2] = useState({ disabou: true });

  const handleSubmit = () => {
    if (!butao.disabou) setButao({ disabou: true });
    if (butao2.disabou) setButao2({ disabou: false });
  };

  const handleTirar = () => {
    if (butao.disabou) setButao({ disabou: false });
    if (!butao2.disabou) setButao2({ disabou: true });
  };

  return (
    <Container>
      <div>
        <p>Tela equipe</p>
        <Button onClick={handleSubmit} disabled={butao.disabou}>
          Teste desativar
        </Button>
        <p></p>
        <Button onClick={handleTirar} disabled={butao2.disabou}>
          Teste ativar
        </Button>
      </div>
    </Container>
  );
}
