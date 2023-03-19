import express, { response } from "express";
import matchsCtrl from "./matchs.controller.js";
import teamsCtrl from "./teams.controller.js";

const router = express.Router();

router.route("/teams").get(teamsCtrl.apiGetTeams);

router.route("/id/:id").get(matchsCtrl.apiGetMatchById);
router.route("/date/:date").get(matchsCtrl.apiGetMatchsByDate);
router.route("/matchs").get(matchsCtrl.apiPostMatch);

export default router;
