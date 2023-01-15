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
    nome: "Brasileirão Série A",
    temporada: "2023",
    categoria: "futebol",
    campeonatoLogo:
      "https://upload.wikimedia.org/wikipedia/pt/4/42/Campeonato_Brasileiro_S%C3%A9rie_A_logo.png?20160723160542",
    paisUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/275px-Flag_of_Brazil.svg.png",
  },
  {
    nome: "Brasileirão Série B",
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

export default app;
