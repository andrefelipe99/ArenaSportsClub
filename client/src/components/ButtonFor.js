import Container from "react-bootstrap/Container";
import "../styles/components/ButtonFor.css";

function ButtonForMatch({ actived, listMatch }) {
  return (
    actived && (
      <Container id="container-buttonFor">
        <div id="for-section">
          <div id="for-section_title">
            <span> TITULARES </span>
          </div>

          <div className="for-sideBox">
            <div className="for-side-left">
              {typeof listMatch.partida === "undefined" ? (
                <p>Loading...</p>
              ) : (
                listMatch.partida[0].escalacaoCasa.map((jogador, i) => (
                  <>
                    <div className="for-player" key={i}>
                      <div className="for-player_number">{jogador.numero}</div>
                      <span className="for-player_name">{jogador.nome}</span>
                    </div>
                  </>
                ))
              )}
            </div>
            <div className="for-side-right">
              {typeof listMatch.partida === "undefined" ? (
                <p>Loading...</p>
              ) : (
                listMatch.partida[0].escalacaoFora.map((jogador, i) => (
                  <>
                    <div className="for-player" key={i}>
                      <span className="for-player_name">{jogador.nome}</span>
                      <div className="for-player_number">{jogador.numero}</div>
                    </div>
                  </>
                ))
              )}
            </div>
          </div>
        </div>
        <div id="for-section">
          <div id="for-section_title">
            <span> RESERVAS </span>
          </div>
          <div className="for-sideBox">
            <div className="for-side-left">
              {typeof listMatch.partida === "undefined" ? (
                <p>Loading...</p>
              ) : (
                listMatch.partida[0].escalacaoReservaCasa.map((jogador, i) => (
                  <>
                    <div className="for-player" key={i}>
                      <div className="for-player_number">{jogador.numero}</div>
                      <span className="for-player_name">{jogador.nome}</span>
                    </div>
                  </>
                ))
              )}
            </div>
            <div className="for-side-right">
              {typeof listMatch.partida === "undefined" ? (
                <p>Loading...</p>
              ) : (
                listMatch.partida[0].escalacaoReservaFora.map((jogador, i) => (
                  <>
                    <div className="for-player" key={i}>
                      <span className="for-player_name">{jogador.nome}</span>
                      <div className="for-player_number">{jogador.numero}</div>
                    </div>
                  </>
                ))
              )}
            </div>
          </div>
        </div>
        <div id="for-section">
          <div id="for-section_title">
            <span> TÉCNICOS </span>
          </div>
          <div className="for-sideBox">
            <div className="for-side-left">
              <span className="for-player_name">
                {listMatch.partida[0].tecnicoCasa}
              </span>
            </div>
            <div className="for-side-right">
              <span className="for-player_name">
                {listMatch.partida[0].tecnicoFora}
              </span>
            </div>
          </div>
        </div>
      </Container>
    )
  );
}

export default ButtonForMatch;
