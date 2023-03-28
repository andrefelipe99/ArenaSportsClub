import React from "react";
import Container from "react-bootstrap/Container";
import ProgressBar from "react-bootstrap/ProgressBar";
import "../../styles/components/Match/ButtonEst.css";

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
            <span> {statistic.home}</span>
            <span className="stat_percent_pad">%</span>
          </div>
          <div className="stat_category_name">
            <span> Posse de bola</span>
          </div>
          <div className="stat_home">
            <span> {statistic.away}</span>
            <span className="stat_percent_pad">%</span>
          </div>
        </div>
        <ProgressBar variant="success" id="progress-bar" now={statistic.home} />
      </div>
    );
  } else if (statistic.type === "Passes corretos (%)") {
    return (
      <div>
        <div className="stat_category">
          <div className="stat_home">
            <span> {statistic.home}</span>
            <span className="stat_percent_pad">%</span>
          </div>
          <div className="stat_category_name">
            <span> Passes corretos</span>
          </div>
          <div className="stat_home">
            <span> {statistic.away}</span>
            <span className="stat_percent_pad">%</span>
          </div>
        </div>
        <ProgressBar
          variant="success"
          id="progress-bar"
          now={CalculateStatistic(statistic.home, statistic.away)}
        />
      </div>
    );
  } else {
    return (
      <div>
        <div className="stat_category">
          <div className="stat_home">
            <span> {statistic.home}</span>
          </div>
          <div className="stat_category_name">
            <span> {statistic.type}</span>
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
        {listMatch?.statistics?.length > 0 ? (
          <>
            <div className="est-section">
              {typeof listMatch?.statistics === "undefined" ? (
                <p>Loading...</p>
              ) : (
                listMatch.statistics.map((statistic, i) => (
                  <div className="stat_row" key={i}>
                    {ShowStatistics(statistic)}
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <div id="est-section_title">
            <span>ESTATÍSTICAS NÃO DISPONÍVEIS</span>
          </div>
        )}
      </Container>
    )
  );
}

export default ButtonEstMatch;
