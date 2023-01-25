import express from "express";
import cors from "cors";
import cine from "./api/cinema.route.js";
import football from "./api/football.route.js";

const app = express();

app.use(cors());
app.use(express.json());

//app.use("/api/v1/cinema", cine);
app.use("/api/v1/football", football);
//app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

//daqui pra baixo API testes
const partidas = [
  {
    equipeCasa: "Real Madrid",
    equipeFora: "Barcelona",
    data: "24/12",
    placarCasa: "2",
    placarFora: "0",
    imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
    imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/19/83.png",
  },
  {
    equipeCasa: "Liverpool",
    equipeFora: "Manchester United",
    data: "25/12",
    placarCasa: "4",
    placarFora: "3",
    imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/8/8.png",
    imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/14/14.png",
  },
  {
    equipeCasa: "Real Madrid",
    equipeFora: "Barcelona",
    data: "24/12",
    placarCasa: "2",
    placarFora: "0",
    imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
    imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/19/83.png",
  },
  {
    equipeCasa: "Liverpool",
    equipeFora: "Manchester United",
    data: "25/12",
    placarCasa: "4",
    placarFora: "3",
    imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/8/8.png",
    imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/14/14.png",
  },
  {
    equipeCasa: "Real Madrid",
    equipeFora: "Barcelona",
    data: "24/12",
    placarCasa: "2",
    placarFora: "0",
    imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
    imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/19/83.png",
  },
  {
    equipeCasa: "Liverpool",
    equipeFora: "Manchester United",
    data: "25/12",
    placarCasa: "4",
    placarFora: "3",
    imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/8/8.png",
    imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/14/14.png",
  },
  {
    equipeCasa: "Real Madrid",
    equipeFora: "Barcelona",
    data: "24/12",
    placarCasa: "2",
    placarFora: "0",
    imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
    imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/19/83.png",
  },
  {
    equipeCasa: "Liverpool",
    equipeFora: "Manchester United",
    data: "25/12",
    placarCasa: "4",
    placarFora: "3",
    imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/8/8.png",
    imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/14/14.png",
  },
];

app.get("/api", (req, res) => {
  res.json({ partidas });
});

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
    nome: "Brasileirão Série Bdadadsadsdasdsadasdsadas",
    temporada: "2023",
    categoria: "futebol",
    campeonatoLogo:
      "https://upload.wikimedia.org/wikipedia/pt/f/f4/Campeonato_Brasileiro_S%C3%A9rie_B_logo.png?20200129194013",
    paisUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/275px-Flag_of_Brazil.svg.png",
  },
];

app.get("/campeonatos", (req, res) => {
  res.json({ campeonatos });
});

const partida = [
  {
    equipeCasa: "Liverpool",
    equipeFora: "Manchester United",
    data: "25/12",
    nomeCampeonato: "Premier League",
    placarCasa: "4",
    placarFora: "3",
    imgUrlCasa: "https://cdn.sportmonks.com/images/soccer/teams/8/8.png",
    imgUrlFora: "https://cdn.sportmonks.com/images/soccer/teams/14/14.png",
    tecnicoCasa: "Cuca",
    tecnicoFora: "Mourinho",
    escalacaoCasa: [
      {
        numero: 22,
        nome: "Josep Martinez (G)",
      },
      {
        numero: 4,
        nome: "Domenico Criscito",
      },
      {
        numero: 5,
        nome: "Radu Drăgușin",
      },
      {
        numero: 13,
        nome: "Mattia Bani (C)",
      },
      {
        numero: 36,
        nome: "Silvan Hefti",
      },
      {
        numero: 8,
        nome: "Kevin Strootman",
      },
      {
        numero: 24,
        nome: "Filip Jagiełło",
      },
      {
        numero: 32,
        nome: "Morten Wetche Frendrup",
      },
      {
        numero: 10,
        nome: "Mattia Aramu",
      },
      {
        numero: 11,
        nome: "Albert Guðmundsson",
      },
      {
        numero: 57,
        nome: "George Pușcaș",
      },
    ],
    escalacaoFora: [
      {
        numero: 99,
        nome: "Joao Cunha (G)",
      },
      {
        numero: 4,
        nome: "Domenico Criscito",
      },
      {
        numero: 5,
        nome: "Radu Drăgușin",
      },
      {
        numero: 13,
        nome: "Mattia Bani (C)",
      },
      {
        numero: 36,
        nome: "Silvan Hefti",
      },
      {
        numero: 8,
        nome: "Kevin Strootman",
      },
      {
        numero: 24,
        nome: "Filip Jagiełło",
      },
      {
        numero: 32,
        nome: "Morten Wetche Frendrup",
      },
      {
        numero: 10,
        nome: "Mattia Aramu",
      },
      {
        numero: 11,
        nome: "Albert Guðmundsson",
      },
      {
        numero: 57,
        nome: "George Pușcaș",
      },
    ],
    escalacaoReservaCasa: [
      {
        numero: 24,
        nome: "BUCETA",
      },
      {
        numero: 26,
        nome: "CU",
      },
      {
        numero: 27,
        nome: "Radu Drăgușin",
      },
      {
        numero: 28,
        nome: "Mattia Bani",
      },
      {
        numero: 29,
        nome: "Silvan Hefti",
      },
      {
        numero: 40,
        nome: "Kevin Strootman",
      },
      {
        numero: 35,
        nome: "Filip Jagiełło",
      },
      {
        numero: 47,
        nome: "Morten Wetche Frendrup",
      },
      {
        numero: 66,
        nome: "Mattia Aramu",
      },
      {
        numero: 89,
        nome: "Albert Guðmundsson",
      },
      {
        numero: 99,
        nome: "George Pușcaș",
      },
    ],
    escalacaoReservaFora: [
      {
        numero: 47,
        nome: "ROLA",
      },
      {
        numero: 21,
        nome: "CUNHÂO",
      },
      {
        numero: 98,
        nome: "Radu Drăgușin",
      },
      {
        numero: 88,
        nome: "Mattia Bani",
      },
      {
        numero: 58,
        nome: "Silvan Hefti",
      },
      {
        numero: 67,
        nome: "Kevin Strootman",
      },
      {
        numero: 56,
        nome: "Filip Jagiełło",
      },
      {
        numero: 47,
        nome: "Morten Wetche Frendrup",
      },
      {
        numero: 23,
        nome: "Albert Guðmundsson",
      },
      {
        numero: 17,
        nome: "George Pușcaș",
      },
    ],
  },
];

app.get("/partida", (req, res) => {
  res.json({ partida });
});

export default app;
