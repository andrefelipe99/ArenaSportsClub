import http from "../http-common.js";

class ChampionshipDataService {
  getChampionshipById(id) {
    return http.get(`/championship/id/${id}`);
  }

  getChampionshipsPriority() {
    return http.get(`/championships/priority`);
  }
}

// eslint-disable-next-line
export default new ChampionshipDataService();
