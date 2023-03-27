import http from "../http-common.js";

class ChampionshipDataService {
  getChampionships(search) {
    return http.get(`/championships?name=${search}`);
  }

  getChampionshipById(id) {
    return http.get(`/championship/id/${id}`);
  }

  getChampionshipsPriority() {
    return http.get(`/championships/priority`);
  }
}

// eslint-disable-next-line
export default new ChampionshipDataService();
