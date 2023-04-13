import http from "./http-common.js";

class UserDataService {
  getPost(name, email, password) {
    return http.get(`/postUser/${name}/${email}/${password}`);
  }

  getUser(email, password) {
    return http.get(`/getUser/${email}/${password}`);
  }

  haveFavorites(id) {
    return http.get(`/haveFavorites/${id}`);
  }

  getFavorites(id) {
    return http.get(`/getFavorites/${id}`);
  }

  setFavorites(id, teams, championships) {
    let arrayTeams = JSON.parse(JSON.stringify(teams));
    let arrayChampionships = JSON.parse(JSON.stringify(championships));

    for (let index = 0; index < arrayTeams.length; index++) {
      arrayTeams[index].img = arrayTeams[index].img.replaceAll("/", "@");
    }
    for (let index = 0; index < arrayChampionships.length; index++) {
      arrayChampionships[index].img = arrayChampionships[index].img.replaceAll(
        "/",
        "@"
      );
      arrayChampionships[index].imgChampionship = arrayChampionships[
        index
      ].imgChampionship.replaceAll("/", "@");
    }
    if (arrayTeams.length === 0)
      arrayTeams = [{ idTeam: "0", img: "", name: "" }];
    if (arrayChampionships.length === 0)
      arrayChampionships = [
        { idChampionship: "0", img: "", imgChampionship: "", name: "" },
      ];

    return http.get(
      `/setFavorites/${id}/${arrayTeams
        .map((n) => `${n.idTeam}*${n.img}*${n.name}`)
        .join("$")}/${arrayChampionships
        .map(
          (n) => `${n.idChampionship}*${n.img}*${n.imgChampionship}*${n.name}`
        )
        .join("$")}`
    );
  }
}

// eslint-disable-next-line
export default new UserDataService();
