import Container from "react-bootstrap/Container";
import "../styles/components/ButtonFor.css";

function ButtonForMatch({ actived, listMatch }) {
  return (
    actived && (
      <Container id="container-buttonFor">
        <div id="main-header-for">
          <div id="header-for">
            <span>{listMatch.partida[0].formacaoCasa}</span>
            <span> FORMAÇÃO </span>
            <span>{listMatch.partida[0].formacaoFora}</span>
          </div>

          <div className="content-fieldWrap">
            <div className="content-field">
              <div className="field-line">
                {typeof listMatch.partida === "undefined" ? (
                  <p>Loading...</p>
                ) : (
                  listMatch.partida[0].escalacaoCasa.map((jogador, i) => (
                    <>
                      <div className="field-player" key={i}>
                        {" "}
                        {jogador.numero} <span>{jogador.nome}</span>
                      </div>
                    </>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    )
  );
}

export default ButtonForMatch;
