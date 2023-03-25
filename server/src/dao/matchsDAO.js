import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;
let matchs;

export default class matchsDAO {
  static async injectDB(conn) {
    if (matchs) {
      return;
    }
    try {
      matchs = await conn.db(process.env.RESTREVIEWS_NS).collection("matchs");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in matchsDAO: ${e}`
      );
    }
  }

  static async getMatchMaxID() {
    let maxId;
    try {
      maxId = await matchs.find().sort({ idMatch: -1 }).limit(1);
      const teamsList = await maxId.toArray();
      const idMaxMatch = teamsList[0].idMatch;
      return await idMaxMatch;
    } catch (e) {
      console.error(`Something went wrong in getMatchMaxID: ${e}`);
      throw e;
    }
  }

  static async addMatch(match, id, idChampionship) {
    try {
      const matchDoc = {
        idMatch: id,
        idTitle: match.idTitle,
        idChampionship: idChampionship,
        championshipUrl: match.championshipUrl,
        championship: match.championship,
        turn: match.turn,
        status: match.status,
        time: match.time,
        day: match.day,
        date: match.date,
        schedule: match.schedule,
        referee: match.referee,
        stadium: match.stadium,
        scoreHome: match.scoreHome,
        scoreAway: match.scoreAway,
        teams: match.teams,
        events: match.events,
        statistics: match.statistics,
        lineups: match.lineups,
      };

      return await matchs.insertOne(matchDoc);
    } catch (e) {
      console.error(`Unable to post match: ${e}`);
      return { error: e };
    }
  }

  static async updateMatch(match) {
    try {
      const updateResponse = await matchs.updateOne(
        { idTitle: match.idTitle },
        {
          $set: {
            status: match.status,
            time: match.time,
            day: match.day,
            date: match.date,
            schedule: match.schedule,
            scoreHome: match.scoreHome,
            scoreAway: match.scoreAway,
            teams: match.teams,
            events: match.events,
            statistics: match.statistics,
            lineups: match.lineups,
          },
        }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update match: ${e}`);
      return { error: e };
    }
  }

  static async getMatchByID(id) {
    try {
      const pipeline = [
        {
          $match: { idMatch: id },
        },
      ];
      return await matchs.aggregate(pipeline).toArray();
    } catch (e) {
      console.error(`Something went wrong in getMatchByID: ${e}`);
      throw e;
    }
  }

  static async getMatchByTitle(title) {
    try {
      const pipeline = [
        {
          $match: { idTitle: title },
        },
      ];
      let founded = await matchs.aggregate(pipeline).toArray();
      return await founded.length;
    } catch (e) {
      console.error(`Something went wrong in getMatchByTitle: ${e}`);
      throw e;
    }
  }

  static async getMatchsByDate(date) {
    try {
      const pipeline = [
        {
          $match: {
            date: date,
          },
        },
        {
          $sort: {
            schedule: 1,
            idTitle: 1,
          },
        },
        {
          $lookup: {
            from: "championships",
            let: {
              id: "$idChampionship",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$idChampionship", "$$id"],
                  },
                },
              },
            ],
            as: "championshipObj",
          },
        },
        {
          $addFields: {
            championshipObj: "$championshipObj",
          },
        },
        {
          $group: {
            _id: {
              championship: "$championship",
            },
            matchs: {
              $addToSet: {
                idChampionship: "$idChampionship",
                idMatch: "$idMatch",
                status: "$status",
                time: "$time",
                schedule: "$schedule",
                scoreHome: "$scoreHome",
                scoreAway: "$scoreAway",
                teams: "$teams",
                events: "$events",
              },
            },
          },
        },
        { $unwind: "$matchs" },
        { $sort: { "matchs.schedule": 1, "matchs.idMatch": 1 } },
        {
          // this $group stage is needed, because we did
          // $unwind before
          $group: {
            _id: "$_id",
            matchs: {
              $push: "$matchs",
            },
          },
        },
        {
          $sort: {
            "_id.championship": 1,
          },
        },
      ];
      return await matchs.aggregate(pipeline).toArray();
    } catch (e) {
      console.error(`Something went wrong in getMatchsByDate: ${e}`);
      throw e;
    }
  }

  static async getPastMatchsByChampionship(id, today) {
    try {
      const pipeline = [
        {
          $match: {
            idChampionship: id,
            status: { $eq: "ENCERRADO" },
          },
        },
        {
          $sort: {
            schedule: 1,
            idTitle: 1,
          },
        },
        {
          $lookup: {
            from: "championships",
            let: {
              id: "$idChampionship",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$idChampionship", "$$id"],
                  },
                },
              },
            ],
            as: "championshipObj",
          },
        },
        {
          $addFields: {
            championshipObj: "$championshipObj",
          },
        },
        {
          $group: {
            _id: {
              day: "$day",
            },
            matchs: {
              $addToSet: {
                idMatch: "$idMatch",
                status: "$status",
                time: "$time",
                schedule: "$schedule",
                scoreHome: "$scoreHome",
                scoreAway: "$scoreAway",
                teams: "$teams",
                events: "$events",
              },
            },
          },
        },
        { $unwind: "$matchs" },
        { $sort: { "matchs.schedule": 1, "matchs.idMatch": 1 } },
        {
          // this $group stage is needed, because we did
          // $unwind before
          $group: {
            _id: "$_id",
            matchs: {
              $push: "$matchs",
            },
          },
        },
        {
          $sort: {
            "_id.day": -1,
          },
        },
      ];

      return await matchs.aggregate(pipeline).toArray();
    } catch (e) {
      console.error(`Something went wrong in getMatchsByChampionship: ${e}`);
      throw e;
    }
  }

  static async getFutureMatchsByChampionship(id, today) {
    try {
      const pipeline = [
        {
          $match: {
            idChampionship: id,
            date: { $gte: today },
            status: { $ne: "ENCERRADO" },
          },
        },
        {
          $sort: {
            schedule: 1,
            idTitle: 1,
          },
        },
        {
          $lookup: {
            from: "championships",
            let: {
              id: "$idChampionship",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$idChampionship", "$$id"],
                  },
                },
              },
            ],
            as: "championshipObj",
          },
        },
        {
          $addFields: {
            championshipObj: "$championshipObj",
          },
        },
        {
          $group: {
            _id: {
              day: "$day",
            },
            matchs: {
              $addToSet: {
                idMatch: "$idMatch",
                status: "$status",
                time: "$time",
                schedule: "$schedule",
                scoreHome: "$scoreHome",
                scoreAway: "$scoreAway",
                teams: "$teams",
                events: "$events",
              },
            },
          },
        },
        { $unwind: "$matchs" },
        { $sort: { "matchs.schedule": 1, "matchs.idMatch": 1 } },
        {
          // this $group stage is needed, because we did
          // $unwind before
          $group: {
            _id: "$_id",
            matchs: {
              $push: "$matchs",
            },
          },
        },
        {
          $sort: {
            "_id.day": 1,
          },
        },
      ];

      return await matchs.aggregate(pipeline).toArray();
    } catch (e) {
      console.error(`Something went wrong in getMatchsByChampionship: ${e}`);
      throw e;
    }
  }

  static async getAllChampionships() {
    try {
      const pipeline = [
        {
          $group: {
            _id: {
              idChampionship: "$idChampionship",
              championshipUrl: "$championshipUrl",
            },
            count: { $count: {} },
          },
        },
        {
          $sort: {
            count: -1,
          },
        },
      ];

      return await matchs.aggregate(pipeline).toArray();
    } catch (e) {
      console.error(`Something went wrong in getAllChampionships: ${e}`);
      throw e;
    }
  }

  // static async getDelete() {
  //   try {
  //     return await matchs.deleteMany({
  //       idMatch: { $gte: "1993" },
  //     });
  //   } catch (e) {
  //     console.error(`Unable to delete news: ${e}`);
  //     return { error: e };
  //   }
  // }

  static async getMatchs() {
    try {
      const pipeline = [
        {
          $match: {},
        },
      ];
      return await matchs.aggregate(pipeline).toArray();
    } catch (e) {
      console.error(`Something went wrong in getMatchs: ${e}`);
      throw e;
    }
  }

  static async update(match) {
    try {
      if (
        match?.championshipUrl ===
        "https://www.placardefutebol.com.br/amistosos-selecoes"
      ) {
        console.log(match?.idMatch + " " + match?.championship);

        const updateResponse = await matchs.updateOne(
          { idMatch: match.idMatch },
          {
            $set: {
              idChampionship: "1021",
            },
          }
        );
        return updateResponse;
        return true;
      }
      return true;
    } catch (e) {
      console.error(`Something went wrong in getMatchsByDate: ${e}`);
      throw e;
    }
  }
}
