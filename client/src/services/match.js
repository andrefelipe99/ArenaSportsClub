import http from "../http-common.js";

class MatchDataService {
  getMatch(id) {
    return http.get(`/matchs/id/${id}`);
  }

  getMatchsByDate(date) {
    return http.get(`/matchs/date/${date}`);
  }

  getFutureMatchsByChampionship(id) {
    return http.get(`/matchs/championship/future/${id}`);
  }

  getPastMatchsByChampionship(id) {
    return http.get(`/matchs/championship/past/${id}`);
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
