import http from "./http-common.js";

class UserDataService {
  getPost(name, email, password) {
    let user = { name: name, email: email, password: password };
    return http.post(`/postUser`, user);
  }

  getUser(email, password) {
    let user = { email: email, password: password };
    return http.post(`/getUser`, user);
  }

  setFavorites(id, teams, championships) {
    let favorites = { id: id, teams: teams, championships: championships };
    return http.put(`/setFavorites`, favorites);
  }

  haveFavorites(id) {
    return http.get(`/haveFavorites/${id}`);
  }

  getFavorites(id) {
    return http.get(`/getFavorites/${id}`);
  }
}

// eslint-disable-next-line
export default new UserDataService();
