import Container from "react-bootstrap/Container";

function ButtonEstMatch({ actived}) {
  return (
    actived && (
      <Container>
        <div>
          <h1> Butão Estatísticas</h1>
        </div>
      </Container>
    )
  );
}

export default ButtonEstMatch;
