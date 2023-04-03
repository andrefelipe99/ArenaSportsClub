import teamsCrawler from "../crawler/teams.js";
import teamsDAO from "../dao/teamsDAO.js";

export default class teamsController {
  static async apiPostTeams() {
    try {
      const teams = await teamsCrawler.getTeams();
      let teamFound;
      let maxId;

      for (let index = 0; index < teams.length; index++) {
        if (teams[index].url !== undefined) {
          teamFound = await teamsDAO.getTeamByUrl(teams[index].url);

          if (teamFound === 0) {
            maxId = await teamsDAO.getTeamMaxID();
            maxId = parseInt(maxId) + 1;
            const teamResponse = await teamsDAO.addTeam(
              teams[index],
              maxId.toString()
            );

            var { error } = teamResponse;
            if (error) {
              return { error };
            }
          } else {
            const teamResponse = await teamsDAO.updateTeam(teams[index]);

            var { error } = teamResponse;
            if (error) {
              return { error };
            }
          }
        }
      }
      return { status: "success teams" };
    } catch (error) {
      return { error: error.message };
    }
  }

  static async apiGetTeamById(req, res, next) {
    try {
      let id = req.params.id || {};
      let team = await teamsDAO.getTeamByID(id);
      if (!team) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(team);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetTeams(req, res, next) {
    const teamsPerPage = req.query.teamsPerPage
      ? parseInt(req.query.teamsPerPage, 10)
      : 20;

    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};

    if (req.query.locality) {
      filters.locality = req.query.locality;
    } else if (req.query.stadium) {
      filters.stadium = req.query.stadium;
    } else if (req.query.name) {
      filters.name = req.query.name;
    }

    const { teamsList, totalNumTeams } = await teamsDAO.getTeams({
      filters,
      page,
      teamsPerPage,
    });

    let response = {
      team: teamsList,
      page: page,
      filters: filters,
      entries_per_page: teamsPerPage,
      total_results: totalNumTeams,
    };
    res.json(response);
  }
}
