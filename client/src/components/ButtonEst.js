import Container from "react-bootstrap/Container";
import "../styles/components/ButtonEst.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import React from "react";

function CalculateStatistic(statistic_home, statistic_away) {
  const total = parseInt(statistic_home) + parseInt(statistic_away);

  return (parseInt(statistic_home) * 100) / total;
}

function ShowStatistics(statistic) {
  if (statistic.type === "Posse de bola (%)") {
    return (
      <div>
        <div className="stat_category">
          <div className="stat_home">
            <span> {statistic.home} %</span>
          </div>
          <div className="stat_category_name">
            <span> Posse de bola</span>
          </div>
          <div className="stat_home">
            <span> {statistic.away} %</span>
          </div>
        </div>
        <ProgressBar variant="success" id="progress-bar" now={statistic.home} />
      </div>
    );
  } else if (statistic.type === "Total de passes") {
    return (
      <div>
        <div className="stat_category">
          <div className="stat_home">
            <span> {statistic.home}</span>
          </div>
          <div className="stat_category_name">
            <span> Total de passes</span>
          </div>
          <div className="stat_home">
            <span> {statistic.away} </span>
          </div>
        </div>
        <ProgressBar
          variant="success"
          id="progress-bar"
          now={CalculateStatistic(statistic.home, statistic.away)}
        />
      </div>
    );
  } else if (statistic.type === "Passes corretos (%)") {
    return (
      <div>
        <div className="stat_category">
          <div className="stat_home">
            <span> {statistic.home} %</span>
          </div>
          <div className="stat_category_name">
            <span> Passes corretos</span>
          </div>
          <div className="stat_home">
            <span> {statistic.away} %</span>
          </div>
        </div>
        <ProgressBar
          variant="success"
          id="progress-bar"
          now={CalculateStatistic(statistic.home, statistic.away)}
        />
      </div>
    );
  } else if (statistic.type === "Total de chutes") {
    return (
      <div>
        <div className="stat_category">
          <div className="stat_home">
            <span> {statistic.home}</span>
          </div>
          <div className="stat_category_name">
            <span> Total de chutes</span>
          </div>
          <div className="stat_home">
            <span> {statistic.away} </span>
          </div>
        </div>
        <ProgressBar
          variant="success"
          id="progress-bar"
          now={CalculateStatistic(statistic.home, statistic.away)}
        />
      </div>
    );
  } else if (statistic.type === "Chutes no gol") {
    return (
      <div>
        <div className="stat_category">
          <div className="stat_home">
            <span> {statistic.home}</span>
          </div>
          <div className="stat_category_name">
            <span> Chutes no gol</span>
          </div>
          <div className="stat_home">
            <span> {statistic.away} </span>
          </div>
        </div>
        <ProgressBar
          variant="success"
          id="progress-bar"
          now={CalculateStatistic(statistic.home, statistic.away)}
        />
      </div>
    );
  } else if (statistic.type === "Escanteios") {
    return (
      <div>
        <div className="stat_category">
          <div className="stat_home">
            <span> {statistic.home}</span>
          </div>
          <div className="stat_category_name">
            <span> Escanteios</span>
          </div>
          <div className="stat_home">
            <span> {statistic.away} </span>
          </div>
        </div>
        <ProgressBar
          variant="success"
          id="progress-bar"
          now={CalculateStatistic(statistic.home, statistic.away)}
        />
      </div>
    );
  } else if (statistic.type === "Faltas cometidas") {
    return (
      <div>
        <div className="stat_category">
          <div className="stat_home">
            <span> {statistic.home}</span>
          </div>
          <div className="stat_category_name">
            <span> Faltas cometidas</span>
          </div>
          <div className="stat_home">
            <span> {statistic.away} </span>
          </div>
        </div>
        <ProgressBar
          variant="success"
          id="progress-bar"
          now={CalculateStatistic(statistic.home, statistic.away)}
        />
      </div>
    );
  }
}

function ButtonEstMatch({ actived, listMatch }) {
  return (
    actived && (
      <Container id="container-buttonEst">
        {listMatch[0]?.statistics?.length > 0 ? (
          <>
            <div className="est-section">
              {typeof listMatch[0]?.statistics === "undefined" ? (
                <p>Loading...</p>
              ) : (
                listMatch[0].statistics.map((statistic, i) => (
                  <div className="stat_row" key={i}>
                    {ShowStatistics(statistic)}
                  </div>
                ))
              )}
            </div>
          </>
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
