import matchsCrawler from "../crawler/matchs.js";
import championshipsDAO from "../dao/championshipsDAO.js";
import teamsDAO from "../dao/teamsDAO.js";
import matchsDAO from "../dao/matchsDAO.js";

export default class matchsController {
  static async apiPostMatch() {
    try {
      const matchs = await matchsCrawler.getMatchs();
      let matchTitle;
      let maxId;
      let championshipId = "";
      let teamHomeId = "";
      let teamAwayId = "";

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
          if (
            matchs[index].idChampionship !== "" &&
            matchs[index].idChampionship !== null
          ) {
            championshipId = matchs[index].idChampionship;
          } else {
            championshipId =
              await championshipsDAO.getChampionshipByChampionshipUrl(
                matchs[index].championshipUrl
              );
            championshipId = championshipId[0]?.idChampionship;
            if (championshipId === undefined) championshipId = "";
          }
          teamHomeId = await teamsDAO.getTeamByTeamUrl(
            matchs[index].teams.teamHomeHref
          );
          teamHomeId = teamHomeId[0]?.idTeam;
          if (teamHomeId === undefined) teamHomeId = "";
          teamAwayId = await teamsDAO.getTeamByTeamUrl(
            matchs[index].teams.teamAwayHref
          );
          teamAwayId = teamAwayId[0]?.idTeam;
          if (teamAwayId === undefined) teamAwayId = "";

          const MatchResponse = await matchsDAO.updateMatch(
            matchs[index],
            championshipId,
            teamHomeId,
            teamAwayId
          );

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
      let favorites = req.params.favorites || {};
      let favoritesFilter = favorites.split("-");
      let splitter = date.split("-");
      const dateFilter =
        splitter[0]?.trim() +
        "/" +
        splitter[1]?.trim() +
        "/" +
        splitter[2]?.trim();
      let match = await matchsDAO.getMatchsByDate(dateFilter, favoritesFilter);

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

  static async apiUpdateYesterdayMatchs() {
    try {
      const matchs = await matchsDAO.getMatchs();
      let today = new Date();
      let day = today.getDate();
      let month = today.getMonth();
      let year = today.getFullYear();
      let date = new Date(year, month, day);
      for (let index = 0; index < matchs.length; index++) {
        const MatchResponse = await matchsDAO.updateYesterday(
          matchs[index],
          date
        );
        var { error } = MatchResponse;
        if (error) {
          return { error };
        }
      }
      return { status: "success yesterday" };
    } catch (error) {
      return { error: error.message };
    }
  }

  // static async apiGetAllMatchs(req, res, next) {
  //   try {
  //     const matchs = await matchsDAO.getMatchs();
  //     let today = new Date();
  //     let day = today.getDate();
  //     let month = today.getMonth();
  //     let year = today.getFullYear();
  //     let date = new Date(year, month, day);
  //     for (let index = 0; index < matchs.length; index++) {
  //       const MatchResponse = await matchsDAO.update(matchs[index], date);
  //       var { error } = MatchResponse;
  //       if (error) {
  //         return { error };
  //       }
  //     }

  //     res.json(matchs.length);
  //   } catch (e) {
  //     console.log(`api, ${e}`);
  //     res.status(500).json({ error: e });
  //   }
  // }

  static async apiGetAllChampionships(req, res, next) {
    try {
      const championships = await matchsDAO.getAllChampionships();
      var { error } = championships;
      if (error) {
        return { error };
      }
      let array = [];
      championships.forEach((element) => {
        if (
          element._id.championshipUrl !== "" &&
          element._id.championshipUrl !== null
        )
          array.push(element._id.championshipUrl);
      });
      return array;
    } catch (e) {
      console.log(`api, ${e}`);
      return { error: e.message };
    }
  }

  static async apiGetAllTeams(req, res, next) {
    try {
      const teams = await matchsDAO.getAllHomeTeams();
      const teams2 = await matchsDAO.getAllAwayTeams();
      var { error } = teams;
      if (error) {
        return { error };
      }
      let array = [];
      teams.forEach((element) => {
        if (element._id.teamHref !== "" && element._id.teamHref !== null)
          array.push(element._id.teamHref);
      });
      teams2.forEach((element) => {
        if (element._id.teamHref !== "" && element._id.teamHref !== null)
          array.push(element._id.teamHref);
      });
      return array;
    } catch (e) {
      console.log(`api, ${e}`);
      return { error: e.message };
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
