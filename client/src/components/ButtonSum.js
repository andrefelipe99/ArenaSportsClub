import Container from "react-bootstrap/Container";
import "../styles/components/ButtonSum.css";

function ButtonSumMatch({ actived }) {
  return (
    actived && (
      <Container>
        <div>
          <h1> Butão Sumario</h1>
        </div>
      </Container>
    )
  );
}

export default ButtonSumMatch;
