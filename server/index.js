import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import cinemaDAO from "./dao/cinemaDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";

dotenv.config();
const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 5000;

MongoClient.connect(process.env.RESTREVIEWS_DB_URI, {
  //poolSize: 50,
  wtimeoutMS: 2500,
  //useNewUrlParse: true,
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await cinemaDAO.injectDB(client);
    await ReviewsDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
