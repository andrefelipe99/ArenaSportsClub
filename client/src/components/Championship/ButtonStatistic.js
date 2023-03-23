import React, { Fragment } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import "../../styles/components/Championship/ButtonStatistic.css";

function ButtonStatistic({ actived, championship }) {
  return (
    actived && (
      <Container id="container-buttonStatistic">
        {championship[0]?.statistics?.length > 0 ? (
          <>
            {typeof championship[0]?.statistics[0]?.name === "undefined" ? (
              <p>Loading...</p>
            ) : (
              championship[0]?.statistics?.map((statistic, i) => (
                <div className="butSta-section" key={i}>
                  <div className="butSta-header">
                    <span>{statistic.name}</span>
                  </div>
                  <Table className="table-hover">
                    <thead className="table-bordered">
                      <tr>
                        <th> </th>
                        <th id="text-center">Jogador</th>
                        <th id="text-center">Equipe</th>
                        {statistic?.name === "Artilheiros" ? (
                          <th id="text-value-center">Gols</th>
                        ) : (
                          <th id="text-value-center">Assistências</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {statistic?.table.map((goals, i) => (
                        <tr key={i}>
                          <td id="text-center">{i + 1}</td>
                          <td id="text-center">{goals.player}</td>
                          <td id="text-center">{goals.team}</td>
                          <td id="text-goals">{goals.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ))
            )}
          </>
        ) : (
          <div id="stat_Notitle">
            <span> ESTATÍSTICAS NÃO DISPONIBILIZADAS </span>
          </div>
        )}
      </Container>
    )
  );
}

export default ButtonStatistic;
