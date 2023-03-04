import React from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import "../../styles/components/Championship/ButtonStatistic.css";

function ButtonStatistic({ actived, championship }) {
  return (
    actived && (
      <Container id="container-buttonStatistic">
        {championship[0]?.estatisticas?.length > 0 ? (
          <>
            <div className="butSta-section">
              {typeof championship[0]?.estatisticas[0]?.artilheiros ===
              "undefined" ? (
                <p>Loading...</p>
              ) : (
                <>
                  <div className="header-goals">
                    <span>Artilheiros</span>
                  </div>
                  <Table className="table-hover">
                    <thead className="table-bordered">
                      <tr>
                        <th> </th>
                        <th id="text-center">Jogador</th>
                        <th id="text-center">Equipe</th>
                        <th id="text-center">Gols</th>
                      </tr>
                    </thead>
                    <tbody>
                      {championship[0].estatisticas[0].artilheiros.map(
                        (goals, i) => (
                          <tr key={i}>
                            <td id="text-center">{i + 1}</td>
                            <td id="text-center">{goals.nome}</td>
                            <td id="text-center">{goals.equipe}</td>
                            <td id="text-center">{goals.gols}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </Table>
                </>
              )}
            </div>

            <div className="butSta-section_assistance">
              {typeof championship[0]?.estatisticas[0]?.assistencia ===
              "undefined" ? (
                <p>Loading...</p>
              ) : (
                <>
                  <div className="header-assistance">
                    <span>Assistências</span>
                  </div>
                  <Table className="table-hover">
                    <thead className="table-bordered">
                      <tr>
                        <th> </th>
                        <th id="text-center">Jogador</th>
                        <th id="text-center">Equipe</th>
                        <th id="text-center">Assistências</th>
                      </tr>
                    </thead>
                    <tbody>
                      {championship[0].estatisticas[0].assistencia.map(
                        (assistance, i) => (
                          <tr key={i}>
                            <td id="text-center">{i + 1}</td>
                            <td id="text-center">{assistance.nome}</td>
                            <td id="text-center">{assistance.equipe}</td>
                            <td id="text-center">
                              {assistance.assistencias}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </Table>
                </>
              )}
            </div>
          </>
        ) : (
          <div id="btSta-section_title">
            <span> ESTATÍSTICAS NÃO DISPONIBILIZADAS </span>
          </div>
        )}
      </Container>
    )
  );
}

export default ButtonStatistic;
