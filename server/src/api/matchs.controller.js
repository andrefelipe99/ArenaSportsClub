import partidasCrawler from "../crawler/partidas.js";
import matchsDAO from "../dao/matchsDAO.js";

export default class matchsController {
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
      let date = req.params.data || {};
      date = date.toString().replace(/-/g, "/");
      let match = await matchsDAO.getMatchsByDate(date);
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

  static async apiGetMatchMaxId() {
    try {
      let maxId = await matchsDAO.getMatchMaxID();
      if (!maxId) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      return maxId;
    } catch (error) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiPostMatch(req, res, next) {
    let count = 0;
    try {
      const partidas = await partidasCrawler.getPartidas();
      let partidaTitle;
      let maxId;

      for (let index = 0; index < partidas.length; index++) {
        partidaTitle = await matchsDAO.getMatchByTitle(
          partidas[index].idTitulo
        );

        if (partidaTitle === 0) {
          maxId = await matchsDAO.getMatchMaxID();
          maxId = parseInt(maxId) + 1;
          const MatchResponse = await matchsDAO.addMatch(
            partidas[index],
            maxId.toString()
          );
        } else {
          count++;
          const MatchResponse = await matchsDAO.updateMatch(partidas[index]);

          var { error } = MatchResponse;
          if (error) {
            res.status(400).json({ error });
          }
        }
      }
      res.json({ status: "success" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    console.log(count);
  }
}
