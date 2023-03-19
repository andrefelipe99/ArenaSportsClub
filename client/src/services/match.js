import http from "../http-common.js";

class MatchDataService {
  //   getAll(page = 0) {
  //     return http.get(`restaurants?page=${page}`);
  //   }

  getMatch(id) {
    return http.get(`/id/${id}`);
  }

  getMatchsByDate(date) {
    return http.get(`/date/${date}`);
  }

  //   find(query, by = "name", page = 0) {
  //     return http.get(`restaurants?${by}=${query}&page=${page}`);
  //   }

  //   createReview(data) {
  //     return http.post("/review-new", data);
  //   }

  //   updateReview(data) {
  //     return http.put("/review-edit", data);
  //   }

  //   deleteReview(id, userId) {
  //     return http.delete(`/review-delete?id=${id}`, {
  //       data: { user_id: userId },
  //     });
  //   }

  //   getCuisines(id) {
  //     return http.get(`/cuisines`);
  //   }
}

// eslint-disable-next-line
export default new MatchDataService();
