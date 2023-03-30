import express from "express";
import matchsCtrl from "./matchs.controller.js";
import teamsCtrl from "./teams.controller.js";
import championshipsCtrl from "./championships.controller.js";
import newsCtrl from "./news.controller.js";

const router = express.Router();

router.route("/teams").get(teamsCtrl.apiGetTeams);
router.route("/championships").get(championshipsCtrl.apiGetChampionships);
router.route("/news").get(newsCtrl.apiGetAllNews);

router.route("/matchs/id/:id").get(matchsCtrl.apiGetMatchById);

router
  .route("/matchs/date/:date/:favorites")
  .get(matchsCtrl.apiGetMatchsByDate);

router
  .route("/matchs/championship/future/:id")
  .get(matchsCtrl.apiGetFutureMatchsByChampionship);

router
  .route("/matchs/championship/past/:id")
  .get(matchsCtrl.apiGetPastMatchsByChampionship);

router
  .route("/championship/id/:id")
  .get(championshipsCtrl.apiGetChampionshipById);

router
  .route("/championships/priority")
  .get(championshipsCtrl.apiGetChampionshipPriority);

// router.route("/matchs").get(matchsCtrl.apiGetAllChampionships);
// router.route("/putid").get(matchsCtrl.apiDelete);
// router.route("/putid").get(matchsCtrl.apiGetAllMatchs);

// router.route("/matchs").get(matchsCtrl.apiPostMatch);
// router.route("/championships").get(championshipsCtrl.apiPostChampionships);

export default router;
