import React, { Fragment } from "react";
import { Col, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GiSoccerBall } from "react-icons/gi";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

function ResultsChampionship({ matchsData, buttonExpand, setButtonExpand }) {
  const changeExpand = (key) => {
    setButtonExpand(
      buttonExpand.map((item) => {
        if (item.i === key && item.value === true)
          return { i: key, value: false };
        else if (item.i === key && item.value === false)
          return { i: key, value: true };

        return item;
      })
    );
  };

  const haveMatchs = (date) => {
    if (date.matchs.length > 0) return true;
    else return false;
  };

  const checkLastEvent = (match) => {
    let event = "";
    if (match.events?.length > 0) {
      let timeLastEvent = parseInt(
        match.events[match.events?.length - 1].time.replace("'", "")
      );
      let timeMatch = parseInt(match.time.replace("MIN", ""));

      if (
        match.events[match.events.length - 1].type === "GOAL" &&
        timeMatch <= timeLastEvent + 2
      ) {
        event = "GOL";
      }
    }

    return event;
  };

  const changeMinMatch = (match) => {
    let time;
    if (match?.time === "INTERVALO")
      time = match?.time?.replace("INTERVALO", "INT");
    else if (match?.time === "SUSPENSO")
      time = match?.time?.replace("SUSPENSO", "SUSP");
    else if (match?.time === "ADIADO")
      time = match?.time?.replace("ADIADO", "CANC");
    else if (match?.time === "ATRASADO")
      time = match?.time?.replace("ATRASADO", "ATRAS");
    else if (match?.time === "PENALTIS")
      time = match?.time?.replace("PENALTIS", "PEN");
    else time = match?.time?.replace(" MIN", "'");

    return time;
  };

  return matchsData?.map((date, i) =>
    haveMatchs(date) ? (
      <div key={i}>
        <div className="championship-results">
          <Col
            md={1}
            sm={1}
            xs={1}
            className="col-championship-results col-first-results"
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                changeExpand(i);
              }}
              className="button-championship-results"
            >
              {buttonExpand[i]?.value ? (
                <MdOutlineKeyboardArrowUp />
              ) : (
                <MdOutlineKeyboardArrowDown />
              )}
            </button>
          </Col>
          <Col md={10} sm={10} xs={10} className="col-championship-results">
            <span className="text-championship-results">{date._id.day}</span>
          </Col>
          <Col md={1} sm={1} xs={1} className="col-championship-results"></Col>
        </div>

        {buttonExpand[i]?.value ? (
          date?.matchs.map((match, i) => (
            <Link
              to={`/partida/${match.idMatch}`}
              className="link-results"
              key={i}
            >
              <ListGroup className="match">
                <Col
                  md={1}
                  sm={1}
                  xs={1}
                  className="align-results col-first-results"
                >
                  {match?.status === "AO VIVO" ? (
                    <span className="matchs-text-results">
                      {changeMinMatch(match)}
                    </span>
                  ) : match?.status === "ENCERRADO" ? (
                    <span className="matchs-text-results">FIM</span>
                  ) : (
                    <span className="matchs-text-results">
                      {match.schedule}
                    </span>
                  )}
                </Col>

                <Col className="align-team-home-results" md={3} sm={3} xs={3}>
                  <span className="matchs-text-results name-team-results">
                    {match.teams?.homeName}
                  </span>
                </Col>
                <Col className="align-results" md={1} sm={1} xs={1}>
                  <img
                    className="img-results"
                    src={match.teams?.homeImg}
                    alt={`${match.teams?.homeName}`}
                    title={`${match.teams?.homeName}`}
                  />
                </Col>
                <Col className="align-results" md={2} sm={2} xs={2}>
                  <Col className="align-results" md={5} sm={5} xs={5}>
                    <span className="match-number-results">
                      {match.scoreHome}
                    </span>
                  </Col>
                  <Col className="align-results" md={2} sm={2} xs={2}>
                    <span className="match-results">-</span>
                  </Col>
                  <Col className="align-results" md={5} sm={5} xs={5}>
                    <span className="match-number-results">
                      {match.scoreAway}
                    </span>
                  </Col>
                </Col>
                <Col className="align-results" md={1} sm={1} xs={1}>
                  <img
                    className="img-results"
                    src={match.teams?.awayImg}
                    alt={`${match.teams?.awayName}`}
                    title={`${match.teams?.awayName}`}
                  />
                </Col>
                <Col className="align-team-away-results" md={3} sm={3} xs={3}>
                  <span className="matchs-text-results name-team-results">
                    {match.teams?.awayName}
                  </span>
                </Col>
                <Col className="align-results" md={1} sm={1} xs={1}>
                  {match.status === "AO VIVO" &&
                    checkLastEvent(match) !== "" && (
                      <GiSoccerBall className="goal-effect-results" />
                    )}
                </Col>
              </ListGroup>
              {i !== date?.matchs.length - 1 ? (
                <hr className="border-match" />
              ) : (
                <></>
              )}
            </Link>
          ))
        ) : (
          <></>
        )}
      </div>
    ) : (
      <Fragment key={i}></Fragment>
    )
  );
}

export default ResultsChampionship;
