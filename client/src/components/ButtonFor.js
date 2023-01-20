import Container from "react-bootstrap/Container";
import "../styles/components/ButtonFor.css";

function ButtonForMatch({ actived, listMatch }) {
  return (
    actived && (
      <Container id="chuva">
        <div>
          {typeof listMatch.partida === "undefined" ? (
            <p>Loading...</p>
          ) : (
            <>
              <div id="header-for">
                <span>{listMatch.partida[0].formacaoCasa}</span>
                <span> FORMAÇÃO </span>
                <span>{listMatch.partida[0].formacaoFora}</span>
              </div>

              <div className="content-fieldWrap">
                <div className="content-field">
                  <div className="field-line">
                    <div className="field-player">
                      {" "}
                      {listMatch.partida[0].escalacaoCasa[0].numero}{" "}
                      <span>{listMatch.partida[0].escalacaoCasa[0].nome}</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Container>
    )
  );
}

export default ButtonForMatch;
