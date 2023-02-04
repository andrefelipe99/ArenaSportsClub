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

const partida = [
  {
    idPartida: "",
    idTitulo: "Argélia x Niger - 31/01/2023 às 13:00",
    campeonato: "Campeonato das Nações Africanas - 2022 Algeria",
    rodada: "Semifinal",
    status: "ENCERRADO",
    tempo: "ENCERRADO",
    horario: "31/01/2023 às 13:00",
    arbitro: "Abongile Tom",
    estadio: "Stade Olympique de Radès (Radès)",
    placarCasa: "5",
    placarFora: "0",
    equipes: {
      casaID: "",
      casaNome: "Argélia",
      casaImg: "https://www.placardefutebol.com.br/images/teams/argelia.png",
      foraID: "",
      foraNome: "Niger",
      foraImg: "https://www.placardefutebol.com.br/images/teams/niger.png",
    },
    eventos: [
      {
        lado: "casa",
        descricao: "Ayoub Abdellaoui",
        tempo: "15'",
        tipo: "GOL",
      },
      {
        lado: "casa",
        descricao: "Aymen Mahious",
        tempo: "23'",
        tipo: "GOL",
      },
      {
        lado: "casa",
        descricao: "Aymen Mahious",
        tempo: "34'",
        tipo: "GOL",
      },
      {
        lado: "fora",
        descricao: "Ismael Souley",
        tempo: "37'",
        tipo: "CA",
      },
      {
        lado: "casa",
        descricao: "Boureima Katakore Amadou (contra)",
        tempo: "45'",
        tipo: "GC",
      },
      {
        lado: "casa",
        descricao: "S. Bayazid",
        tempo: "83'",
        tipo: "GOL",
      },
    ],
    estatisticas: [
      {
        tipo: "Posse de bola (%)",
        casa: "64",
        fora: "36",
      },
      {
        tipo: "Total de chutes",
        casa: "16",
        fora: "7",
      },
      {
        tipo: "Chutes no gol",
        casa: "7",
        fora: "0",
      },
      {
        tipo: "Escanteios",
        casa: "17",
        fora: "3",
      },
    ],
    escalacoes: {
      casaTitular: [
        {
          num: "1.",
          nome: " Farid Chaâl",
          acoes: {
            substituicao: "",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "2.",
          nome: " Chouaib Keddad",
          acoes: {
            substituicao: "",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "5.",
          nome: " Ayoub Abdellaoui",
          acoes: {
            substituicao: "",
            cartao: "",
            gols: ["GOL"],
          },
        },
        {
          num: "15.",
          nome: " Zineddine Belaïd",
          acoes: {
            substituicao: "out",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "21.",
          nome: " Laoufi",
          acoes: {
            substituicao: "out",
            cartao: "CAV",
            gols: [],
          },
        },
        {
          num: "22.",
          nome: " Mokhtar Belkhiter",
          acoes: {
            substituicao: "",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "6.",
          nome: " Ahmed Kendouci",
          acoes: {
            substituicao: "out",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "8.",
          nome: " Zakaria Draoui",
          acoes: {
            substituicao: "",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "14.",
          nome: " H. Mrezigue",
          acoes: {
            substituicao: "",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "7.",
          nome: " Abderrahmane Meziane Bentahar",
          acoes: {
            substituicao: "out",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "18.",
          nome: " Aymen Mahious",
          acoes: {
            substituicao: "out",
            cartao: "CA",
            gols: ["GOL", "GOL"],
          },
        },
      ],
      foraTitular: [
        {
          num: "22.",
          nome: " M. Djibo",
          acoes: {
            substituicao: "",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "2.",
          nome: " A. Djibo",
          acoes: {
            substituicao: "",
            cartao: "CV",
            gols: [],
          },
        },
        {
          num: "3.",
          nome: " Ismael Souley",
          acoes: {
            substituicao: "",
            cartao: "CA",
            gols: [],
          },
        },
        {
          num: "5.",
          nome: " Abdoul Adamou Garba",
          acoes: {
            substituicao: "out",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "15.",
          nome: " Boureima Katakore Amadou",
          acoes: {
            substituicao: "out",
            cartao: "CA",
            gols: ["GC"],
          },
        },
        {
          num: "11.",
          nome: " Boubacar Hainikoye",
          acoes: {
            substituicao: "",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "23.",
          nome: " Abdoul Aboubacar Arzakou",
          acoes: {
            substituicao: "",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "9.",
          nome: " Abdoul Ibrahim",
          acoes: {
            substituicao: "out",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "14.",
          nome: " Imarana Seyni",
          acoes: {
            substituicao: "",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "18.",
          nome: " Bilyamine Moussa Sani",
          acoes: {
            substituicao: "out",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "20.",
          nome: " Faysal Iboun Abdoulaye",
          acoes: {
            substituicao: "out",
            cartao: "",
            gols: [],
          },
        },
      ],
      casaReserva: [
        {
          num: "23.",
          nome: " Chamseddine Rahmani",
          acoes: {
            substituicao: "",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "3.",
          nome: " H. Dehiri",
          acoes: {
            substituicao: "",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "19.",
          nome: " A. Ghezala",
          acoes: {
            substituicao: "in",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "24.",
          nome: " Saadi Radouani",
          acoes: {
            substituicao: "",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "28.",
          nome: " Houari Baouche",
          acoes: {
            substituicao: "in",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "4.",
          nome: " Akram Djahnit",
          acoes: {
            substituicao: "",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "11.",
          nome: " Oussama Chita",
          acoes: {
            substituicao: "",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "27.",
          nome: " M. Ait El Hadj",
          acoes: {
            substituicao: "in",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "9.",
          nome: " Karim Aribi",
          acoes: {
            substituicao: "",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "10.",
          nome: " Feth-Allah Tahar",
          acoes: {
            substituicao: "in",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "12.",
          nome: " Mohamed Bakir",
          acoes: {
            substituicao: "",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "20.",
          nome: " S. Bayazid",
          acoes: {
            substituicao: "in",
            cartao: "",
            gols: ["GOL"],
          },
        },
      ],
      foraReserva: [
        {
          num: "1.",
          nome: " Yahaya Babari",
          acoes: {
            substituicao: "",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "6.",
          nome: " Abdoul Kader Rafiu Kassali",
          acoes: {
            substituicao: "in",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "17.",
          nome: " M. Karimou",
          acoes: {
            substituicao: "in",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "25.",
          nome: " L. Salaou",
          acoes: {
            substituicao: "",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "26.",
          nome: " Alhabib Hassane Abdou",
          acoes: {
            substituicao: "",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "7.",
          nome: " Yacine Wa Massamba N Laba",
          acoes: {
            substituicao: "in",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "8.",
          nome: " M. Moudou",
          acoes: {
            substituicao: "in",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "12.",
          nome: " Ousseini Badamassi",
          acoes: {
            substituicao: "in",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "13.",
          nome: " M. Ibrahim",
          acoes: {
            substituicao: "",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "10.",
          nome: " Mossi Moussa",
          acoes: {
            substituicao: "",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "21.",
          nome: " A. Inkad",
          acoes: {
            substituicao: "",
            cartao: "",
            gols: [],
          },
        },
        {
          num: "24.",
          nome: " Marouf Maazou Salissou",
          acoes: {
            substituicao: "",
            cartao: "",
            gols: [],
          },
        },
      ],
    },
  },
];

app.get("/campeonatos", (req, res) => {
  res.json({ campeonatos });
});

app.get("/api", (req, res) => {
  res.json({ partidas });
});

app.get("/partida", (req, res) => {
  res.json({ partida });
});

export default app;
