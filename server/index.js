import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import teamsDAO from "./src/dao/teamsDAO.js";
import matchsDAO from "./src/dao/matchsDAO.js";
import championshipsDAO from "./src/dao/championshipsDAO.js";
import newsDAO from "./src/dao/newsDAO.js";

dotenv.config();
const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 5000;

MongoClient.connect(process.env.RESTREVIEWS_DB_URI, {
  wtimeoutMS: 2500,
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await teamsDAO.injectDB(client);
    await matchsDAO.injectDB(client);
    await newsDAO.injectDB(client);
    await championshipsDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
