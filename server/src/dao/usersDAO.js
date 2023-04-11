import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;
let users;

export default class usersDAO {
  static async injectDB(conn) {
    if (users) {
      return;
    }
    try {
      users = await conn.db(process.env.RESTREVIEWS_NS).collection("users");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in usersDAO: ${e}`
      );
    }
  }

  static async getFoundEmail(email) {
    try {
      const pipeline = [
        {
          $match: { email: email },
        },
      ];
      let founded = await users.aggregate(pipeline).toArray();

      if (founded?.length > 0) return true;
      else return false;
    } catch (e) {
      console.error(`Something went wrong in getFoundEmail: ${e}`);
      throw e;
    }
  }

  static async addUser(name, email, password) {
    try {
      const userDoc = {
        name: name,
        email: email,
        password: password,
        favorites: { teams: [], championships: [] },
      };

      return await users.insertOne(userDoc);
    } catch (e) {
      console.error(`Unable to post user: ${e}`);
      return { error: e };
    }
  }

  static async getUser(email) {
    try {
      const pipeline = [
        {
          $match: { email: email },
        },
      ];
      return await users.aggregate(pipeline).toArray();
    } catch (e) {
      console.error(`Something went wrong in getUser: ${e}`);
      throw e;
    }
  }
}
