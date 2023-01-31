import request from "request";
import { load } from "cheerio";

const url = "https://www.placardefutebol.com.br";
const urlHoje = "/jogos-de-hoje";
const urlOntem = "/jogos-de-ontem";
const urlAmanha = "/jogos-de-amanha";

const urlDias = [url + urlHoje];
//const urlDias = [url + urlHoje, url + urlOntem, url + urlAmanha];
const partidas = [];
const eventos = [];
const estatisticas = [];
const escalacaoCasaT = [];
const escalacaoForaT = [];
const escalacaoCasaR = [];
const escalacaoForaR = [];

const urlGol = "/images/goal.png";
const urlGolC = "/images/own-goal.png";
const urlCA = "/images/yellowcard.png";
const urlCV = "/images/redcard.png";
const urlCAV = "/images/yellowred.png";
const urlSubIn = "fas fa-long-arrow-alt-up substitution-in";
const urlSubOut = "fas fa-long-arrow-alt-down substitution-out";

export default class partidasCrawler {
  static async getPartidas() {
    urlDias.forEach((urls) => {
      request(urls, function (err, res, body) {
        if (err) console.log("Erro: " + err);
        var $ = load(body);

        let count = 0;

        $("#livescore .container.content a").each(function (idx, e) {
          if ($(this).text().trim() !== "Ver tabela e classificação") {
            count++;
            var equipeCasa = $(this)
              .find("div:nth-child(2) > h5")
              .text()
              .trim();
            var equipeFora = $(this)
              .find("div:nth-child(6) > h5")
              .text()
              .trim();
            var placarCasa = $(this)
              .find(
                "div.row.align-items-center.content > div.w-25.p-1.match-score.d-flex.justify-content-end > h4 > span"
              )
              .text()
              .trim();
            var placarFora = $(this)
              .find(
                "div.row.align-items-center.content > div.w-25.p-1.match-score.d-flex.justify-content-start > h4 > span"
              )
              .text()
              .trim();
            var tempo = $(this)
              .find(
                "div.row.align-items-center.content > div.w-25.p-1.status.text-center > span"
              )
              .text()
              .trim();
            var hrefName = $(this).attr("href");

            var status = tempo;
            if (
              tempo !== "ENCERRADO" &&
              tempo !== "SUSPENSO" &&
              tempo !== "ONTEM" &&
              !tempo.includes("AMANHÃ") &&
              !tempo.includes("HOJE")
            ) {
              status = "AO VIVO";
            } else if (tempo.includes("AMANHÃ")) {
              status = "AMANHÃ";
            }

            var urlPartida = url + hrefName;

            if (equipeCasa !== "") {
              request(urlPartida, function (err, res, body) {
                if (err) console.log("Erro: " + err);
                var $ = load(body);

                $("div.container.main-content").each(function (index, e) {
                  var campeonato = $(this)
                    .find(
                      "#livescore > div:nth-child(1) > div:nth-child(1) > div > a > h2"
                    )
                    .text()
                    .trim();
                  var rodada = $(this)
                    .find(
                      "#livescore > div:nth-child(1) > div:nth-child(1) > div > p"
                    )
                    .text()
                    .trim();
                  var equipeCasaImg = $(this)
                    .find(
                      "#livescore > div:nth-child(1) > div:nth-child(1) > div > div.row.match-card-first-row.justify-content-md-center > div:nth-child(1) > img"
                    )
                    .attr("src");
                  var equipeForaImg = $(this)
                    .find(
                      "#livescore > div:nth-child(1) > div:nth-child(1) > div > div.row.match-card-first-row.justify-content-md-center > div:nth-child(3) > img"
                    )
                    .attr("src");
                  var horario = $(this)
                    .find(
                      "#livescore > div:nth-child(1) > div.match-details > p:nth-child(1)"
                    )
                    .text()
                    .trim();
                  if (
                    $(this)
                      .find(
                        "#livescore > div:nth-child(1) > div.match-details > p:nth-child(2) > img"
                      )
                      .attr("title") === "Árbitro da partida"
                  ) {
                    var arbitro = $(this)
                      .find(
                        "#livescore > div:nth-child(1) > div.match-details > p:nth-child(2)"
                      )
                      .text()
                      .trim();
                  } else var arbitro = "";

                  if (
                    $(this)
                      .find(
                        "#livescore > div:nth-child(1) > div.match-details > p:nth-child(2) > img"
                      )
                      .attr("title") === "Local da partida"
                  ) {
                    var estadio = $(this)
                      .find(
                        "#livescore > div:nth-child(1) > div.match-details > p:nth-child(2)"
                      )
                      .text()
                      .trim();
                  } else if (
                    $(this)
                      .find(
                        "#livescore > div:nth-child(1) > div.match-details > p:nth-child(3) > img"
                      )
                      .attr("title") === "Local da partida"
                  ) {
                    var estadio = $(this)
                      .find(
                        "#livescore > div:nth-child(1) > div.match-details > p:nth-child(3)"
                      )
                      .text()
                      .trim();
                  } else var estadio = "";

                  $(this)
                    .find(".row.align-items-center.content")
                    .each(function () {
                      if (
                        $(this).find(".event-line.text-right").text().trim() !==
                        ""
                      ) {
                        var lado = "casa";
                        var descricao = $(this)
                          .find(".event-line.text-right")
                          .text()
                          .trim();
                        var tempo = $(this)
                          .find(".match-card-events-space")
                          .text()
                          .trim();
                        if (
                          $(this)
                            .find(".event-line.text-right img")
                            .attr("src") === urlCA
                        ) {
                          var tipo = "CA";
                        } else if (
                          $(this)
                            .find(".event-line.text-right img")
                            .attr("src") === urlCV
                        ) {
                          var tipo = "CV";
                        } else if (
                          $(this)
                            .find(".event-line.text-right img")
                            .attr("src") === urlCAV
                        ) {
                          var tipo = "CAV";
                        } else if (
                          $(this)
                            .find(".event-line.text-right img")
                            .attr("src") === urlGol
                        ) {
                          var tipo = "GOL";
                        } else if (
                          $(this)
                            .find(".event-line.text-right img")
                            .attr("src") === urlGolC
                        ) {
                          var tipo = "GC";
                        } else if (
                          $(this)
                            .find(".event-line.text-right")
                            .text()
                            .trim()
                            .includes("gol anulado")
                        ) {
                          var tipo = "GA";
                        } else var tipo = "";
                      } else if (
                        $(this).find(".event-line.text-left").text().trim() !==
                        ""
                      ) {
                        var lado = "fora";
                        var descricao = $(this)
                          .find(".event-line.text-left")
                          .text()
                          .trim();
                        var tempo = $(this)
                          .find(".match-card-events-space")
                          .text()
                          .trim();
                        if (
                          $(this)
                            .find(".event-line.text-left img")
                            .attr("src") === urlCA
                        ) {
                          var tipo = "CA";
                        } else if (
                          $(this)
                            .find(".event-line.text-left img")
                            .attr("src") === urlCV
                        ) {
                          var tipo = "CV";
                        } else if (
                          $(this)
                            .find(".event-line.text-left img")
                            .attr("src") === urlCAV
                        ) {
                          var tipo = "CAV";
                        } else if (
                          $(this)
                            .find(".event-line.text-left img")
                            .attr("src") === urlGol
                        ) {
                          var tipo = "GOL";
                        } else if (
                          $(this)
                            .find(".event-line.text-left img")
                            .attr("src") === urlGolC
                        ) {
                          var tipo = "GC";
                        } else if (
                          $(this)
                            .find(".event-line.text-left")
                            .text()
                            .trim()
                            .includes("gol anulado")
                        ) {
                          var tipo = "GA";
                        } else var tipo = "";
                      }

                      if (lado !== "" && lado) {
                        eventos.push({
                          idx: idx,
                          urls: urls,
                          lado: lado,
                          descricao: descricao,
                          tempo: tempo,
                          tipo: tipo,
                        });
                      }
                    });

                  $(this)
                    .find("#livescore > div:nth-child(3) > table > tbody > tr")
                    .each(function () {
                      var tipo = $(this)
                        .find("td.standing-table.text-center.stats-category")
                        .text()
                        .trim();
                      var casa = $(this)
                        .find(
                          "td.standing-table.text-center.stats-home-team small"
                        )
                        .text()
                        .trim();
                      var fora = $(this)
                        .find(
                          "td.standing-table.text-center.stats-away-team small"
                        )
                        .text()
                        .trim();

                      if (tipo !== "" && tipo) {
                        estatisticas.push({
                          urls: urls,
                          idx: idx,
                          tipo: tipo,
                          casa: casa,
                          fora: fora,
                        });
                      }
                    });

                  $(this)
                    .find(
                      "#livescore > div:nth-child(6) > table:nth-child(2) > tbody > tr > td:nth-child(1) > span"
                    )
                    .each(function () {
                      var num = $(this).find("small").text().trim();
                      var nome = $(this).text().trim();
                      var nome = nome.slice(nome.indexOf(".") + 1);

                      if ($(this).find("i").attr("class") === urlSubIn) {
                        var substituicao = "in";
                      } else if (
                        $(this).find("i").attr("class") === urlSubOut
                      ) {
                        var substituicao = "out";
                      } else var substituicao = "";

                      if ($(this).find("img").attr("src") === urlCA) {
                        var cartao = "CA";
                      } else if ($(this).find("img").attr("src") === urlCV) {
                        var cartao = "CV";
                      } else if ($(this).find("img").attr("src") === urlCAV) {
                        var cartao = "CAV";
                      } else var cartao = "";

                      if ($(this).find("img").attr("src") === urlGol) {
                        var countGol = 0;
                        $(this)
                          .find("img")
                          .each(function (i, e) {
                            if ($(this).attr("src") === urlGol) {
                              countGol = countGol + 1;
                            }
                          });
                      } else var countGol = 0;

                      if ($(this).find("img").attr("src") === urlGolC) {
                        var countGolC = 0;
                        $(this)
                          .find("img")
                          .each(function (i, e) {
                            if ($(this).attr("src") === urlGolC) {
                              countGolC = countGolC + 1;
                            }
                          });
                      } else var countGolC = 0;

                      if (nome !== "" && nome) {
                        escalacaoCasaT.push({
                          urls: urls,
                          idx: idx,
                          num: num,
                          nome: nome,
                          acoes: {
                            substituicao: substituicao,
                            cartao: cartao,
                            countGol: countGol,
                            countGolC: countGolC,
                          },
                        });
                      }
                    });

                  $(this)
                    .find(
                      "#livescore > div:nth-child(6) > table:nth-child(2) > tbody > tr > td:nth-child(2) > span"
                    )
                    .each(function () {
                      var num = $(this).find("small").text().trim();
                      var nome = $(this).text().trim();
                      var nome = nome.slice(nome.indexOf(".") + 1);

                      if ($(this).find("i").attr("class") === urlSubIn) {
                        var substituicao = "in";
                      } else if (
                        $(this).find("i").attr("class") === urlSubOut
                      ) {
                        var substituicao = "out";
                      } else var substituicao = "";

                      if ($(this).find("img").attr("src") === urlCA) {
                        var cartao = "CA";
                      } else if ($(this).find("img").attr("src") === urlCV) {
                        var cartao = "CV";
                      } else if ($(this).find("img").attr("src") === urlCAV) {
                        var cartao = "CAV";
                      } else var cartao = "";

                      if ($(this).find("img").attr("src") === urlGol) {
                        var countGol = 0;
                        $(this)
                          .find("img")
                          .each(function (i, e) {
                            if ($(this).attr("src") === urlGol) {
                              countGol = countGol + 1;
                            }
                          });
                      } else var countGol = 0;

                      if ($(this).find("img").attr("src") === urlGolC) {
                        var countGolC = 0;
                        $(this)
                          .find("img")
                          .each(function (i, e) {
                            if ($(this).attr("src") === urlGolC) {
                              countGolC = countGolC + 1;
                            }
                          });
                      } else var countGolC = 0;

                      if (nome !== "" && nome) {
                        escalacaoForaT.push({
                          urls: urls,
                          idx: idx,
                          num: num,
                          nome: nome,
                          acoes: {
                            substituicao: substituicao,
                            cartao: cartao,
                            countGol: countGol,
                            countGolC: countGolC,
                          },
                        });
                      }
                    });

                  $(this)
                    .find(
                      "#livescore > div:nth-child(6) > table:nth-child(4) > tbody > tr > td:nth-child(1) > span"
                    )
                    .each(function () {
                      var num = $(this).find("small").text().trim();
                      var nome = $(this).text().trim();
                      var nome = nome.slice(nome.indexOf(".") + 1);

                      if ($(this).find("i").attr("class") === urlSubIn) {
                        var substituicao = "in";
                      } else if (
                        $(this).find("i").attr("class") === urlSubOut
                      ) {
                        var substituicao = "out";
                      } else var substituicao = "";

                      if ($(this).find("img").attr("src") === urlCA) {
                        var cartao = "CA";
                      } else if ($(this).find("img").attr("src") === urlCV) {
                        var cartao = "CV";
                      } else if ($(this).find("img").attr("src") === urlCAV) {
                        var cartao = "CAV";
                      } else var cartao = "";

                      if ($(this).find("img").attr("src") === urlGol) {
                        var countGol = 0;
                        $(this)
                          .find("img")
                          .each(function (i, e) {
                            if ($(this).attr("src") === urlGol) {
                              countGol = countGol + 1;
                            }
                          });
                      } else var countGol = 0;

                      if ($(this).find("img").attr("src") === urlGolC) {
                        var countGolC = 0;
                        $(this)
                          .find("img")
                          .each(function (i, e) {
                            if ($(this).attr("src") === urlGolC) {
                              countGolC = countGolC + 1;
                            }
                          });
                      } else var countGolC = 0;

                      if (nome !== "" && nome) {
                        escalacaoCasaR.push({
                          urls: urls,
                          idx: idx,
                          num: num,
                          nome: nome,
                          acoes: {
                            substituicao: substituicao,
                            cartao: cartao,
                            countGol: countGol,
                            countGolC: countGolC,
                          },
                        });
                      }
                    });

                  $(this)
                    .find(
                      "#livescore > div:nth-child(6) > table:nth-child(4) > tbody > tr > td:nth-child(2) > span"
                    )
                    .each(function () {
                      var num = $(this).find("small").text().trim();
                      var nome = $(this).text().trim();
                      var nome = nome.slice(nome.indexOf(".") + 1);

                      if ($(this).find("i").attr("class") === urlSubIn) {
                        var substituicao = "in";
                      } else if (
                        $(this).find("i").attr("class") === urlSubOut
                      ) {
                        var substituicao = "out";
                      } else var substituicao = "";

                      if ($(this).find("img").attr("src") === urlCA) {
                        var cartao = "CA";
                      } else if ($(this).find("img").attr("src") === urlCV) {
                        var cartao = "CV";
                      } else if ($(this).find("img").attr("src") === urlCAV) {
                        var cartao = "CAV";
                      } else var cartao = "";

                      if ($(this).find("img").attr("src") === urlGol) {
                        var countGol = 0;
                        $(this)
                          .find("img")
                          .each(function (i, e) {
                            if ($(this).attr("src") === urlGol) {
                              countGol = countGol + 1;
                            }
                          });
                      } else var countGol = 0;

                      if ($(this).find("img").attr("src") === urlGolC) {
                        var countGolC = 0;
                        $(this)
                          .find("img")
                          .each(function (i, e) {
                            if ($(this).attr("src") === urlGolC) {
                              countGolC = countGolC + 1;
                            }
                          });
                      } else var countGolC = 0;

                      if (nome !== "" && nome) {
                        escalacaoForaR.push({
                          urls: urls,
                          idx: idx,
                          num: num,
                          nome: nome,
                          acoes: {
                            substituicao: substituicao,
                            cartao: cartao,
                            countGol: countGol,
                            countGolC: countGolC,
                          },
                        });
                      }
                    });

                  var eventosAux = [];
                  eventos.forEach((element) => {
                    if (element.idx === idx && element.urls === urls)
                      eventosAux.push({
                        lado: element.lado,
                        descricao: element.descricao,
                        tempo: element.tempo,
                        tipo: element.tipo,
                      });
                  });

                  var estatisticasAux = [];
                  estatisticas.forEach((element) => {
                    if (element.idx === idx && element.urls === urls)
                      estatisticasAux.push({
                        tipo: element.tipo,
                        casa: element.casa,
                        fora: element.fora,
                      });
                  });

                  var escalacoesCasaTAux = [];
                  escalacaoCasaT.forEach((element) => {
                    if (element.idx === idx && element.urls === urls)
                      escalacoesCasaTAux.push({
                        num: element.num,
                        nome: element.nome,
                        acoes: {
                          substituicao: element.acoes.substituicao,
                          cartao: element.acoes.cartao,
                          countGol: element.acoes.countGol,
                          countGolC: element.acoes.countGolC,
                        },
                      });
                  });

                  var escalacoesForaTAux = [];
                  escalacaoForaT.forEach((element) => {
                    if (element.idx === idx && element.urls === urls)
                      escalacoesForaTAux.push({
                        num: element.num,
                        nome: element.nome,
                        acoes: {
                          substituicao: element.acoes.substituicao,
                          cartao: element.acoes.cartao,
                          countGol: element.acoes.countGol,
                          countGolC: element.acoes.countGolC,
                        },
                      });
                  });

                  var escalacoesCasaRAux = [];
                  escalacaoCasaR.forEach((element) => {
                    if (element.idx === idx && element.urls === urls)
                      escalacoesCasaRAux.push({
                        num: element.num,
                        nome: element.nome,
                        acoes: {
                          substituicao: element.acoes.substituicao,
                          cartao: element.acoes.cartao,
                          countGol: element.acoes.countGol,
                          countGolC: element.acoes.countGolC,
                        },
                      });
                  });

                  var escalacoesForaRAux = [];
                  escalacaoForaR.forEach((element) => {
                    if (element.idx === idx && element.urls === urls)
                      escalacoesForaRAux.push({
                        num: element.num,
                        nome: element.nome,
                        acoes: {
                          substituicao: element.acoes.substituicao,
                          cartao: element.acoes.cartao,
                          countGol: element.acoes.countGol,
                          countGolC: element.acoes.countGolC,
                        },
                      });
                  });

                  var idTitulo =
                    equipeCasa + " x " + equipeFora + " - " + horario;
                  var idPartida = "";

                  partidas.push({
                    idPartida: idPartida,
                    idTitulo: idTitulo,
                    campeonato: campeonato,
                    rodada: rodada,
                    status: status,
                    tempo: tempo,
                    horario: horario,
                    arbitro: arbitro,
                    estadio: estadio,
                    placarCasa: placarCasa,
                    placarFora: placarFora,
                    equipes: {
                      casaID: "",
                      casaNome: equipeCasa,
                      casaImg: equipeCasaImg,
                      foraID: "",
                      foraNome: equipeFora,
                      foraImg: equipeForaImg,
                    },
                    eventos: eventosAux,
                    estatisticas: estatisticasAux,
                    escalacao: {
                      escalacaoCasaTitular: escalacoesCasaTAux,
                      escalacaoForaTitular: escalacoesForaTAux,
                      escalacaoCasaReserva: escalacoesCasaRAux,
                      escalacaoForaReserva: escalacoesForaRAux,
                    },
                  });
                });
              });
            }
          }
        });
        console.log(count);
      });
    });
    return partidas;
  }
}
