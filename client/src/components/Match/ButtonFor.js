import React from "react";
import Container from "react-bootstrap/Container";
import { IoMdFootball } from "react-icons/io";
import { TbArrowNarrowUp, TbArrowNarrowDown } from "react-icons/tb";
import { BsFileFill } from "react-icons/bs";
import { IconContext } from "react-icons/lib";
import "../../styles/components/Match/ButtonFor.css";

function ButtonForMatch({ actived, listMatch }) {
  function ShowGoals(player) {
    return player.actions.goals.map((item, i) => {
      if (item === "GOAL") {
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

  function PlayerSwitch(player) {
    if (player.actions.substitution === "out") {
      return (
        <IconContext.Provider value={{ color: "red" }}>
          <TbArrowNarrowDown title="Jogador saiu" />
        </IconContext.Provider>
      );
    } else if (player.actions.substitution === "in") {
      return (
        <IconContext.Provider value={{ color: "green" }}>
          <TbArrowNarrowUp title="Jogador entrou" />
        </IconContext.Provider>
      );
    }
  }

  function PlayerCards(player) {
    if (player.actions.card === "YC") {
      return (
        <IconContext.Provider value={{ color: "yellow" }}>
          <BsFileFill title="Cartão Amarelo" />
        </IconContext.Provider>
      );
    } else if (player.actions.card === "RC") {
      return (
        <IconContext.Provider value={{ color: "red" }}>
          <BsFileFill title="Cartão vermelho" />
        </IconContext.Provider>
      );
    } else if (player.actions.card === "YR") {
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

  return (
    actived && (
      <Container id="container-buttonFor">
        {listMatch[0]?.lineups?.homeStarting.length > 5 ? (
          <>
            <div id="for-section">
              <div id="for-section_title">
                <span> TITULARES </span>
              </div>

              <div className="for-sideBox">
                <div className="for-side-left">
                  {typeof listMatch[0]?.lineups?.homeStarting ===
                  "undefined" ? (
                    <p>Loading...</p>
                  ) : (
                    listMatch[0].lineups.homeStarting.map((player, i) => (
                      <div className="for-player" key={i}>
                        <div className="for-player_number">{player.num}</div>
                        <span className="for-player_name">{player.name}</span>
                        {ShowGoals(player)}
                        {PlayerCards(player)}
                        {PlayerSwitch(player)}
                      </div>
                    ))
                  )}
                </div>
                <div className="for-side-right">
                  {typeof listMatch[0]?.lineups?.awayStarting ===
                  "undefined" ? (
                    <p>Loading...</p>
                  ) : (
                    listMatch[0].lineups.awayStarting.map((player, i) => (
                      <div className="for-player" key={i}>
                        <div>
                          {PlayerSwitch(player)}
                          {PlayerCards(player)}
                          {ShowGoals(player)}
                        </div>
                        <span className="for-player_name">{player.name}</span>
                        <div className="for-player_number">{player.num}</div>
                      </div>
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
                  {typeof listMatch[0]?.lineups?.homeBench === "undefined" ? (
                    <p>Loading...</p>
                  ) : (
                    listMatch[0].lineups.homeBench.map((player, i) => (
                      <div className="for-player" key={i}>
                        <div className="for-player_number">{player.num}</div>
                        <span className="for-player_name">{player.name}</span>
                        <div>
                          {ShowGoals(player)}
                          {PlayerCards(player)}
                          {PlayerSwitch(player)}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="for-side-right">
                  {typeof listMatch[0]?.lineups?.awayBench === "undefined" ? (
                    <p>Loading...</p>
                  ) : (
                    listMatch[0].lineups.awayBench.map((player, i) => (
                      <div className="for-player" key={i}>
                        {PlayerSwitch(player)}
                        {PlayerCards(player)}
                        {ShowGoals(player)}
                        <span className="for-player_name">{player.name}</span>
                        <div className="for-player_number">{player.num}</div>
                      </div>
                    ))
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
          </>
        ) : (
          <div id="for-section_title">
            <span> ESCALAÇÕES NÃO DISPONIBILIZADAS </span>
          </div>
        )}
      </Container>
    )
  );
}

export default ButtonForMatch;
