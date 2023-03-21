import newsCrawler from "../crawler/news.js";
import newsDAO from "../dao/newsDAO.js";

export default class newsController {
  static async apiPostNews() {
    try {
      const news = await newsCrawler.getNews();
      const deleted = await newsDAO.removeAllNews();

      for (let index = 0; index < news.length; index++) {
        const NewsResponse = await newsDAO.addNews(news[index]);

        var { error } = NewsResponse;
        if (error) {
          return { error };
        }
      }

      return { status: "success news" };
    } catch (error) {
      return { error: error.message };
    }
  }

  static async apiGetAllNews(req, res, next) {
    try {
      let news = await newsDAO.getAllNews();
      if (!news) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(news);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
