import express from "express";
import teamsCtrl from "./teams.controller.js";
//import ReviewsCtrl from "./reviews.controller.js";

const router = express.Router();

router.route("/").get(teamsCtrl.apiGetTeams);
router.route("/id/:id").get(teamsCtrl.apiGetTeamById);
//router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines)

// router
//   .route("/review")
//   .post(ReviewsCtrl.apiPostReview)
//   .put(ReviewsCtrl.apiUpdateReview)
//   .delete(ReviewsCtrl.apiDeleteReview);

export default router;
