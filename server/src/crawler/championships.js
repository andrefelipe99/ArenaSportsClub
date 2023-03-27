import request from "request";
import { load } from "cheerio";

// const urls = [
//   "https://www.placardefutebol.com.br/campeonato-ingles",
//   "https://www.placardefutebol.com.br/campeonato-espanhol",
//   "https://www.placardefutebol.com.br/copa-do-nordeste",
//   "https://www.placardefutebol.com.br/campeonato-pernambucano",
//   "https://www.placardefutebol.com.br/champions-league",
//   "https://www.placardefutebol.com.br/eurocopa-eliminatorias",
//   "https://www.placardefutebol.com.br/copa-verde",
//   "https://www.placardefutebol.com.br/uefa-sub-19-championship-qualification",
//   "https://www.placardefutebol.com.br/mls-eua",
//   "https://www.placardefutebol.com.br/liga-das-nacoes-concacaf",
//   "https://www.placardefutebol.com.br/jogos-amistosos",
//   "https://www.placardefutebol.com.br/amistosos-selecoes",
//   "https://www.placardefutebol.com.br/premier-league-2-divison-two",
//   "https://www.placardefutebol.com.br/paulista-a3",
//   "https://www.placardefutebol.com.br/paulista-a2",
//   "https://www.placardefutebol.com.br/copa-liga-japonesa",
//   "https://www.placardefutebol.com.br/champions-league-feminina",
//   "https://www.placardefutebol.com.br/cearense-serie-b",
//   "https://www.placardefutebol.com.br/carioca-sub-20",
//   "https://www.placardefutebol.com.br/campeonato-uruguaio",
//   "https://www.placardefutebol.com.br/campeonato-tocantinense",
//   "https://www.placardefutebol.com.br/campeonato-sul-matogrossense",
//   "https://www.placardefutebol.com.br/campeonato-sergipano",
//   "https://www.placardefutebol.com.br/campeonato-roraimense",
//   "https://www.placardefutebol.com.br/campeonato-rondoniense",
//   "https://www.placardefutebol.com.br/campeonato-potiguar",
//   "https://www.placardefutebol.com.br/campeonato-piauiense",
//   "https://www.placardefutebol.com.br/campeonato-peruano",
//   "https://www.placardefutebol.com.br/campeonato-paulista",
//   "https://www.placardefutebol.com.br/campeonato-paranaense",
//   "https://www.placardefutebol.com.br/campeonato-paraibano",
//   "https://www.placardefutebol.com.br/campeonato-paraguaio",
//   "https://www.placardefutebol.com.br/campeonato-paraense",
//   "https://www.placardefutebol.com.br/campeonato-mineiro",
//   "https://www.placardefutebol.com.br/campeonato-mexicano",
//   "https://www.placardefutebol.com.br/campeonato-maranhense",
//   "https://www.placardefutebol.com.br/campeonato-gaucho",
//   "https://www.placardefutebol.com.br/campeonato-colombiano",
//   "https://www.placardefutebol.com.br/campeonato-catarinense",
//   "https://www.placardefutebol.com.br/campeonato-carioca",
//   "https://www.placardefutebol.com.br/campeonato-capixaba",
//   "https://www.placardefutebol.com.br/campeonato-brasileiro-feminino",
//   "https://www.placardefutebol.com.br/campeonato-argentino",
//   "https://www.placardefutebol.com.br/campeonato-africano-nacoes-qualificacao",
//   "https://www.placardefutebol.com.br/brasileiro-sub-20",
//   "https://www.placardefutebol.com.br/amistosos-selecoes-sub-21",
//   "https://www.placardefutebol.com.br/amistosos-selecoes-sub-20",
//   "https://www.placardefutebol.com.br/efl-championship",
//   "https://www.placardefutebol.com.br/campeonato-equatoriano",
//   "https://www.placardefutebol.com.br/copa-do-brasil",
//   "https://www.placardefutebol.com.br/campeonato-frances",
//   "https://www.placardefutebol.com.br/frances-2-divisao",
//   "https://www.placardefutebol.com.br/campeonato-italiano",
//   "https://www.placardefutebol.com.br/copa-liga-japonesa",
//   "https://www.placardefutebol.com.br/campeonato-alemao",
//   "https://www.placardefutebol.com.br/bundesliga-2-divisao",
//   "https://www.placardefutebol.com.br/campeonato-holandes",
//   "https://www.placardefutebol.com.br/liga-das-nacoes-concacaf",
//   "https://www.placardefutebol.com.br/uefa-europe-league",
//   "https://www.placardefutebol.com.br/campeonato-portugues",
//   "https://www.placardefutebol.com.br/japao-j1-league",
//   "https://www.placardefutebol.com.br/liga-conferencia-europa-da-uefa",
//   "https://www.placardefutebol.com.br/campeonato-turco",
//   "https://www.placardefutebol.com.br/campeonato-chileno",
//   "https://www.placardefutebol.com.br/copa-sul-americana",
//   "https://www.placardefutebol.com.br/copa-libertadores",
// ];

const urls = [];

const championships = [];
const table = [];
const statistics = [];

export default class championshipsCrawler {
  static async clearChampionships() {
    try {
      championships.splice(0, Infinity);
      const champsUpdated = await this.getChampionships();
      return;
    } catch (error) {
      console.error(`Unable to clear championships: ${error}`);
      return { error: error };
    }
  }

  static async getUrls(allUrls) {
    try {
      urls.splice(0, Infinity);
      allUrls.forEach((element) => {
        urls.push(element);
      });
      return;
    } catch (error) {
      console.error(`Unable to get urls championships: ${error}`);
      return { error: error };
    }
  }

  static async getChampionships() {
    if (championships.length != 0) return championships;
    else {
      table.splice(0, Infinity);
      statistics.splice(0, Infinity);
      urls.forEach((url) => {
        request(url, function (err, res, body) {
          if (err) console.log("Error: " + err);
          var $ = load(body);

          var name = "";
          var img = "";
          $("div.jumbotron > div").each(function (i, e) {
            name = $(this).find("h1").text().trim();
            img = $(this).find("h1 > img").attr("src");
          });

          $("#livescore > div:nth-child(3) > div").each(function (i, e) {
            var phase = $(this).find("p.text-center.match-stage").text().trim();
            var length = 0;
            $(this)
              .find("table")
              .each(function (i, e) {
                length++;
              });
            $(this)
              .find("table")
              .each(function (id, e) {
                var tr = [];
                var group = "";
                if (phase !== "" && length > 1) {
                  group = "Grupo " + id;

                  group = group.replace("0", "A");
                  group = group.replace("1", "B");
                  group = group.replace("2", "C");
                  group = group.replace("3", "D");
                  group = group.replace("4", "E");
                  group = group.replace("5", "F");
                  group = group.replace("6", "G");
                  group = group.replace("7", "H");
                  group = group.replace("8", "I");
                  group = group.replace("9", "J");
                  group = group.replace("10", "K");
                  group = group.replace("11", "L");
                }
                $(this)
                  .find("tbody > tr")
                  .each(function (idx, e) {
                    var num = $(this).find("th").text().trim();
                    var team = $(this)
                      .find("td:nth-child(2) > a")
                      .text()
                      .trim();
                    var points = $(this)
                      .find("td:nth-child(3) > b > i")
                      .text()
                      .trim();
                    var games = $(this).find("td:nth-child(4)").text().trim();
                    var victorys = $(this)
                      .find("td:nth-child(5)")
                      .text()
                      .trim();
                    var draws = $(this).find("td:nth-child(6)").text().trim();
                    var loses = $(this).find("td:nth-child(7)").text().trim();
                    var goaldiference = $(this)
                      .find("td:nth-child(8)")
                      .text()
                      .trim();

                    if (num != "" && num) {
                      tr.push({
                        num: num,
                        team: team,
                        points: points,
                        games: games,
                        victorys: victorys,
                        draws: draws,
                        loses: loses,
                        goaldiference: goaldiference,
                      });
                    }
                  });

                if (name != "" && name) {
                  table.push({
                    url: url,
                    name: name,
                    phase,
                    group,
                    table: tr,
                  });
                }
              });
          });

          $(".match-info table").each(function (i, e) {
            var name = "";
            if (i === 0) name = "Artilheiros";
            else name = "Assistências";

            var tr = [];
            $(this)
              .find("tbody tr")
              .each(function (idx, e) {
                var num = $(this).find("th").text().trim();
                var player = $(this).find("td:nth-child(2)").text().trim();
                var team = $(this).find("td:nth-child(3) > a").text().trim();
                var value = $(this)
                  .find("td:nth-child(4) > b > i")
                  .text()
                  .trim();

                if (num != "" && num) {
                  tr.push({
                    num,
                    player,
                    team,
                    value,
                  });
                }
              });

            if (name != "" && name) {
              statistics.push({
                url: url,
                name: name,
                table: tr,
              });
            }
          });

          var tableAux = [];
          table.forEach((element) => {
            if (element.url === url)
              tableAux.push({
                phase: element.phase,
                group: element.group,
                table: element.table,
              });
          });

          var statisticsAux = [];
          statistics.forEach((element) => {
            if (element.url === url)
              statisticsAux.push({
                name: element.name,
                table: element.table,
              });
          });

          championships.push({
            idChampionship: "",
            url,
            name,
            img,
            imgChampionship: "",
            table: tableAux,
            statistics: statisticsAux,
          });
        });
      });
      return championships;
    }
  }
}
