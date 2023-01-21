import Container from "react-bootstrap/Container";
import "../styles/components/ButtonEst.css";

function ButtonEstMatch({ actived }) {
  return (
    actived && (
      <Container id="container-buttonEst">
        <div>
          <h1> Butão Estatísticas</h1>
        </div>
      </Container>
    )
  );
}

export default ButtonEstMatch;
