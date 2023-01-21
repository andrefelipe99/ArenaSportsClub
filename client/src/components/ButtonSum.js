import Container from "react-bootstrap/Container";
import "../styles/components/ButtonSum.css";

function ButtonSumMatch({ actived }) {
  return (
    actived && (
      <Container id="container-buttonSum">
        <div>
          <h1> Butão Sumario</h1>
        </div>
      </Container>
    )
  );
}

export default ButtonSumMatch;
