import React from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import "../../styles/components/Championship/ButtonTable.css";

function ButtonTable({ actived, championship }) {
  return (
    actived && (
      <Container id="container-buttonTable">
        {championship[0]?.table?.length > 0 ? (
          <>
            {typeof championship[0]?.table[0] === "undefined" ? (
              <p>Loading...</p>
            ) : (
              championship[0]?.table?.map((teams, i) => (
                <div className="butTable-section" key={i}>
                  <div className="butTable-header">
                    {teams?.phase === "" ? (
                      <span> Classificação</span>
                    ) : (
                      <>
                        <div className="butTable-group">
                          {i === 0 && teams.group !== "" ? (
                            <span className="phase-butTable">
                              {" "}
                              {teams.phase}{" "}
                            </span>
                          ) : (
                            <></>
                          )}
                          <span> {teams.group} </span>
                        </div>
                      </>
                    )}
                  </div>
                  <Table className="table-hover">
                    <thead className="table-bordered">
                      <tr>
                        <th> </th>
                        <th id="text-value-center">Equipe</th>
                        <th id="text-center">Pontos</th>
                        <th id="text-center">J</th>
                        <th id="text-center">V</th>
                        <th id="text-center">E</th>
                        <th id="text-center">D</th>
                        <th id="text-center">SG</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teams?.table.map((scores, i) => (
                        <tr key={i}>
                          <td id="text-center">{i + 1}</td>
                          <td id="text-center">{scores.team}</td>
                          <td id="text-point">{scores.points}</td>
                          <td id="text-center">{scores.games}</td>
                          <td id="text-center">{scores.victorys}</td>
                          <td id="text-center">{scores.draws}</td>
                          <td id="text-center">{scores.loses}</td>
                          <td id="text-center">{scores.goaldiference}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ))
            )}
          </>
        ) : (
          <div id="table_Notitle">
            <span> TABELA NÃO DISPONIBILIZADAS </span>
          </div>
        )}
      </Container>
    )
  );
}

export default ButtonTable;
