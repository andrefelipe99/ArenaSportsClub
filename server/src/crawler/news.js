import request from "request";
import { load } from "cheerio";

const url = "https://www.flashscore.com.br/noticias/";
const urlShort = "https://www.flashscore.com.br";
const news = [];

export default class newsCrawler {
  static async clearNews() {
    try {
      news.splice(0, Infinity);
      const newsUpdated = await this.getNews();
      return;
    } catch (error) {
      console.error(`Unable to clear news: ${error}`);
      return { error: error };
    }
  }

  static async getNews() {
    if (news.length != 0) return news;
    else {
      news.splice(0, Infinity);
      request(url, function (err, res, body) {
        if (err) console.log("Error: " + err);
        var $ = load(body);
        $("#fsNews > div").each(function (i, e) {
          var category = $(this).find("div.section__mainTitle").text().trim();
          category = category.replace(/[+].*/, "");
          var priority = "5";

          if (category === "Destaques") {
            priority = "1";
          } else if (category === "Futebol brasileiro") {
            priority = "2";
          } else if (category === "Últimas notícias") {
            priority = "3";
          }

          $(this)
            .find("a")
            .each(function (i, e) {
              var href = urlShort + $(this).attr("href");
              var title = $(this).find("span > span").text().trim();

              request(href, function (err, res, body) {
                if (err) console.log("Error: " + err);
                var $ = load(body);

                $(
                  "#fsNews > div.fsNews__block.fsNews__block--article > article > figure > picture"
                ).each(function (idx, e) {
                  var img = $(this).find("img").attr("src");

                  if (title !== "" && category !== "Mais Lidas")
                    news.push({
                      priority,
                      href,
                      category,
                      title,
                      img,
                    });
                });
              });
            });
        });
      });
      return news;
    }
  }
}
