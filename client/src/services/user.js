import http from "./http-common.js";

class UserDataService {
  getPost(name, email, password) {
    return http.get(`/postUser/${name}/${email}/${password}`);
  }

  getUser(email, password) {
    return http.get(`/getUser/${email}/${password}`);
  }
}

// eslint-disable-next-line
export default new UserDataService();
