import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let teams;

export default class teamsDAO {
  static async injectDB(conn) {
    if (teams) {
      return;
    }
    try {
      teams = await conn.db(process.env.RESTREVIEWS_NS).collection("teams");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in teamsDAO: ${e}`
      );
    }
  }

  static async getTeams({ filters = null, page = 0, teamsPerPage = 20 } = {}) {
    let query;
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } };
      } else if ("locality" in filters) {
        query = { $text: { $search: filters["locality"] } };
      } else if ("stadium" in filters) {
        query = { $text: { $search: filters["stadium"] } };
      }
    }

    let cursor;

    try {
      cursor = await teams.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { teamsList: [], totalNumTeams: 0 };
    }

    const displayCursor = cursor.limit(teamsPerPage).skip(teamsPerPage * page);

    try {
      const teamsList = await displayCursor.toArray();
      const totalNumTeams = await teams.countDocuments(query);
      return { teamsList, totalNumTeams };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { teamsList: [], totalNumTeams: 0 };
    }
  }

  static async getTeamByID(id) {
    try {
      const pipeline = [
        {
          $match: { $text: { $search: id } },
        },
        {
          $addFields: { score: { $meta: "textScore" } },
        },
        {
          $sort: {
            score: { $meta: "textScore" },
          },
        },
        // {
        //   $lookup: {
        //     from: "reviews",
        //     let: {
        //       id: "$_id",
        //     },
        //     pipeline: [
        //       {
        //         $match: {
        //           $expr: {
        //             $eq: ["$restaurant_id", "$$id"],
        //           },
        //         },
        //       },
        //       {
        //         $sort: {
        //           date: -1,
        //         },
        //       },
        //     ],
        //     as: "reviews",
        //   },
        // },
        // {
        //   $addFields: {
        //     reviews: "$reviews",
        //   },
        // },
      ];
      return await teams.aggregate(pipeline).toArray();
    } catch (e) {
      console.error(`Something went wrong in getTeamByID: ${e}`);
      throw e;
    }
  }

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
