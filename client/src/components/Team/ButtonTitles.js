import React from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import "../../styles/components/Team/ButtonTitles.css";

function ButtonTitles({ actived, team }) {
  return (
    actived && (
      <Container className="container-bt-info">
        {team?.titles.length > 0 ? (
          <>
            <div className="title-header">
              <div> ANO </div>
              <div> CAMPEONATO </div>
            </div>

            <div>
              <Table className="table-hover">
                <tbody>
                  {typeof team?.titles === "undefined" ? (
                    <p>Loading...</p>
                  ) : (
                    team.titles?.map((title, i) => (
                      <tr className="td-titles" key={i}>
                        <td className="text-center-year">{title.year}</td>
                        <td className="text-center-title">
                          {" "}
                          <img
                            className="img-titles"
                            src={title?.logo}
                            alt={title.name}
                          />
                          {title.name}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </div>
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

export default ButtonTitles;
