import request from "request";
import { load } from "cheerio";

const base = "https://www.placardefutebol.com.br";
const urls = [];

const teams = [];
const infos = [];
const titles = [];

export default class teamsCrawler {
  static async clearTeams() {
    try {
      teams.splice(0, Infinity);
      return;
    } catch (error) {
      console.error(`Unable to clear teams: ${error}`);
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
      console.error(`Unable to get urls teams: ${error}`);
      return { error: error };
    }
  }

  static async getTeams() {
    if (teams.length != 0) return teams;
    else {
      infos.splice(0, Infinity);
      titles.splice(0, Infinity);
      urls.forEach((url) => {
        var urlCombinated = base + url;
        request(urlCombinated, function (err, res, body) {
          if (err) console.log("Error: " + err);
          var $ = load(body);

          var name = "";
          var img = "";
          $("body > section > div.content__title").each(function (i, e) {
            name = $(this).find("h1").text().trim();
            img = $(this).find("img").attr("src");
          });

          $("#main > div > div > p").each(function (i, e) {
            var title = $(this).text().trim();
            title = title.split(":");
            title = title[0];
            var description = $(this).find("p > span").text().trim();

            if (title && title !== "") infos.push({ title, description, url });
          });

          var urlTitle = urlCombinated + "/titulos";
          request(urlTitle, function (err, res, body) {
            if (err) console.log("Error: " + err);
            var $ = load(body);

            $("#main > div > div > div.table__row").each(function (i, e) {
              var year = $(this).find(".width_20").text().trim();
              var name = $(this).find("a > span").text().trim();
              var logo = $(this).find("a > img").attr("src");

              if (name != "" && name) {
                titles.push({
                  year,
                  name,
                  logo,
                  url,
                });
              }
            });

            var infosAux = [];
            infos.forEach((element) => {
              if (element.url === url)
                infosAux.push({
                  title: element.title,
                  description: element.description,
                });
            });

            var titlesAux = [];
            titles.forEach((element) => {
              if (element.url === url)
                titlesAux.push({
                  year: element.year,
                  name: element.name,
                  logo: element.logo,
                });
            });

            teams.push({
              idTeam: "",
              url,
              name,
              img,
              infos: infosAux,
              titles: titlesAux,
            });
          });
        });
      });
      return teams;
    }
  }
}
