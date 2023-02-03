import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;
let teams;
let idPartida;

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

  //get by id para varias ocasioes
  //mudando para $match: { title: id } e verificar o length, encontra se existe algum title desse jogo se sim update se nao create
  static async getTeamByID(id) {
    try {
      const pipeline = [
        {
          $match: { api_id: id },
        },
        // {
        //   $addFields: { score: { $meta: "textScore" } },
        // },
        // {
        //   $sort: {
        //     score: { $meta: "textScore" },
        //   },
        // },
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

  //pega o id max e retorna no X, tem que tratar e testar toarray no maxid
  static async getMaxID(id) {
    let maxId;
    try {
      maxId = await teams.find().sort({ api_id: -1 }).limit(1);
    } catch (e) {
      console.error(`Something went wrong in getMaxID: ${e}`);
      throw e;
    }

    try {
      const teamsList = await maxId.toArray();
      const x = teamsList[0].api_id;
      console.log(x);
      return { teamsList };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { teamsList: [] };
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
