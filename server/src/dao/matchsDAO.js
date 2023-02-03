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
          $match: { idPartida: id },
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
          $match: { idTitulo: title },
        },
      ];
      let encontrado = await matchs.aggregate(pipeline).toArray();
      return await encontrado.length;
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
          $match: { data: date },
        },
        {
          $sort: {
            horario: 1,
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
      maxId = await matchs.find().sort({ idPartida: -1 }).limit(1);
      const teamsList = await maxId.toArray();
      const idMaxPartida = teamsList[0].idPartida;
      return await idMaxPartida;
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

  static async addMatch(partida, id) {
    try {
      const matchDoc = {
        idPartida: id,
        idTitulo: partida.idTitulo,
        campeonato: partida.campeonato,
        rodada: partida.rodada,
        status: partida.status,
        tempo: partida.tempo,
        dia: partida.dia,
        horario: partida.horario,
        arbitro: partida.arbitro,
        estadio: partida.estadio,
        placarCasa: partida.placarCasa,
        placarFora: partida.placarFora,
        equipes: partida.equipes,
        eventos: partida.eventos,
        estatisticas: partida.estatisticas,
        escalacoes: partida.escalacoes,
      };

      return await matchs.insertOne(matchDoc);
    } catch (e) {
      console.error(`Unable to post match: ${e}`);
      return { error: e };
    }
  }

  static async updateMatch(partida) {
    try {
      const updateResponse = await matchs.updateOne(
        { idTitulo: partida.idTitulo },
        {
          $set: {
            status: partida.status,
            tempo: partida.tempo,
            placarCasa: partida.placarCasa,
            placarFora: partida.placarFora,
            equipes: partida.equipes,
            eventos: partida.eventos,
            estatisticas: partida.estatisticas,
            escalacoes: partida.escalacoes,
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
