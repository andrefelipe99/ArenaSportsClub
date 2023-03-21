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

  static async getTeamMaxID() {
    let maxId;
    try {
      maxId = await teams.find().sort({ id: -1 }).limit(1);
      const teamsList = await maxId.toArray();
      const idMatch = teamsList[0].id;
      return await idMatch;
    } catch (e) {
      console.error(`Something went wrong in getTeamMaxID: ${e}`);
      throw e;
    }
  }

  static async getTeamByID(id) {
    try {
      const pipeline = [
        {
          $match: { id: id },
        },
      ];
      return await teams.aggregate(pipeline).toArray();
    } catch (e) {
      console.error(`Something went wrong in getTeamByID: ${e}`);
      throw e;
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
}
