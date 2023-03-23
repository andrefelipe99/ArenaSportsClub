import http from "../http-common.js";

class TeamDataService {
  getTeams(search) {
    return http.get(`/teams?name=${search}`);
  }
}

// eslint-disable-next-line
export default new TeamDataService();
