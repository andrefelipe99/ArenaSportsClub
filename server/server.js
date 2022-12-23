const express = require("express");
const app = express();

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
];

app.get("/api", (req, res) => {
  res.json({ partidas });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
