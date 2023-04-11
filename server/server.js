import express from "express";
import cors from "cors";
import football from "./src/api/football.route.js";
import matchsCrawler from "./src/crawler/matchs.js";
import championshipsCrawler from "./src/crawler/championships.js";
import teamsCrawler from "./src/crawler/teams.js";
import newsCrawler from "./src/crawler/news.js";
import matchsController from "./src/api/matchs.controller.js";
import newsController from "./src/api/news.controller.js";
import championshipsController from "./src/api/championships.controller.js";
import teamsController from "./src/api/teams.controller.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/football", football);
//app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

const matchs = await matchsCrawler.getMatchs();
const championships = await championshipsCrawler.getChampionships();
const news = await newsCrawler.getNews();
const teams = await teamsCrawler.getTeams();

setInterval(async () => {
  const post = await matchsController.apiPostMatch();
  const clear = await matchsCrawler.clearMatchs();
  console.log(post);
}, 90000);

setInterval(async () => {
  const championships = await matchsController.apiGetAllChampionships();
  const champs = await championshipsCrawler.getUrls(championships);
  const post = await championshipsController.apiPostChampionships();
  const clear = await championshipsCrawler.clearChampionships();
  console.log(post);
}, 300000);

setInterval(async () => {
  const teams = await matchsController.apiGetAllTeams();
  const urls = await teamsCrawler.getUrls(teams);
  const post = await teamsController.apiPostTeams();
  const clear = await teamsCrawler.clearTeams();
  console.log(post);
}, 300000);

setInterval(async () => {
  const post = await newsController.apiPostNews();
  console.log(post);
}, 600000);

// setTimeout(async () => {
//   const updateYesterday = await matchsController.apiUpdateYesterdayMatchs();
//   console.log(updateYesterday);
// }, 10000);

//API testes
// app.get("/test", (req, res) => {
//   res.json({ championships });
// });

export default app;
