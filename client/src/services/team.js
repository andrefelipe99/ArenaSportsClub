import http from "../http-common.js";

class TeamDataService {
  getTeams(search) {
    return http.get(`/teams?name=${search}`);
  }

  getMatchsByDate(date) {
    return http.get(`/date/${date}`);
  }
}

// eslint-disable-next-line
export default new TeamDataService();
