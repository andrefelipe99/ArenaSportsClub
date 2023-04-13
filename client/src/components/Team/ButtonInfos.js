import React from "react";
import Container from "react-bootstrap/Container";
import "../../styles/components/Team/ButtonInfos.css";

function ButtonInfos({ actived, team }) {
  return (
    actived && (
      <Container className="container-bt-info">
        {team?.infos?.length > 0 ? (
          <>
            {typeof team?.infos === "undefined" ? (
              <p>Loading...</p>
            ) : (
              team?.infos?.map((info, i) => (
                <div key={i}>
                  <span> {info.title}: </span>
                  <div className="bt-info-description">{info.description}</div>
                </div>
              ))
            )}
          </>
        ) : (
          <div id="sum-section_Notitle">
            <span>INFORMAÇÕES NÃO DISPONÍVEIS</span>
          </div>
        )}
      </Container>
    )
  );
}

export default ButtonInfos;
