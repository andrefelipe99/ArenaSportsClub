import express from "express";
import cors from "cors";
import cine from "./api/cinema.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/cinema", cine);
//app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

//daqui pra baixo API testes
const partidas = [
  {
    equipeCasa: "Real Madrid",
    equipeFora: "Barcelona",
    data: "24/12",
    placarCasa: "2",
    placarFora: "0",
    imgUrlCasa:
      "https://logodownload.org/wp-content/uploads/2016/03/Real-Madrid-logo-1.png",
    imgUrlFora:
      "https://logodownload.org/wp-content/uploads/2015/05/Barcelona-logo-escudo.png",
  },
  {
    equipeCasa: "Liverpool",
    equipeFora: "Manchester United",
    data: "25/12",
    placarCasa: "4",
    placarFora: "3",
    imgUrlCasa:
      "https://seeklogo.com/images/L/liverpool-fc-logo-3B886CFE17-seeklogo.com.png",
    imgUrlFora:
      "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png",
  },
  {
    equipeCasa: "Liverpool",
    equipeFora: "Manchester United",
    data: "25/12",
    placarCasa: "4",
    placarFora: "3",
    imgUrlCasa:
      "https://seeklogo.com/images/L/liverpool-fc-logo-3B886CFE17-seeklogo.com.png",
    imgUrlFora:
      "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png",
  },
  {
    equipeCasa: "Liverpool",
    equipeFora: "Manchester United",
    data: "25/12",
    placarCasa: "4",
    placarFora: "3",
    imgUrlCasa:
      "https://seeklogo.com/images/L/liverpool-fc-logo-3B886CFE17-seeklogo.com.png",
    imgUrlFora:
      "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png",
  },
  {
    equipeCasa: "Liverpool",
    equipeFora: "Manchester United",
    data: "25/12",
    placarCasa: "4",
    placarFora: "3",
    imgUrlCasa:
      "https://seeklogo.com/images/L/liverpool-fc-logo-3B886CFE17-seeklogo.com.png",
    imgUrlFora:
      "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png",
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
    formacaoCasa: "4-3-3",
    formacaoFora: "4-3-3",
    escalacaoCasa: [
      {
        numero: 22,
        nome: "Josep Martinez",
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
        nome: "Joao Cunha",
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
  },
];

app.get("/partida", (req, res) => {
  res.json({ partida });
});

export default app;
