import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import teamsDAO from "./dao/teamsDAO.js";
import matchsDAO from "./dao/matchsDAO.js";

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
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
