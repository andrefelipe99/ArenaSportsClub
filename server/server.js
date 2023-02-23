import express from "express";
import cors from "cors";
import football from "./src/api/football.route.js";
import matchsCrawler from "./src/crawler/matchs.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/football", football);
//app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

const teste = await matchsCrawler.getMatchs();
app.get("/pp", (req, res) => {
  res.json({ teste });
});

//daqui pra baixo API testes
const partidas = [
  {
    idMatch: "2",
    equipeCasa: "Real Madrid",
    equipeFora: "Barcelona",
    data: "14:00",
    placarCasa: "2",
    placarFora: "0",
    imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
    imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/19/83.png",
  },
  {
    idMatch: "3",
    equipeCasa: "Liverpool",
    equipeFora: "Manchester United",
    data: "15:00",
    placarCasa: "4",
    placarFora: "3",
    imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/8/8.png",
    imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/14/14.png",
  },
  {
    idMatch: "2",
    equipeCasa: "Real Madrid",
    equipeFora: "Barcelona",
    data: "14:00",
    placarCasa: "2",
    placarFora: "0",
    imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
    imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/19/83.png",
  },
  {
    idMatch: "3",
    equipeCasa: "Liverpool",
    equipeFora: "Manchester United",
    data: "15:00",
    placarCasa: "4",
    placarFora: "3",
    imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/8/8.png",
    imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/14/14.png",
  },
  {
    idMatch: "2",
    equipeCasa: "Real Madrid",
    equipeFora: "Barcelona",
    data: "14:00",
    placarCasa: "2",
    placarFora: "0",
    imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
    imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/19/83.png",
  },
  {
    idMatch: "3",
    equipeCasa: "Liverpool",
    equipeFora: "Manchester United",
    data: "15:00",
    placarCasa: "4",
    placarFora: "3",
    imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/8/8.png",
    imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/14/14.png",
  },
  {
    idMatch: "2",
    equipeCasa: "Real Madrid",
    equipeFora: "Barcelona",
    data: "14:00",
    placarCasa: "2",
    placarFora: "0",
    imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
    imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/19/83.png",
  },
  {
    idMatch: "3",
    equipeCasa: "Liverpool",
    equipeFora: "Manchester United",
    data: "15:00",
    placarCasa: "4",
    placarFora: "3",
    imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/8/8.png",
    imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/14/14.png",
  },
  {
    idMatch: "2",
    equipeCasa: "Real Madrid",
    equipeFora: "Barcelona",
    data: "14:00",
    placarCasa: "2",
    placarFora: "0",
    imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
    imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/19/83.png",
  },
  {
    idMatch: "3",
    equipeCasa: "Liverpool",
    equipeFora: "Manchester United",
    data: "15:00",
    placarCasa: "4",
    placarFora: "3",
    imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/8/8.png",
    imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/14/14.png",
  },
  {
    idMatch: "2",
    equipeCasa: "Real Madrid",
    equipeFora: "Barcelona",
    data: "14:00",
    placarCasa: "2",
    placarFora: "0",
    imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
    imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/19/83.png",
  },
  {
    idMatch: "3",
    equipeCasa: "Liverpool",
    equipeFora: "Manchester United",
    data: "15:00",
    placarCasa: "4",
    placarFora: "3",
    imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/8/8.png",
    imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/14/14.png",
  },
  {
    idMatch: "2",
    equipeCasa: "Real Madrid",
    equipeFora: "Barcelona",
    data: "14:00",
    placarCasa: "2",
    placarFora: "0",
    imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
    imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/19/83.png",
  },
  {
    idMatch: "3",
    equipeCasa: "Liverpool",
    equipeFora: "Manchester United",
    data: "15:00",
    placarCasa: "4",
    placarFora: "3",
    imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/8/8.png",
    imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/14/14.png",
  },
  {
    idMatch: "2",
    equipeCasa: "Real Madrid",
    equipeFora: "Barcelona",
    data: "14:00",
    placarCasa: "2",
    placarFora: "0",
    imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
    imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/19/83.png",
  },
  {
    idMatch: "3",
    equipeCasa: "Liverpool",
    equipeFora: "Manchester United",
    data: "15:00",
    placarCasa: "4",
    placarFora: "3",
    imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/8/8.png",
    imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/14/14.png",
  },
  {
    idMatch: "2",
    equipeCasa: "Real Madrid",
    equipeFora: "Barcelona",
    data: "14:00",
    placarCasa: "2",
    placarFora: "0",
    imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
    imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/19/83.png",
  },
  {
    idMatch: "3",
    equipeCasa: "Liverpool",
    equipeFora: "Manchester United",
    data: "15:00",
    placarCasa: "4",
    placarFora: "3",
    imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/8/8.png",
    imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/14/14.png",
  },
  {
    idMatch: "2",
    equipeCasa: "Real Madrid",
    equipeFora: "Barcelona",
    data: "14:00",
    placarCasa: "2",
    placarFora: "0",
    imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
    imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/19/83.png",
  },
  {
    idMatch: "3",
    equipeCasa: "Liverpool",
    equipeFora: "Manchester United",
    data: "15:00",
    placarCasa: "4",
    placarFora: "3",
    imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/8/8.png",
    imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/14/14.png",
  },
  {
    idMatch: "2",
    equipeCasa: "Real Madrid",
    equipeFora: "Barcelona",
    data: "14:00",
    placarCasa: "2",
    placarFora: "0",
    imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
    imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/19/83.png",
  },
  {
    idMatch: "3",
    equipeCasa: "Liverpool",
    equipeFora: "Manchester United",
    data: "15:00",
    placarCasa: "4",
    placarFora: "3",
    imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/8/8.png",
    imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/14/14.png",
  },
];

const campeonatos = [
  {
    id: "2324",
    favorito: "false",
    nome: "Brasileirão Série A",
    temporada: "2023",
    categoria: "futebol",
    campeonatoLogo:
      "https://upload.wikimedia.org/wikipedia/pt/4/42/Campeonato_Brasileiro_S%C3%A9rie_A_logo.png?20160723160542",
    paisUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/275px-Flag_of_Brazil.svg.png",
  },
  {
    id: "2325",
    favorito: "false",
    nome: "Brasileirão Série B",
    temporada: "2023",
    categoria: "futebol",
    campeonatoLogo:
      "https://upload.wikimedia.org/wikipedia/pt/f/f4/Campeonato_Brasileiro_S%C3%A9rie_B_logo.png?20200129194013",
    paisUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/275px-Flag_of_Brazil.svg.png",
  },
];

const match = [
  {
    _id: "63deba8f8d667aa21a950462",
    idMatch: "1013",
    idTitle: "Atlético Madrid x Getafe - 04/02/2023 14:30",
    championship: "Campeonato Espanhol - 2022/2023",
    turn: "20ª Rodada",
    status: "ENCERRADO",
    time: "ENCERRADO",
    day: "04/02/2023",
    schedule: "14:30",
    referee: "Antonio Miguel Mateu Lahoz",
    stadium: "Estádio Wanda Metropolitano (Madrid)",
    scoreHome: "1",
    scoreAway: "1",
    teams: {
      homeId: "",
      homeName: "Atlético Madrid",
      homeImg:
        "https://www.placardefutebol.com.br/images/teams/atletico-madrid.png",
      awayId: "",
      awayName: "Getafe",
      awayImg: "https://www.placardefutebol.com.br/images/teams/getafe.png",
    },
    events: [
      {
        side: "fora",
        description: "Djené",
        time: "2'",
        type: "YC",
      },
      {
        side: "fora",
        description: "Portu",
        time: "34'",
        type: "YC",
      },
      {
        side: "fora",
        description: "Aleñà",
        time: "47'",
        type: "YC",
      },
      {
        side: "casa",
        description: "Koke",
        time: "57'",
        type: "YC",
      },
      {
        side: "casa",
        description: "Ángel Correa",
        time: "60'",
        type: "GOAL",
      },
      {
        side: "casa",
        description: "Saúl",
        time: "81'",
        type: "YC",
      },
      {
        side: "fora",
        description: "Enes Ünal (pênalti)",
        time: "83'",
        type: "GOAL",
      },
      {
        side: "casa",
        description: "Memphis Depay",
        time: "90'",
        type: "YC",
      },
      {
        side: "fora",
        description: "Munir",
        time: "95'",
        type: "YC",
      },
      {
        side: "fora",
        description: "Pedro Álvarez Sosa",
        time: "96'",
        type: "YC",
      },
    ],
    statistics: [
      {
        type: "Posse de bola (%)",
        home: "63",
        away: "37",
      },
      {
        type: "Total de passes",
        home: "633",
        away: "386",
      },
      {
        type: "Passes corretos (%)",
        home: "82",
        away: "68",
      },
      {
        type: "Total de chutes",
        home: "15",
        away: "10",
      },
      {
        type: "Chutes no gol",
        home: "6",
        away: "1",
      },
      {
        type: "Escanteios",
        home: "8",
        away: "0",
      },
      {
        type: "Faltas cometidas",
        home: "11",
        away: "18",
      },
    ],
    lineups: {
      homeStarting: [
        {
          num: "13.",
          name: " Jan Oblak",
          actions: {
            substitution: "",
            card: "",
            goals: [],
          },
        },
        {
          num: "15.",
          name: " Stefan Savić",
          actions: {
            substitution: "",
            card: "",
            goals: [],
          },
        },
        {
          num: "16.",
          name: " Nahuel Molina",
          actions: {
            substitution: "",
            card: "",
            goals: [],
          },
        },
        {
          num: "22.",
          name: " Hermoso",
          actions: {
            substitution: "",
            card: "",
            goals: [],
          },
        },
        {
          num: "23.",
          name: " Reinildo",
          actions: {
            substitution: "",
            card: "",
            goals: [],
          },
        },
        {
          num: "5.",
          name: " Rodrigo De Paul",
          actions: {
            substitution: "out",
            card: "",
            goals: [],
          },
        },
        {
          num: "6.",
          name: " Koke (C)",
          actions: {
            substitution: "",
            card: "YC",
            goals: [],
          },
        },
        {
          num: "10.",
          name: " Ángel Correa",
          actions: {
            substitution: "out",
            card: "",
            goals: ["GOAL"],
          },
        },
        {
          num: "11.",
          name: " Thomas Lemar",
          actions: {
            substitution: "out",
            card: "",
            goals: [],
          },
        },
        {
          num: "8.",
          name: " Antoine Griezmann",
          actions: {
            substitution: "",
            card: "",
            goals: [],
          },
        },
        {
          num: "19.",
          name: " Morata",
          actions: {
            substitution: "out",
            card: "",
            goals: [],
          },
        },
      ],
      awayStarting: [
        {
          num: "13.",
          name: " David Soria",
          actions: {
            substitution: "",
            card: "",
            goals: [],
          },
        },
        {
          num: "2.",
          name: " Djené (C)",
          actions: {
            substitution: "",
            card: "YC",
            goals: [],
          },
        },
        {
          num: "4.",
          name: " Pedro Álvarez Sosa",
          actions: {
            substitution: "",
            card: "YC",
            goals: [],
          },
        },
        {
          num: "6.",
          name: " Domingos Duarte",
          actions: {
            substitution: "",
            card: "",
            goals: [],
          },
        },
        {
          num: "9.",
          name: " Portu",
          actions: {
            substitution: "out",
            card: "YC",
            goals: [],
          },
        },
        {
          num: "15.",
          name: " Omar Alderete",
          actions: {
            substitution: "",
            card: "",
            goals: [],
          },
        },
        {
          num: "5.",
          name: " Luis Milla",
          actions: {
            substitution: "out",
            card: "",
            goals: [],
          },
        },
        {
          num: "11.",
          name: " Aleñà",
          actions: {
            substitution: "out",
            card: "YC",
            goals: [],
          },
        },
        {
          num: "18.",
          name: " Mauro Arambarri",
          actions: {
            substitution: "out",
            card: "",
            goals: [],
          },
        },
        {
          num: "10.",
          name: " Enes Ünal",
          actions: {
            substitution: "",
            card: "",
            goals: ["GOAL"],
          },
        },
        {
          num: "19.",
          name: " Borja Mayoral",
          actions: {
            substitution: "",
            card: "",
            goals: [],
          },
        },
      ],
      homeBench: [
        {
          num: "1.",
          name: " Ivo Grbić",
          actions: {
            substitution: "",
            card: "",
            goals: [],
          },
        },
        {
          num: "31.",
          name: " Antonio Alemán",
          actions: {
            substitution: "",
            card: "",
            goals: [],
          },
        },
        {
          num: "2.",
          name: " José Giménez",
          actions: {
            substitution: "",
            card: "",
            goals: [],
          },
        },
        {
          num: "3.",
          name: " Reguilón",
          actions: {
            substitution: "",
            card: "",
            goals: [],
          },
        },
        {
          num: "12.",
          name: " Matt Doherty",
          actions: {
            substitution: "",
            card: "",
            goals: [],
          },
        },
        {
          num: "4.",
          name: " Geoffrey Kondogbia",
          actions: {
            substitution: "",
            card: "",
            goals: [],
          },
        },
        {
          num: "14.",
          name: " Llorente",
          actions: {
            substitution: "in",
            card: "",
            goals: [],
          },
        },
        {
          num: "17.",
          name: " Saúl",
          actions: {
            substitution: "in",
            card: "YC",
            goals: [],
          },
        },
        {
          num: "20.",
          name: " Axel Witsel",
          actions: {
            substitution: "",
            card: "",
            goals: [],
          },
        },
        {
          num: "21.",
          name: " Yannick Carrasco",
          actions: {
            substitution: "in",
            card: "",
            goals: [],
          },
        },
        {
          num: "24.",
          name: " P. Rivas",
          actions: {
            substitution: "",
            card: "",
            goals: [],
          },
        },
        {
          num: "9.",
          name: " Memphis Depay",
          actions: {
            substitution: "in",
            card: "YC",
            goals: [],
          },
        },
      ],
      awayBench: [
        {
          num: "1.",
          name: " Kiko Casilla",
          actions: {
            substitution: "",
            card: "",
            goals: [],
          },
        },
        {
          num: "27.",
          name: " Diego Conde",
          actions: {
            substitution: "",
            card: "",
            goals: [],
          },
        },
        {
          num: "12.",
          name: " Jordan Amavi",
          actions: {
            substitution: "",
            card: "",
            goals: [],
          },
        },
        {
          num: "22.",
          name: " Damián Suárez",
          actions: {
            substitution: "in",
            card: "",
            goals: [],
          },
        },
        {
          num: "23.",
          name: " Stefan Mitrovic",
          actions: {
            substitution: "",
            card: "",
            goals: [],
          },
        },
        {
          num: "8.",
          name: " Jaime Seoane",
          actions: {
            substitution: "",
            card: "",
            goals: [],
          },
        },
        {
          num: "16.",
          name: " Ángel Algobia",
          actions: {
            substitution: "in",
            card: "",
            goals: [],
          },
        },
        {
          num: "20.",
          name: " Nemanja Maksimović",
          actions: {
            substitution: "",
            card: "",
            goals: [],
          },
        },
        {
          num: "24.",
          name: " Gonzalo Villar",
          actions: {
            substitution: "in",
            card: "",
            goals: [],
          },
        },
        {
          num: "7.",
          name: " Mata",
          actions: {
            substitution: "",
            card: "",
            goals: [],
          },
        },
        {
          num: "14.",
          name: " Latasa",
          actions: {
            substitution: "",
            card: "",
            goals: [],
          },
        },
        {
          num: "17.",
          name: " Munir",
          actions: {
            substitution: "in",
            card: "YC",
            goals: [],
          },
        },
      ],
    },
  },
];

const equipes = [
  {
    id: "1",
    name: "Real Madrid",
    logo: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
    locality: "Madrid, Espanha",
  },
  {
    id: "2",
    name: "Liverpool",
    logo: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
    locality: "Liverpool, United Kindgon",
  },
  {
    id: "3",
    name: "Manchester United",
    logo: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
    locality: "Manchester, United Kindgon",
  },
  {
    id: "4",
    name: "Manchester City",
    logo: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
    locality: "Manchester, United Kindgon",
  },
  {
    id: "5",
    name: "United Kingdon",
    logo: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
    locality: "Liverpool, United Kindgon",
  },
  {
    id: "6",
    name: "Barcelona",
    logo: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
    locality: "Madrid, Espanha",
  },
  {
    id: "7",
    name: "Real Zaragoza",
    logo: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
    locality: "Madrid, Espanha",
  },
  {
    id: "8",
    name: "Liverton",
    logo: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
    locality: "Liverpool, United Kindgon",
  },
];

const equipe = [
  {
    id: "1",
    name: "Real Madrid",
    img: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
    locality: "Madrid, Espanha",
    stadium: "Santiago Bernabeu",
  },
];

app.get("/equipes", (req, res) => {
  res.json({ equipes });
});

app.get("/equipe", (req, res) => {
  res.json({ equipe });
});

app.get("/campeonatos", (req, res) => {
  res.json({ campeonatos });
});

app.get("/api", (req, res) => {
  res.json({ partidas });
});

app.get("/match", (req, res) => {
  res.json({ match });
});

export default app;
