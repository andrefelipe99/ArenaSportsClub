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
}
