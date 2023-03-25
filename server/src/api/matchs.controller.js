import matchsCrawler from "../crawler/matchs.js";
import championshipsDAO from "../dao/championshipsDAO.js";
import matchsDAO from "../dao/matchsDAO.js";

export default class matchsController {
  static async apiPostMatch() {
    try {
      const matchs = await matchsCrawler.getMatchs();
      let matchTitle;
      let maxId;
      let championshipId = "";

      for (let index = 0; index < matchs.length; index++) {
        matchTitle = await matchsDAO.getMatchByTitle(matchs[index].idTitle);
        if (matchTitle === 0) {
          maxId = await matchsDAO.getMatchMaxID();
          championshipId =
            await championshipsDAO.getChampionshipByChampionshipUrl(
              matchs[index].championshipUrl
            );
          championshipId = championshipId[0]?.idChampionship;
          if (championshipId === undefined) championshipId = "";
          maxId = parseInt(maxId) + 1;
          const MatchResponse = await matchsDAO.addMatch(
            matchs[index],
            maxId.toString(),
            championshipId
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

  static async apiGetFutureMatchsByChampionship(req, res, next) {
    try {
      let id = req.params.id || {};
      // let championship = "Copa do Nordeste - 2022/2023";
      let today = new Date();
      let day = today.getDate();
      let month = today.getMonth();
      let year = today.getFullYear();
      let date = new Date(year, month, day);
      let matchs = await matchsDAO.getFutureMatchsByChampionship(id, date);
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

  static async apiGetPastMatchsByChampionship(req, res, next) {
    try {
      let id = req.params.id || {};
      // let championship = "Copa do Nordeste - 2022/2023";
      let today = new Date();
      let day = today.getDate();
      let month = today.getMonth();
      let year = today.getFullYear();
      let date = new Date(year, month, day);
      let matchs = await matchsDAO.getPastMatchsByChampionship(id, date);
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

  static async apiGetMatchs(req, res, next) {
    try {
      const matchs = await matchsDAO.getMatchs();

      for (let index = 0; index < matchs.length; index++) {
        const MatchResponse = await matchsDAO.update(matchs[index]);
        var { error } = MatchResponse;
        if (error) {
          return { error };
        }
      }

      res.json(matchs.length);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetAllChampionships(req, res, next) {
    try {
      const championships = await matchsDAO.getAllChampionships();
      var { error } = championships;
      if (error) {
        return { error };
      }

      res.json(championships);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  // static async apiDelete(req, res, next) {
  //   try {
  //     const result = await matchsDAO.getDelete();
  //     res.json(result);
  //   } catch (e) {
  //     console.log(`api, ${e}`);
  //     res.status(500).json({ error: e });
  //   }
  // }
}
