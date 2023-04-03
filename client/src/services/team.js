import http from "../http-common.js";

class TeamDataService {
  getTeams(search) {
    return http.get(`/teams?name=${search}`);
  }

  getTeamById(id) {
    return http.get(`/team/id/${id}`);
  }
}

// eslint-disable-next-line
export default new TeamDataService();
