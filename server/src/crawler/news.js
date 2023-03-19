import request from "request";
import { load } from "cheerio";

// const url = "https://www.flashscore.com.br/noticias/";
// const urlShort = "https://www.flashscore.com.br";
const url = "https://www.flashscore.com.br/noticias/";
const urlShort = "https://www.flashscore.com.br";
const news = [];

export default class newsCrawler {
  static async getNews() {
    if (news.length != 0) return news;
    else {
      news.splice(0, Infinity);
      request(url, function (err, res, body) {
        if (err) console.log("Error: " + err);
        var $ = load(body);

        $("#fsNews > div").each(function (i, e) {
          var title = $(this).find("div.section__mainTitle").text().trim();

          $(this)
            .find("a")
            .each(function (i, e) {
              var href = urlShort + $(this).attr("href");
              var description = $(this).find("span > span").text().trim();

              request(href, function (err, res, body) {
                if (err) console.log("Error: " + err);
                var $ = load(body);

                $(
                  "#fsNews > div.fsNews__block.fsNews__block--article > article > figure > picture"
                ).each(function (idx, e) {
                  var img = $(this).find("img").attr("src");

                  if (description !== "" && title !== "Mais Lidas")
                    news.push({
                      href,
                      title,
                      description,
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
