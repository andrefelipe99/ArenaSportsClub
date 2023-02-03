import Container from "react-bootstrap/Container";
import "../styles/components/ButtonFor.css";
import { IoMdFootball } from "react-icons/io";
import { TbArrowNarrowUp, TbArrowNarrowDown } from "react-icons/tb";
import { BsFileFill } from "react-icons/bs";
import { IconContext } from "react-icons/lib";

function ShowGoals(jogador) {
  return jogador.acoes.gols.map((item, i) => {
    if (item === "GOL") {
      return <IoMdFootball key={i} title="Gol marcado" />;
    } else {
      return (
        <IconContext.Provider value={{ color: "red" }}>
          <IoMdFootball key={i} title="Gol contra" />
        </IconContext.Provider>
      );
    }
  });
}

function PlayerSwitch(jogador) {
  if (jogador.acoes.substituicao === "out") {
    return (
      <IconContext.Provider value={{ color: "red" }}>
        <TbArrowNarrowDown title="Jogador saiu" />
      </IconContext.Provider>
    );
  } else if (jogador.acoes.substituicao === "in") {
    return (
      <IconContext.Provider value={{ color: "green" }}>
        <TbArrowNarrowUp title="Jogador entrou" />
      </IconContext.Provider>
    );
  }
}

function PlayerCards(jogador) {
  if (jogador.acoes.cartao === "CA") {
    return (
      <IconContext.Provider value={{ color: "yellow" }}>
        <BsFileFill title="Cartão Amarelo" />
      </IconContext.Provider>
    );
  } else if (jogador.acoes.cartao === "CV") {
    return (
      <IconContext.Provider value={{ color: "red" }}>
        <BsFileFill title="Cartão vermelho" />
      </IconContext.Provider>
    );
  } else if (jogador.acoes.cartao === "CAV") {
    return (
      <>
        <IconContext.Provider value={{ color: "yellow" }}>
          <BsFileFill title="Cartão Amarelo" />
        </IconContext.Provider>
        <IconContext.Provider value={{ color: "red" }}>
          <BsFileFill title="Cartão Vermelho" />
        </IconContext.Provider>
      </>
    );
  }
}

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
                listMatch.partida[0].escalacoes.casaTitular.map(
                  (jogador, i) => (
                    <>
                      <div className="for-player" key={i}>
                        <div className="for-player_number">{jogador.num}</div>
                        <span className="for-player_name">{jogador.nome}</span>
                        {ShowGoals(jogador)}
                        {PlayerCards(jogador)}
                        {PlayerSwitch(jogador)}
                      </div>
                    </>
                  )
                )
              )}
            </div>
            <div className="for-side-right">
              {typeof listMatch.partida === "undefined" ? (
                <p>Loading...</p>
              ) : (
                listMatch.partida[0].escalacoes.foraTitular.map(
                  (jogador, i) => (
                    <>
                      <div className="for-player" key={i}>
                        {PlayerSwitch(jogador)}
                        {PlayerCards(jogador)}
                        {ShowGoals(jogador)}
                        <span className="for-player_name">{jogador.nome}</span>
                        <div className="for-player_number">{jogador.num}</div>
                      </div>
                    </>
                  )
                )
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
                listMatch.partida[0].escalacoes.casaReserva.map(
                  (jogador, i) => (
                    <>
                      <div className="for-player" key={i}>
                        <div className="for-player_number">{jogador.num}</div>
                        <span className="for-player_name">{jogador.nome}</span>
                        {ShowGoals(jogador)}
                        {PlayerCards(jogador)}
                        {PlayerSwitch(jogador)}
                      </div>
                    </>
                  )
                )
              )}
            </div>
            <div className="for-side-right">
              {typeof listMatch.partida === "undefined" ? (
                <p>Loading...</p>
              ) : (
                listMatch.partida[0].escalacoes.foraReserva.map(
                  (jogador, i) => (
                    <>
                      <div className="for-player" key={i}>
                        {PlayerSwitch(jogador)}
                        {PlayerCards(jogador)}
                        {ShowGoals(jogador)}
                        <span className="for-player_name">{jogador.nome}</span>
                        <div className="for-player_number">{jogador.num}</div>
                      </div>
                    </>
                  )
                )
              )}
            </div>
          </div>
        </div>
        {/* <div id="for-section">
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
        </div> */}
      </Container>
    )
  );
}

export default ButtonForMatch;
