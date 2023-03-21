import http from "../http-common.js";

class NewsDataService {
  getAllNews() {
    return http.get(`/news`);
  }
}

// eslint-disable-next-line
export default new NewsDataService();
