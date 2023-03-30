import championshipsCrawler from "../crawler/championships.js";
import championshipsDAO from "../dao/championshipsDAO.js";

export default class championshipsController {
  static async apiPostChampionships() {
    try {
      const championships = await championshipsCrawler.getChampionships();
      let championshipFound;
      let maxId;

      for (let index = 0; index < championships.length; index++) {
        if (championships[index].url !== undefined) {
          championshipFound = await championshipsDAO.getChampionshipByUrl(
            championships[index].url
          );

          if (championshipFound === 0) {
            maxId = await championshipsDAO.getChampionshipMaxID();
            maxId = parseInt(maxId) + 1;
            const ChampionshipResponse = await championshipsDAO.addChampionship(
              championships[index],
              maxId.toString()
            );

            var { error } = ChampionshipResponse;
            if (error) {
              return { error };
            }
          } else {
            const ChampionshipResponse =
              await championshipsDAO.updateChampionship(championships[index]);

            var { error } = ChampionshipResponse;
            if (error) {
              return { error };
            }
          }
        }
      }
      return { status: "success championship" };
    } catch (error) {
      return { error: error.message };
    }
  }

  static async apiGetChampionships(req, res, next) {
    const championshipsPerPage = req.query.championshipsPerPage
      ? parseInt(req.query.championshipsPerPage, 10)
      : 20;

    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};

    if (req.query.name) {
      filters.name = req.query.name;
    }

    const { championshipsList, totalNumChampionships } =
      await championshipsDAO.getChampionships({
        filters,
        page,
        championshipsPerPage,
      });

    let response = {
      championship: championshipsList,
      page: page,
      filters: filters,
      entries_per_page: championshipsPerPage,
      total_results: totalNumChampionships,
    };
    res.json(response);
  }

  static async apiGetChampionshipById(req, res, next) {
    try {
      let id = req.params.id || {};
      let championship = await championshipsDAO.getChampionshipById(id);
      if (!championship) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(championship);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetChampionshipPriority(req, res, next) {
    try {
      let championship = await championshipsDAO.getChampionshipPriority();
      if (!championship) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(championship);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
