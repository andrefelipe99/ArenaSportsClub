import cinemaDAO from "../dao/cinemaDAO.js";

export default class cinemaController {
  static async apiGetCinema(req, res, next) {
    const cinemaPerPage = req.query.cinemaPerPage
      ? parseInt(req.query.cinemaPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.year) {
      filters.year = parseInt(req.query.year);
    } else if (req.query.votes) {
      filters.votes = parseInt(req.query.votes);
    } else if (req.query.title) {
      filters.title = req.query.title;
    }

    const { cinemaList, totalNumCinema } = await cinemaDAO.getCinema({
      filters,
      page,
      cinemaPerPage,
    });

    let response = {
      cinema: cinemaList,
      page: page,
      filters: filters,
      entries_per_page: cinemaPerPage,
      total_results: totalNumCinema,
    };
    res.json(response);
  }

  //   static async apiGetRestaurantById(req, res, next) {
  //     try {
  //       let id = req.params.id || {}
  //       let restaurant = await RestaurantsDAO.getRestaurantByID(id)
  //       if (!restaurant) {
  //         res.status(404).json({ error: "Not found" })
  //         return
  //       }
  //       res.json(restaurant)
  //     } catch (e) {
  //       console.log(`api, ${e}`)
  //       res.status(500).json({ error: e })
  //     }
  //   }

  //   static async apiGetRestaurantCuisines(req, res, next) {
  //     try {
  //       let cuisines = await RestaurantsDAO.getCuisines()
  //       res.json(cuisines)
  //     } catch (e) {
  //       console.log(`api, ${e}`)
  //       res.status(500).json({ error: e })
  //     }
  //   }
}
