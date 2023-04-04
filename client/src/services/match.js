import http from "../http-common.js";

class MatchDataService {
  getMatch(id) {
    return http.get(`/matchs/id/${id}`);
  }

  getMatchsByDate(date, favorites) {
    const array = [];
    for (let index = 0; index < favorites.length; index++) {
      array.push(favorites[index].idChampionship);
    }
    if (array.length === 0) array.push(1);
    return http.get(
      `/matchs/date/${date}/${array.map((n) => `${n}`).join("-")}`
    );
  }

  getFutureMatchsByChampionship(id) {
    return http.get(`/matchs/championship/future/${id}`);
  }

  getPastMatchsByChampionship(id) {
    return http.get(`/matchs/championship/past/${id}`);
  }

  getFutureMatchsByTeam(id) {
    return http.get(`/matchs/team/future/${id}`);
  }

  getPastMatchsByTeam(id) {
    return http.get(`/matchs/team/past/${id}`);
  }
}

// eslint-disable-next-line
export default new MatchDataService();
