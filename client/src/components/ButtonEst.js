import Container from "react-bootstrap/Container";
import "../styles/components/ButtonEst.css";

function ButtonEstMatch({ actived, listMatch }) {
  return (
    actived && (
      <Container id="container-buttonEst">
        {listMatch[0]?.statistics?.length > 0 ? (
          <></>
        ) : (
          <div id="est-section_title">
            <span> ESTATÍSTICAS NÃO DISPONIBILIZADAS </span>
          </div>
        )}
      </Container>
    )
  );
}

export default ButtonEstMatch;
