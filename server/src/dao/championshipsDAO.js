import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;
let championships;

export default class championshipsDAO {
  static async injectDB(conn) {
    if (championships) {
      return;
    }
    try {
      championships = await conn
        .db(process.env.RESTREVIEWS_NS)
        .collection("championships");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in championshipsDAO: ${e}`
      );
    }
  }

  static async getChampionships({
    filters = null,
    page = 0,
    championshipsPerPage = 20,
  } = {}) {
    let query;
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } };
      }
    }

    let cursor;

    try {
      cursor = await championships.find(query).sort({ priority: -1, name: 1 });
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { championshipsList: [], totalNumChampionships: 0 };
    }

    const displayCursor = cursor
      .limit(championshipsPerPage)
      .skip(championshipsPerPage * page);

    try {
      const championshipsList = await displayCursor.toArray();
      const totalNumChampionships = await championships.countDocuments(query);
      return { championshipsList, totalNumChampionships };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { championshipsList: [], totalNumChampionships: 0 };
    }
  }

  static async getChampionshipMaxID() {
    let maxId;
    try {
      maxId = await championships.find().sort({ idChampionship: -1 }).limit(1);
      const championshipsList = await maxId.toArray();
      const idMaxChampionship = championshipsList[0].idChampionship;
      return await idMaxChampionship;
    } catch (e) {
      console.error(`Something went wrong in getChampionshipMaxID: ${e}`);
      throw e;
    }
  }

  static async getChampionshipByChampionshipUrl(url) {
    try {
      const pipeline = [
        {
          $match: { url: url },
        },
      ];
      return await championships.aggregate(pipeline).toArray();
    } catch (e) {
      console.error(`Something went wrong in getChampionshipByUrl: ${e}`);
      throw e;
    }
  }

  static async getChampionshipByUrl(url) {
    try {
      const pipeline = [
        {
          $match: { url: url },
        },
      ];
      let founded = await championships.aggregate(pipeline).toArray();
      return await founded.length;
    } catch (e) {
      console.error(`Something went wrong in getChampionshipByUrl: ${e}`);
      throw e;
    }
  }

  static async addChampionship(championship, id) {
    try {
      const championshipDoc = {
        idChampionship: id,
        url: championship.url,
        name: championship.name,
        img: championship.img,
        imgChampionship: championship.imgChampionship,
        priority: 1,
        table: championship.table,
        statistics: championship.statistics,
      };

      return await championships.insertOne(championshipDoc);
    } catch (e) {
      console.error(`Unable to post championship: ${e}`);
      return { error: e };
    }
  }

  static async updateChampionship(championship) {
    try {
      const updateResponse = await championships.updateOne(
        { url: championship.url },
        {
          $set: {
            table: championship.table,
            statistics: championship.statistics,
          },
        }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update championship: ${e}`);
      return { error: e };
    }
  }

  static async getChampionshipById(id) {
    try {
      const pipeline = [
        {
          $match: { idChampionship: id },
        },
      ];
      return await championships.aggregate(pipeline).toArray();
    } catch (e) {
      console.error(`Something went wrong in getChampionshipById: ${e}`);
      throw e;
    }
  }

  static async getChampionshipPriority() {
    try {
      const pipeline = [
        {
          $match: { priority: { $gte: 2 } },
        },
        {
          $sort: { priority: -1, name: 1 },
        },
      ];
      return await championships.aggregate(pipeline).toArray();
    } catch (e) {
      console.error(`Something went wrong in getChampionshipPriority: ${e}`);
      throw e;
    }
  }
}
