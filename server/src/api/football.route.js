import express from "express";
import matchsCtrl from "./matchs.controller.js";
import teamsCtrl from "./teams.controller.js";

const router = express.Router();

router.route("/").get(teamsCtrl.apiGetTeams);
router.route("/id/:id").get(matchsCtrl.apiGetMatchById);
router.route("/data/:data").get(matchsCtrl.apiGetMatchsByDate);
router.route("/partidas").get(matchsCtrl.apiPostMatch);

export default router;
