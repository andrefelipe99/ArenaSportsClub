import request from "request";
import { load } from "cheerio";

const urls = [
  "https://www.placardefutebol.com.br/campeonato-ingles",
  "https://www.placardefutebol.com.br/campeonato-espanhol",
  "https://www.placardefutebol.com.br/copa-do-nordeste",
  "https://www.placardefutebol.com.br/campeonato-pernambucano",
  "https://www.placardefutebol.com.br/champions-league",
];

const championships = [];
const table = [];
const statistics = [];

export default class championshipsCrawler {
  static async getChampionships() {
    if (championships.length != 0) return championships;
    else {
      // urls = await matchsCrawler.getChampionships();
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
            $(this)
              .find("table")
              .each(function (id, e) {
                var tr = [];
                var group = "";
                if (phase !== "" && phase.includes("Grupo")) {
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
            ChampionshipId: "",
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
