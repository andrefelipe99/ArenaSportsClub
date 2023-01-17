import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let cinema;

export default class cinemaDAO {
  static async injectDB(conn) {
    if (cinema) {
      return;
    }
    try {
      cinema = await conn.db(process.env.RESTREVIEWS_NS).collection("movies");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in cinemaDAO: ${e}`
      );
    }
  }

  static async getCinema({
    filters = null,
    page = 0,
    cinemaPerPage = 20,
  } = {}) {
    let query;
    if (filters) {
      if ("title" in filters) {
        query = { $text: { $search: filters["title"] } };
      } else if ("year" in filters) {
        query = { year: { $eq: filters["year"] } };
      } else if ("votes" in filters) {
        query = { "imdb.votes": { $gt: filters["votes"] } };
      }
    }

    let cursor;

    try {
      cursor = await cinema.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { cinemaList: [], totalNumCinema: 0 };
    }

    const displayCursor = cursor
      .limit(cinemaPerPage)
      .skip(cinemaPerPage * page);

    try {
      const cinemaList = await displayCursor.toArray();
      const totalNumCinema = await cinema.countDocuments(query);
      return { cinemaList, totalNumCinema };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { cinemaList: [], totalNumCinema: 0 };
    }
  }

  //   static async getRestaurantByID(id) {
  //     try {
  //       const pipeline = [
  //         {
  //           $match: {
  //             _id: new ObjectId(id),
  //           },
  //         },
  //         {
  //           $lookup: {
  //             from: "reviews",
  //             let: {
  //               id: "$_id",
  //             },
  //             pipeline: [
  //               {
  //                 $match: {
  //                   $expr: {
  //                     $eq: ["$restaurant_id", "$$id"],
  //                   },
  //                 },
  //               },
  //               {
  //                 $sort: {
  //                   date: -1,
  //                 },
  //               },
  //             ],
  //             as: "reviews",
  //           },
  //         },
  //         {
  //           $addFields: {
  //             reviews: "$reviews",
  //           },
  //         },
  //       ];
  //       return await restaurants.aggregate(pipeline).next();
  //     } catch (e) {
  //       console.error(`Something went wrong in getRestaurantByID: ${e}`);
  //       throw e;
  //     }
  //   }

  //   static async getCuisines() {
  //     let cuisines = [];
  //     try {
  //       cuisines = await restaurants.distinct("cuisine");
  //       return cuisines;
  //     } catch (e) {
  //       console.error(`Unable to get cuisines, ${e}`);
  //       return cuisines;
  //     }
  //   }
}
