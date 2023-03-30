import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;
let news;

export default class newsDAO {
  static async injectDB(conn) {
    if (news) {
      return;
    }
    try {
      news = await conn.db(process.env.RESTREVIEWS_NS).collection("news");
    } catch (e) {
      console.error(`Unable to establish a collection handle in newsDAO: ${e}`);
    }
  }

  static async addNews(newsObj) {
    try {
      const newsDoc = {
        priority: newsObj.priority,
        href: newsObj.href,
        category: newsObj.category,
        title: newsObj.title,
        subtitle: newsObj.subtitle,
        img: newsObj.img,
      };

      return await news.insertOne(newsDoc);
    } catch (e) {
      console.error(`Unable to post news: ${e}`);
      return { error: e };
    }
  }

  static async removeAllNews() {
    try {
      return await news.deleteMany({});
    } catch (e) {
      console.error(`Unable to delete news: ${e}`);
      return { error: e };
    }
  }

  static async getAllNews() {
    try {
      const pipeline = [
        {
          $group: {
            _id: {
              category: "$category",
              priority: "$priority",
            },
            news: {
              $addToSet: {
                href: "$href",
                title: "$title",
                subtitle: "$subtitle",
                img: "$img",
              },
            },
          },
        },
        { $unwind: "$news" },
        { $sort: { "news.title": 1, "news.href": 1 } },
        {
          // this $group stage is needed, because we did $unwind before
          $group: {
            _id: "$_id",
            news: {
              $push: "$news",
            },
          },
        },
        {
          $sort: {
            "_id.priority": 1,
            "_id.category": 1,
          },
        },
      ];
      return await news.aggregate(pipeline).toArray();
    } catch (e) {
      console.error(`Something went wrong in getAllNews: ${e}`);
      throw e;
    }
  }
}
