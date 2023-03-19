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

  //   static async getMatchs({ filters = null, page = 0, teamsPerPage = 20 } = {}) {
  //     let query;
  //     if (filters) {
  //       if ("name" in filters) {
  //         query = { $text: { $search: filters["name"] } };
  //       } else if ("locality" in filters) {
  //         query = { $text: { $search: filters["locality"] } };
  //       } else if ("stadium" in filters) {
  //         query = { $text: { $search: filters["stadium"] } };
  //       }
  //     }

  //     let cursor;

  //     try {
  //       cursor = await teams.find(query);
  //     } catch (e) {
  //       console.error(`Unable to issue find command, ${e}`);
  //       return { teamsList: [], totalNumTeams: 0 };
  //     }

  //     const displayCursor = cursor.limit(teamsPerPage).skip(teamsPerPage * page);

  //     try {
  //       const teamsList = await displayCursor.toArray();
  //       const totalNumTeams = await teams.countDocuments(query);
  //       return { teamsList, totalNumTeams };
  //     } catch (e) {
  //       console.error(
  //         `Unable to convert cursor to array or problem counting documents, ${e}`
  //       );
  //       return { teamsList: [], totalNumTeams: 0 };
  //     }
  //   }

  //get by id para varias ocasioes
  //mudando para $match: { title: id } e verificar o length, encontra se existe algum title desse jogo se sim update se nao create
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
      console.error(`Something went wrong in getMatchByID: ${e}`);
      throw e;
    }
  }

  static async getMatchsByDate(date) {
    // let day = new Date().getDate();
    // let month = new Date().getMonth();
    // let year = new Date().getFullYear();
    // let todayDate = day + "/" + month + "/" + year;

    try {
      const pipeline = [
        {
          $match: {
            day: date,
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

  //pega o id max e retorna no X, tem que tratar e testar toarray no maxid
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

  static async addMatch(match, id) {
    try {
      const matchDoc = {
        idMatch: id,
        idTitle: match.idTitle,
        idChampionship: match.idChampionship,
        championshipUrl: match.championshipUrl,
        championship: match.championship,
        turn: match.turn,
        status: match.status,
        time: match.time,
        day: match.day,
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
}
