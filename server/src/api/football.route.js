import express from "express";
import matchsCtrl from "./matchs.controller.js";
import teamsCtrl from "./teams.controller.js";
import championshipsCtrl from "./championships.controller.js";
import newsCtrl from "./news.controller.js";
import usersCtrl from "./users.controller.js";

const router = express.Router();

router.route("/teams").get(teamsCtrl.apiGetTeams);
router.route("/championships").get(championshipsCtrl.apiGetChampionships);
router.route("/news").get(newsCtrl.apiGetAllNews);

router.route("/haveFavorites/:id").get(usersCtrl.apiHaveFavorites);
router.route("/getFavorites/:id").get(usersCtrl.apiGetFavorites);
router.route("/setFavorites").put(usersCtrl.apiSetFavorites);
router.route("/postUser").post(usersCtrl.apiPostUser);
router.route("/getUser").post(usersCtrl.apiGetUser);

router.route("/matchs/id/:id").get(matchsCtrl.apiGetMatchById);
router.route("/team/id/:id").get(teamsCtrl.apiGetTeamById);

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
  .route("/matchs/team/future/:id")
  .get(matchsCtrl.apiGetFutureMatchsByTeam);

router.route("/matchs/team/past/:id").get(matchsCtrl.apiGetPastMatchsByTeam);

router
  .route("/championship/id/:id")
  .get(championshipsCtrl.apiGetChampionshipById);

router
  .route("/championships/priority")
  .get(championshipsCtrl.apiGetChampionshipPriority);

// router.route("/matchs").get(matchsCtrl.apiGetAllHref);
// router.route("/putid").get(matchsCtrl.apiDelete);
// router.route("/putid").get(matchsCtrl.apiGetAllMatchs);

// router.route("/matchs").get(matchsCtrl.apiPostMatch);
// router.route("/championships").get(championshipsCtrl.apiPostChampionships);

export default router;
