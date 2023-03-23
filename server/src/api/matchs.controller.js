import matchsCrawler from "../crawler/matchs.js";
import matchsDAO from "../dao/matchsDAO.js";

export default class matchsController {
  static async apiPostMatch() {
    try {
      const matchs = await matchsCrawler.getMatchs();
      let matchTitle;
      let maxId;

      for (let index = 0; index < matchs.length; index++) {
        matchTitle = await matchsDAO.getMatchByTitle(matchs[index].idTitle);

        if (matchTitle === 0) {
          maxId = await matchsDAO.getMatchMaxID();
          maxId = parseInt(maxId) + 1;
          const MatchResponse = await matchsDAO.addMatch(
            matchs[index],
            maxId.toString()
          );

          var { error } = MatchResponse;
          if (error) {
            return { error };
          }
        } else {
          const MatchResponse = await matchsDAO.updateMatch(matchs[index]);

          var { error } = MatchResponse;
          if (error) {
            return { error };
          }
        }
      }
      return { status: "success" };
    } catch (error) {
      return { error: error.message };
    }
  }

  static async apiGetMatchById(req, res, next) {
    try {
      let id = req.params.id || {};
      let match = await matchsDAO.getMatchByID(id);
      if (!match) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(match);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetMatchsByDate(req, res, next) {
    try {
      let date = req.params.date || {};
      let splitter = date.split("-");
      let year = parseInt(splitter[2]?.trim());
      let month = parseInt(splitter[1]?.trim()) - 1;
      let day = parseInt(splitter[0]?.trim());
      const dateFilter = new Date(year, month, day);
      let match = await matchsDAO.getMatchsByDate(dateFilter);
      if (!match) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(match);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetMatchsByChampionship(req, res, next) {
    try {
      // let championship = req.params.id || {};
      let championship = "Copa do Nordeste - 2022/2023";
      let today = "01/04/2023";
      let matchs = await matchsDAO.getMatchsByChampionship(championship, today);
      if (!matchs) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(matchs);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
