import express from "express";
import cinemaCtrl from "./cinema.controller.js";
//import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router();

router.route("/").get(cinemaCtrl.apiGetCinema);
//router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantById)
//router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines)

// router
//   .route("/review")
//   .post(ReviewsCtrl.apiPostReview)
//   .put(ReviewsCtrl.apiUpdateReview)
//   .delete(ReviewsCtrl.apiDeleteReview)

export default router;
