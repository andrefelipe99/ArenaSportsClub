import express from "express";
import cors from "cors";
import football from "./src/api/football.route.js";
import matchsCrawler from "./src/crawler/matchs.js";
import championshipsCrawler from "./src/crawler/championships.js";
import newsCrawler from "./src/crawler/news.js";
import matchsController from "./src/api/matchs.controller.js";
import newsController from "./src/api/news.controller.js";
import championshipsController from "./src/api/championships.controller.js";
import matchsDAO from "./src/dao/matchsDAO.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/football", football);
//app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

// const news = await newsCrawler.getNews();
// const matchs = await matchsCrawler.getMatchs();
// const championships = await championshipsCrawler.getChampionships();
// app.get("/pp", (req, res) => {
//   res.json({ championships });
// });

// setInterval(async () => {
//   const championship = await championshipsController.apiPostChampionships();
//   console.log(championship);
// }, 600000);

// setInterval(async () => {
//   const news = await newsController.apiPostNews();
//   console.log(news);
// }, 600000);

// setInterval(async () => {
//   const post = await matchsController.apiPostMatch();
//   const clear = await matchsCrawler.clearMatchs();
//   console.log(post);
// }, 40000);

//daqui pra baixo API testes
// const partidas = [
//   {
//     idMatch: "2",
//     equipeCasa: "Real Madrid",
//     equipeFora: "Barcelona",
//     data: "14:00",
//     placarCasa: "2",
//     placarFora: "0",
//     imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
//     imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/19/83.png",
//   },
//   {
//     idMatch: "3",
//     equipeCasa: "Liverpool",
//     equipeFora: "Manchester United",
//     data: "15:00",
//     placarCasa: "4",
//     placarFora: "3",
//     imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/8/8.png",
//     imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/14/14.png",
//   },
//   {
//     idMatch: "2",
//     equipeCasa: "Real Madrid",
//     equipeFora: "Barcelona",
//     data: "14:00",
//     placarCasa: "2",
//     placarFora: "0",
//     imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
//     imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/19/83.png",
//   },
//   {
//     idMatch: "3",
//     equipeCasa: "Liverpool",
//     equipeFora: "Manchester United",
//     data: "15:00",
//     placarCasa: "4",
//     placarFora: "3",
//     imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/8/8.png",
//     imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/14/14.png",
//   },
//   {
//     idMatch: "2",
//     equipeCasa: "Real Madrid",
//     equipeFora: "Barcelona",
//     data: "14:00",
//     placarCasa: "2",
//     placarFora: "0",
//     imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
//     imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/19/83.png",
//   },
//   {
//     idMatch: "3",
//     equipeCasa: "Liverpool",
//     equipeFora: "Manchester United",
//     data: "15:00",
//     placarCasa: "4",
//     placarFora: "3",
//     imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/8/8.png",
//     imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/14/14.png",
//   },
//   {
//     idMatch: "2",
//     equipeCasa: "Real Madrid",
//     equipeFora: "Barcelona",
//     data: "14:00",
//     placarCasa: "2",
//     placarFora: "0",
//     imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
//     imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/19/83.png",
//   },
//   {
//     idMatch: "3",
//     equipeCasa: "Liverpool",
//     equipeFora: "Manchester United",
//     data: "15:00",
//     placarCasa: "4",
//     placarFora: "3",
//     imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/8/8.png",
//     imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/14/14.png",
//   },
//   {
//     idMatch: "2",
//     equipeCasa: "Real Madrid",
//     equipeFora: "Barcelona",
//     data: "14:00",
//     placarCasa: "2",
//     placarFora: "0",
//     imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
//     imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/19/83.png",
//   },
//   {
//     idMatch: "3",
//     equipeCasa: "Liverpool",
//     equipeFora: "Manchester United",
//     data: "15:00",
//     placarCasa: "4",
//     placarFora: "3",
//     imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/8/8.png",
//     imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/14/14.png",
//   },
//   {
//     idMatch: "2",
//     equipeCasa: "Real Madrid",
//     equipeFora: "Barcelona",
//     data: "14:00",
//     placarCasa: "2",
//     placarFora: "0",
//     imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
//     imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/19/83.png",
//   },
//   {
//     idMatch: "3",
//     equipeCasa: "Liverpool",
//     equipeFora: "Manchester United",
//     data: "15:00",
//     placarCasa: "4",
//     placarFora: "3",
//     imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/8/8.png",
//     imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/14/14.png",
//   },
//   {
//     idMatch: "2",
//     equipeCasa: "Real Madrid",
//     equipeFora: "Barcelona",
//     data: "14:00",
//     placarCasa: "2",
//     placarFora: "0",
//     imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
//     imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/19/83.png",
//   },
//   {
//     idMatch: "3",
//     equipeCasa: "Liverpool",
//     equipeFora: "Manchester United",
//     data: "15:00",
//     placarCasa: "4",
//     placarFora: "3",
//     imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/8/8.png",
//     imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/14/14.png",
//   },
//   {
//     idMatch: "2",
//     equipeCasa: "Real Madrid",
//     equipeFora: "Barcelona",
//     data: "14:00",
//     placarCasa: "2",
//     placarFora: "0",
//     imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
//     imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/19/83.png",
//   },
//   {
//     idMatch: "3",
//     equipeCasa: "Liverpool",
//     equipeFora: "Manchester United",
//     data: "15:00",
//     placarCasa: "4",
//     placarFora: "3",
//     imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/8/8.png",
//     imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/14/14.png",
//   },
//   {
//     idMatch: "2",
//     equipeCasa: "Real Madrid",
//     equipeFora: "Barcelona",
//     data: "14:00",
//     placarCasa: "2",
//     placarFora: "0",
//     imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
//     imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/19/83.png",
//   },
//   {
//     idMatch: "3",
//     equipeCasa: "Liverpool",
//     equipeFora: "Manchester United",
//     data: "15:00",
//     placarCasa: "4",
//     placarFora: "3",
//     imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/8/8.png",
//     imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/14/14.png",
//   },
//   {
//     idMatch: "2",
//     equipeCasa: "Real Madrid",
//     equipeFora: "Barcelona",
//     data: "14:00",
//     placarCasa: "2",
//     placarFora: "0",
//     imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
//     imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/19/83.png",
//   },
//   {
//     idMatch: "3",
//     equipeCasa: "Liverpool",
//     equipeFora: "Manchester United",
//     data: "15:00",
//     placarCasa: "4",
//     placarFora: "3",
//     imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/8/8.png",
//     imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/14/14.png",
//   },
//   {
//     idMatch: "2",
//     equipeCasa: "Real Madrid",
//     equipeFora: "Barcelona",
//     data: "14:00",
//     placarCasa: "2",
//     placarFora: "0",
//     imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
//     imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/19/83.png",
//   },
//   {
//     idMatch: "3",
//     equipeCasa: "Liverpool",
//     equipeFora: "Manchester United",
//     data: "15:00",
//     placarCasa: "4",
//     placarFora: "3",
//     imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/8/8.png",
//     imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/14/14.png",
//   },
// ];

// const campeonatos = [
//   {
//     id: "2324",
//     favorito: "false",
//     nome: "Brasileirão Série A",
//     temporada: "2023",
//     categoria: "futebol",
//     campeonatoLogo:
//       "https://upload.wikimedia.org/wikipedia/pt/4/42/Campeonato_Brasileiro_S%C3%A9rie_A_logo.png?20160723160542",
//     paisUrl:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/275px-Flag_of_Brazil.svg.png",
//   },
//   {
//     id: "2325",
//     favorito: "false",
//     nome: "Brasileirão Série B",
//     temporada: "2023",
//     categoria: "futebol",
//     campeonatoLogo:
//       "https://upload.wikimedia.org/wikipedia/pt/f/f4/Campeonato_Brasileiro_S%C3%A9rie_B_logo.png?20200129194013",
//     paisUrl:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/275px-Flag_of_Brazil.svg.png",
//   },
// ];

// const match = [
//   {
//     _id: "63deba8f8d667aa21a950462",
//     idMatch: "1013",
//     idTitle: "Atlético Madrid x Getafe - 04/02/2023 14:30",
//     championship: "Campeonato Espanhol - 2022/2023",
//     turn: "20ª Rodada",
//     status: "ENCERRADO",
//     time: "ENCERRADO",
//     day: "04/02/2023",
//     schedule: "14:30",
//     referee: "Antonio Miguel Mateu Lahoz",
//     stadium: "Estádio Wanda Metropolitano (Madrid)",
//     scoreHome: "1",
//     scoreAway: "1",
//     teams: {
//       homeId: "",
//       homeName: "Atlético Madrid",
//       homeImg:
//         "https://www.placardefutebol.com.br/images/teams/atletico-madrid.png",
//       awayId: "",
//       awayName: "Getafe",
//       awayImg: "https://www.placardefutebol.com.br/images/teams/getafe.png",
//     },
//     events: [
//       {
//         side: "fora",
//         description: "Djené",
//         time: "2'",
//         type: "YC",
//       },
//       {
//         side: "fora",
//         description: "Portu",
//         time: "34'",
//         type: "YC",
//       },
//       {
//         side: "fora",
//         description: "Aleñà",
//         time: "47'",
//         type: "YC",
//       },
//       {
//         side: "casa",
//         description: "Koke",
//         time: "57'",
//         type: "YC",
//       },
//       {
//         side: "casa",
//         description: "Ángel Correa",
//         time: "60'",
//         type: "GOAL",
//       },
//       {
//         side: "casa",
//         description: "Saúl",
//         time: "81'",
//         type: "YC",
//       },
//       {
//         side: "fora",
//         description: "Enes Ünal (pênalti)",
//         time: "83'",
//         type: "GOAL",
//       },
//       {
//         side: "casa",
//         description: "Memphis Depay",
//         time: "90'",
//         type: "YC",
//       },
//       {
//         side: "fora",
//         description: "Munir",
//         time: "95'",
//         type: "YC",
//       },
//       {
//         side: "fora",
//         description: "Pedro Álvarez Sosa",
//         time: "96'",
//         type: "YC",
//       },
//     ],
//     statistics: [
//       {
//         type: "Posse de bola (%)",
//         home: "63",
//         away: "37",
//       },
//       {
//         type: "Total de passes",
//         home: "633",
//         away: "386",
//       },
//       {
//         type: "Passes corretos (%)",
//         home: "82",
//         away: "68",
//       },
//       {
//         type: "Total de chutes",
//         home: "15",
//         away: "10",
//       },
//       {
//         type: "Chutes no gol",
//         home: "6",
//         away: "1",
//       },
//       {
//         type: "Escanteios",
//         home: "8",
//         away: "0",
//       },
//       {
//         type: "Faltas cometidas",
//         home: "11",
//         away: "18",
//       },
//     ],
//     lineups: {
//       homeStarting: [
//         {
//           num: "13.",
//           name: " Jan Oblak",
//           actions: {
//             substitution: "",
//             card: "",
//             goals: [],
//           },
//         },
//         {
//           num: "15.",
//           name: " Stefan Savić",
//           actions: {
//             substitution: "",
//             card: "",
//             goals: [],
//           },
//         },
//         {
//           num: "16.",
//           name: " Nahuel Molina",
//           actions: {
//             substitution: "",
//             card: "",
//             goals: [],
//           },
//         },
//         {
//           num: "22.",
//           name: " Hermoso",
//           actions: {
//             substitution: "",
//             card: "",
//             goals: [],
//           },
//         },
//         {
//           num: "23.",
//           name: " Reinildo",
//           actions: {
//             substitution: "",
//             card: "",
//             goals: [],
//           },
//         },
//         {
//           num: "5.",
//           name: " Rodrigo De Paul",
//           actions: {
//             substitution: "out",
//             card: "",
//             goals: [],
//           },
//         },
//         {
//           num: "6.",
//           name: " Koke (C)",
//           actions: {
//             substitution: "",
//             card: "YC",
//             goals: [],
//           },
//         },
//         {
//           num: "10.",
//           name: " Ángel Correa",
//           actions: {
//             substitution: "out",
//             card: "",
//             goals: ["GOAL"],
//           },
//         },
//         {
//           num: "11.",
//           name: " Thomas Lemar",
//           actions: {
//             substitution: "out",
//             card: "",
//             goals: [],
//           },
//         },
//         {
//           num: "8.",
//           name: " Antoine Griezmann",
//           actions: {
//             substitution: "",
//             card: "",
//             goals: [],
//           },
//         },
//         {
//           num: "19.",
//           name: " Morata",
//           actions: {
//             substitution: "out",
//             card: "",
//             goals: [],
//           },
//         },
//       ],
//       awayStarting: [
//         {
//           num: "13.",
//           name: " David Soria",
//           actions: {
//             substitution: "",
//             card: "",
//             goals: [],
//           },
//         },
//         {
//           num: "2.",
//           name: " Djené (C)",
//           actions: {
//             substitution: "",
//             card: "YC",
//             goals: [],
//           },
//         },
//         {
//           num: "4.",
//           name: " Pedro Álvarez Sosa",
//           actions: {
//             substitution: "",
//             card: "YC",
//             goals: [],
//           },
//         },
//         {
//           num: "6.",
//           name: " Domingos Duarte",
//           actions: {
//             substitution: "",
//             card: "",
//             goals: [],
//           },
//         },
//         {
//           num: "9.",
//           name: " Portu",
//           actions: {
//             substitution: "out",
//             card: "YC",
//             goals: [],
//           },
//         },
//         {
//           num: "15.",
//           name: " Omar Alderete",
//           actions: {
//             substitution: "",
//             card: "",
//             goals: [],
//           },
//         },
//         {
//           num: "5.",
//           name: " Luis Milla",
//           actions: {
//             substitution: "out",
//             card: "",
//             goals: [],
//           },
//         },
//         {
//           num: "11.",
//           name: " Aleñà",
//           actions: {
//             substitution: "out",
//             card: "YC",
//             goals: [],
//           },
//         },
//         {
//           num: "18.",
//           name: " Mauro Arambarri",
//           actions: {
//             substitution: "out",
//             card: "",
//             goals: [],
//           },
//         },
//         {
//           num: "10.",
//           name: " Enes Ünal",
//           actions: {
//             substitution: "",
//             card: "",
//             goals: ["GOAL"],
//           },
//         },
//         {
//           num: "19.",
//           name: " Borja Mayoral",
//           actions: {
//             substitution: "",
//             card: "",
//             goals: [],
//           },
//         },
//       ],
//       homeBench: [
//         {
//           num: "1.",
//           name: " Ivo Grbić",
//           actions: {
//             substitution: "",
//             card: "",
//             goals: [],
//           },
//         },
//         {
//           num: "31.",
//           name: " Antonio Alemán",
//           actions: {
//             substitution: "",
//             card: "",
//             goals: [],
//           },
//         },
//         {
//           num: "2.",
//           name: " José Giménez",
//           actions: {
//             substitution: "",
//             card: "",
//             goals: [],
//           },
//         },
//         {
//           num: "3.",
//           name: " Reguilón",
//           actions: {
//             substitution: "",
//             card: "",
//             goals: [],
//           },
//         },
//         {
//           num: "12.",
//           name: " Matt Doherty",
//           actions: {
//             substitution: "",
//             card: "",
//             goals: [],
//           },
//         },
//         {
//           num: "4.",
//           name: " Geoffrey Kondogbia",
//           actions: {
//             substitution: "",
//             card: "",
//             goals: [],
//           },
//         },
//         {
//           num: "14.",
//           name: " Llorente",
//           actions: {
//             substitution: "in",
//             card: "",
//             goals: [],
//           },
//         },
//         {
//           num: "17.",
//           name: " Saúl",
//           actions: {
//             substitution: "in",
//             card: "YC",
//             goals: [],
//           },
//         },
//         {
//           num: "20.",
//           name: " Axel Witsel",
//           actions: {
//             substitution: "",
//             card: "",
//             goals: [],
//           },
//         },
//         {
//           num: "21.",
//           name: " Yannick Carrasco",
//           actions: {
//             substitution: "in",
//             card: "",
//             goals: [],
//           },
//         },
//         {
//           num: "24.",
//           name: " P. Rivas",
//           actions: {
//             substitution: "",
//             card: "",
//             goals: [],
//           },
//         },
//         {
//           num: "9.",
//           name: " Memphis Depay",
//           actions: {
//             substitution: "in",
//             card: "YC",
//             goals: [],
//           },
//         },
//       ],
//       awayBench: [
//         {
//           num: "1.",
//           name: " Kiko Casilla",
//           actions: {
//             substitution: "",
//             card: "",
//             goals: [],
//           },
//         },
//         {
//           num: "27.",
//           name: " Diego Conde",
//           actions: {
//             substitution: "",
//             card: "",
//             goals: [],
//           },
//         },
//         {
//           num: "12.",
//           name: " Jordan Amavi",
//           actions: {
//             substitution: "",
//             card: "",
//             goals: [],
//           },
//         },
//         {
//           num: "22.",
//           name: " Damián Suárez",
//           actions: {
//             substitution: "in",
//             card: "",
//             goals: [],
//           },
//         },
//         {
//           num: "23.",
//           name: " Stefan Mitrovic",
//           actions: {
//             substitution: "",
//             card: "",
//             goals: [],
//           },
//         },
//         {
//           num: "8.",
//           name: " Jaime Seoane",
//           actions: {
//             substitution: "",
//             card: "",
//             goals: [],
//           },
//         },
//         {
//           num: "16.",
//           name: " Ángel Algobia",
//           actions: {
//             substitution: "in",
//             card: "",
//             goals: [],
//           },
//         },
//         {
//           num: "20.",
//           name: " Nemanja Maksimović",
//           actions: {
//             substitution: "",
//             card: "",
//             goals: [],
//           },
//         },
//         {
//           num: "24.",
//           name: " Gonzalo Villar",
//           actions: {
//             substitution: "in",
//             card: "",
//             goals: [],
//           },
//         },
//         {
//           num: "7.",
//           name: " Mata",
//           actions: {
//             substitution: "",
//             card: "",
//             goals: [],
//           },
//         },
//         {
//           num: "14.",
//           name: " Latasa",
//           actions: {
//             substitution: "",
//             card: "",
//             goals: [],
//           },
//         },
//         {
//           num: "17.",
//           name: " Munir",
//           actions: {
//             substitution: "in",
//             card: "YC",
//             goals: [],
//           },
//         },
//       ],
//     },
//   },
// ];

// const equipes = [
//   {
//     id: "1",
//     name: "Real Madrid",
//     logo: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
//     locality: "Madrid, Espanha",
//   },
//   {
//     id: "2",
//     name: "Liverpool",
//     logo: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
//     locality: "Liverpool, United Kindgon",
//   },
//   {
//     id: "3",
//     name: "Manchester United",
//     logo: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
//     locality: "Manchester, United Kindgon",
//   },
//   {
//     id: "4",
//     name: "Manchester City",
//     logo: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
//     locality: "Manchester, United Kindgon",
//   },
//   {
//     id: "5",
//     name: "United Kingdon",
//     logo: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
//     locality: "Liverpool, United Kindgon",
//   },
//   {
//     id: "6",
//     name: "Barcelona",
//     logo: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
//     locality: "Madrid, Espanha",
//   },
//   {
//     id: "7",
//     name: "Real Zaragoza",
//     logo: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
//     locality: "Madrid, Espanha",
//   },
//   {
//     id: "8",
//     name: "Liverton",
//     logo: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
//     locality: "Liverpool, United Kindgon",
//   },
// ];

// const equipe = [
//   {
//     id: "1",
//     name: "Real Madrid",
//     img: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
//     locality: "Madrid, Espanha",
//     stadium: "Santiago Bernabeu",
//   },
// ];

// const camp = [
//   {
//     idChampionship: "",
//     url: "https://www.placardefutebol.com.br/copa-do-nordeste",
//     name: "Copa do Nordeste",
//     img: "https://www.placardefutebol.com.br/images/countries/brasil.png",
//     imgChampionship: "",
//     table: [
//       {
//         phase: "Fase de Grupos",
//         group: "Grupo A",
//         table: [
//           {
//             num: "1",
//             team: "Sport",
//             points: "15",
//             games: "6",
//             victorys: "5",
//             draws: "0",
//             loses: "1",
//             goaldiference: "12",
//           },
//           {
//             num: "2",
//             team: "Fortaleza",
//             points: "15",
//             games: "7",
//             victorys: "5",
//             draws: "0",
//             loses: "2",
//             goaldiference: "6",
//           },
//           {
//             num: "3",
//             team: "Ferroviário-CE",
//             points: "13",
//             games: "7",
//             victorys: "3",
//             draws: "4",
//             loses: "0",
//             goaldiference: "5",
//           },
//           {
//             num: "4",
//             team: "CRB",
//             points: "13",
//             games: "7",
//             victorys: "3",
//             draws: "4",
//             loses: "0",
//             goaldiference: "3",
//           },
//           {
//             num: "5",
//             team: "Sampaio Corrêa",
//             points: "8",
//             games: "7",
//             victorys: "2",
//             draws: "2",
//             loses: "3",
//             goaldiference: "-4",
//           },
//           {
//             num: "6",
//             team: "Vitória",
//             points: "6",
//             games: "7",
//             victorys: "1",
//             draws: "3",
//             loses: "3",
//             goaldiference: "-2",
//           },
//           {
//             num: "7",
//             team: "Atlético Alagoinhas",
//             points: "6",
//             games: "7",
//             victorys: "2",
//             draws: "0",
//             loses: "5",
//             goaldiference: "-8",
//           },
//           {
//             num: "8",
//             team: "Fluminense-PI",
//             points: "3",
//             games: "7",
//             victorys: "0",
//             draws: "3",
//             loses: "4",
//             goaldiference: "-8",
//           },
//         ],
//       },
//       {
//         phase: "Fase de Grupos",
//         group: "Grupo B",
//         table: [
//           {
//             num: "1",
//             team: "Ceará",
//             points: "13",
//             games: "7",
//             victorys: "4",
//             draws: "1",
//             loses: "2",
//             goaldiference: "3",
//           },
//           {
//             num: "2",
//             team: "ABC",
//             points: "11",
//             games: "7",
//             victorys: "3",
//             draws: "2",
//             loses: "2",
//             goaldiference: "4",
//           },
//           {
//             num: "3",
//             team: "Sergipe",
//             points: "10",
//             games: "7",
//             victorys: "3",
//             draws: "1",
//             loses: "3",
//             goaldiference: "4",
//           },
//           {
//             num: "4",
//             team: "Náutico",
//             points: "10",
//             games: "7",
//             victorys: "3",
//             draws: "1",
//             loses: "3",
//             goaldiference: "0",
//           },
//           {
//             num: "5",
//             team: "Santa Cruz",
//             points: "8",
//             games: "6",
//             victorys: "2",
//             draws: "2",
//             loses: "2",
//             goaldiference: "1",
//           },
//           {
//             num: "6",
//             team: "CSA",
//             points: "7",
//             games: "7",
//             victorys: "1",
//             draws: "4",
//             loses: "2",
//             goaldiference: "-2",
//           },
//           {
//             num: "7",
//             team: "Bahia",
//             points: "6",
//             games: "7",
//             victorys: "1",
//             draws: "3",
//             loses: "3",
//             goaldiference: "-9",
//           },
//           {
//             num: "8",
//             team: "Campinense",
//             points: "5",
//             games: "7",
//             victorys: "1",
//             draws: "2",
//             loses: "4",
//             goaldiference: "-5",
//           },
//         ],
//       },
//     ],
//     statistics: [
//       {
//         name: "Artilheiros",
//         table: [
//           {
//             num: "1",
//             player: "Erick",
//             team: "Ferroviário-CE",
//             value: "5",
//           },
//           {
//             num: "2",
//             player: "Luciano",
//             team: "Sport",
//             value: "4",
//           },
//           {
//             num: "3",
//             player: "Vagner Love",
//             team: "Sport",
//             value: "4",
//           },
//           {
//             num: "4",
//             player: "Wallace Pernambucano",
//             team: "América-RN",
//             value: "4",
//           },
//           {
//             num: "5",
//             player: "Ciel",
//             team: "Ferroviário-CE",
//             value: "4",
//           },
//           {
//             num: "6",
//             player: "Guilherme Castilho",
//             team: "Ceará",
//             value: "3",
//           },
//           {
//             num: "7",
//             player: "Sabino",
//             team: "Sport",
//             value: "3",
//           },
//           {
//             num: "8",
//             player: "Erick",
//             team: "Ceará",
//             value: "3",
//           },
//           {
//             num: "9",
//             player: "Gabriel Vieira",
//             team: "Fluminense-PI",
//             value: "3",
//           },
//           {
//             num: "10",
//             player: "Osvaldo",
//             team: "Vitória",
//             value: "3",
//           },
//           {
//             num: "11",
//             player: "Thiago Galhardo",
//             team: "Fortaleza",
//             value: "3",
//           },
//           {
//             num: "12",
//             player: "Felipe Gedoz",
//             team: "Santa Cruz",
//             value: "2",
//           },
//           {
//             num: "13",
//             player: "Jeam",
//             team: "Jacuipense",
//             value: "2",
//           },
//           {
//             num: "14",
//             player: "Jorginho",
//             team: "Sport",
//             value: "2",
//           },
//           {
//             num: "15",
//             player: "Welder",
//             team: "Jacuipense",
//             value: "2",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     idChampionship: "",
//     url: "https://www.placardefutebol.com.br/campeonato-espanhol",
//     name: "Campeonato Espanhol",
//     img: "https://www.placardefutebol.com.br/images/countries/espanha.png",
//     imgChampionship: "",
//     table: [
//       {
//         phase: "",
//         group: "",
//         table: [
//           {
//             num: "1",
//             team: "Barcelona",
//             points: "65",
//             games: "25",
//             victorys: "21",
//             draws: "2",
//             loses: "2",
//             goaldiference: "39",
//           },
//           {
//             num: "2",
//             team: "Real Madrid",
//             points: "56",
//             games: "25",
//             victorys: "17",
//             draws: "5",
//             loses: "3",
//             goaldiference: "31",
//           },
//           {
//             num: "3",
//             team: "Atlético Madrid",
//             points: "48",
//             games: "25",
//             victorys: "14",
//             draws: "6",
//             loses: "5",
//             goaldiference: "20",
//           },
//           {
//             num: "4",
//             team: "Real Sociedad",
//             points: "45",
//             games: "25",
//             victorys: "13",
//             draws: "6",
//             loses: "6",
//             goaldiference: "9",
//           },
//           {
//             num: "5",
//             team: "Real Betis",
//             points: "42",
//             games: "25",
//             victorys: "12",
//             draws: "6",
//             loses: "7",
//             goaldiference: "7",
//           },
//           {
//             num: "6",
//             team: "Villarreal",
//             points: "38",
//             games: "25",
//             victorys: "11",
//             draws: "5",
//             loses: "9",
//             goaldiference: "5",
//           },
//           {
//             num: "7",
//             team: "Rayo Vallecano",
//             points: "35",
//             games: "25",
//             victorys: "9",
//             draws: "8",
//             loses: "8",
//             goaldiference: "1",
//           },
//           {
//             num: "8",
//             team: "Osasuna",
//             points: "34",
//             games: "25",
//             victorys: "9",
//             draws: "7",
//             loses: "9",
//             goaldiference: "-2",
//           },
//           {
//             num: "9",
//             team: "Athletic Bilbao",
//             points: "33",
//             games: "25",
//             victorys: "9",
//             draws: "6",
//             loses: "10",
//             goaldiference: "6",
//           },
//           {
//             num: "10",
//             team: "Mallorca",
//             points: "32",
//             games: "25",
//             victorys: "9",
//             draws: "5",
//             loses: "11",
//             goaldiference: "-4",
//           },
//           {
//             num: "11",
//             team: "Celta de Vigo",
//             points: "31",
//             games: "25",
//             victorys: "8",
//             draws: "7",
//             loses: "10",
//             goaldiference: "-5",
//           },
//           {
//             num: "12",
//             team: "Girona",
//             points: "30",
//             games: "25",
//             victorys: "8",
//             draws: "6",
//             loses: "11",
//             goaldiference: "-1",
//           },
//           {
//             num: "13",
//             team: "Sevilla",
//             points: "28",
//             games: "25",
//             victorys: "7",
//             draws: "7",
//             loses: "11",
//             goaldiference: "-11",
//           },
//           {
//             num: "14",
//             team: "Real Valladolid",
//             points: "28",
//             games: "25",
//             victorys: "8",
//             draws: "4",
//             loses: "13",
//             goaldiference: "-16",
//           },
//           {
//             num: "15",
//             team: "Espanyol",
//             points: "27",
//             games: "25",
//             victorys: "6",
//             draws: "9",
//             loses: "10",
//             goaldiference: "-8",
//           },
//           {
//             num: "16",
//             team: "Cádiz",
//             points: "27",
//             games: "25",
//             victorys: "6",
//             draws: "9",
//             loses: "10",
//             goaldiference: "-17",
//           },
//           {
//             num: "17",
//             team: "Valência",
//             points: "26",
//             games: "25",
//             victorys: "7",
//             draws: "5",
//             loses: "13",
//             goaldiference: "0",
//           },
//           {
//             num: "18",
//             team: "Getafe",
//             points: "26",
//             games: "25",
//             victorys: "6",
//             draws: "8",
//             loses: "11",
//             goaldiference: "-9",
//           },
//           {
//             num: "19",
//             team: "Almería",
//             points: "25",
//             games: "25",
//             victorys: "7",
//             draws: "4",
//             loses: "14",
//             goaldiference: "-15",
//           },
//           {
//             num: "20",
//             team: "Elche",
//             points: "13",
//             games: "25",
//             victorys: "2",
//             draws: "7",
//             loses: "16",
//             goaldiference: "-30",
//           },
//         ],
//       },
//     ],
//     statistics: [
//       {
//         name: "Artilheiros",
//         table: [
//           {
//             num: "1",
//             player: "Robert Lewandowski",
//             team: "Barcelona",
//             value: "15",
//           },
//           {
//             num: "2",
//             player: "Enes Ünal",
//             team: "Getafe",
//             value: "12",
//           },
//           {
//             num: "3",
//             player: "Joselu",
//             team: "Espanyol",
//             value: "12",
//           },
//           {
//             num: "4",
//             player: "Borja Iglesias",
//             team: "Real Betis",
//             value: "11",
//           },
//           {
//             num: "5",
//             player: "Karim Benzema",
//             team: "Real Madrid",
//             value: "11",
//           },
//           {
//             num: "6",
//             player: "Iago Aspas",
//             team: "Celta de Vigo",
//             value: "11",
//           },
//           {
//             num: "7",
//             player: "Vedat Muriqi",
//             team: "Mallorca",
//             value: "10",
//           },
//           {
//             num: "8",
//             player: "Morata",
//             team: "Atlético Madrid",
//             value: "10",
//           },
//           {
//             num: "9",
//             player: "Alexander Sørloth",
//             team: "Real Sociedad",
//             value: "9",
//           },
//           {
//             num: "10",
//             player: "Gabri Veiga",
//             team: "Celta de Vigo",
//             value: "8",
//           },
//           {
//             num: "11",
//             player: "Oihan Sancet",
//             team: "Athletic Bilbao",
//             value: "8",
//           },
//           {
//             num: "12",
//             player: "Antoine Griezmann",
//             team: "Atlético Madrid",
//             value: "8",
//           },
//           {
//             num: "13",
//             player: "Martin Braithwaite",
//             team: "Espanyol",
//             value: "8",
//           },
//           {
//             num: "14",
//             player: "Vinícius Júnior",
//             team: "Real Madrid",
//             value: "8",
//           },
//           {
//             num: "15",
//             player: "Brais Méndez",
//             team: "Real Sociedad",
//             value: "7",
//           },
//         ],
//       },
//       {
//         name: "Assistências",
//         table: [
//           {
//             num: "1",
//             player: "Antoine Griezmann",
//             team: "Atlético Madrid",
//             value: "8",
//           },
//           {
//             num: "2",
//             player: "Mikel Merino",
//             team: "Real Sociedad",
//             value: "7",
//           },
//           {
//             num: "3",
//             player: "Lucas Robertone",
//             team: "Almería",
//             value: "6",
//           },
//           {
//             num: "4",
//             player: "Samuel Chukwueze",
//             team: "Villarreal",
//             value: "6",
//           },
//           {
//             num: "5",
//             player: "Rodrygo",
//             team: "Real Madrid",
//             value: "5",
//           },
//           {
//             num: "6",
//             player: "Isi Palazón",
//             team: "Rayo Vallecano",
//             value: "5",
//           },
//           {
//             num: "7",
//             player: "Brian Oliván",
//             team: "Espanyol",
//             value: "5",
//           },
//           {
//             num: "8",
//             player: "Robert Lewandowski",
//             team: "Barcelona",
//             value: "5",
//           },
//           {
//             num: "9",
//             player: "Aleix García",
//             team: "Girona",
//             value: "5",
//           },
//           {
//             num: "10",
//             player: "Ousmane Dembélé",
//             team: "Barcelona",
//             value: "5",
//           },
//           {
//             num: "11",
//             player: "Nico Williams",
//             team: "Athletic Bilbao",
//             value: "4",
//           },
//           {
//             num: "12",
//             player: "Gonzalo Plata",
//             team: "Real Valladolid",
//             value: "4",
//           },
//           {
//             num: "13",
//             player: "Carles Pérez",
//             team: "Celta de Vigo",
//             value: "4",
//           },
//           {
//             num: "14",
//             player: "Vinícius Júnior",
//             team: "Real Madrid",
//             value: "4",
//           },
//           {
//             num: "15",
//             player: "Lee Kang-In",
//             team: "Mallorca",
//             value: "4",
//           },
//         ],
//       },
//     ],
//   },
// ];

// app.get("/camp", (req, res) => {
//   res.json({ camp });
// });

// app.get("/equipes", (req, res) => {
//   res.json({ equipes });
// });

// app.get("/equipe", (req, res) => {
//   res.json({ equipe });
// });

// app.get("/campeonatos", (req, res) => {
//   res.json({ campeonatos });
// });

// app.get("/api", (req, res) => {
//   res.json({ partidas });
// });

// app.get("/match", (req, res) => {
//   res.json({ match });
// });

export default app;
