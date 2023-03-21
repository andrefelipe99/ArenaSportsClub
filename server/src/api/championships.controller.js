import championshipsCrawler from "../crawler/championships.js";
import matchsDAO from "../dao/matchsDAO.js";

export default class championshipsController {
  // static async apiGetMatchById(req, res, next) {
  //   try {
  //     let id = req.params.id || {};
  //     let match = await matchsDAO.getMatchByID(id);
  //     if (!match) {
  //       res.status(404).json({ error: "Not found" });
  //       return;
  //     }
  //     res.json(match);
  //   } catch (e) {
  //     console.log(`api, ${e}`);
  //     res.status(500).json({ error: e });
  //   }
  // }
}
