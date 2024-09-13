require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const syncAuthorizations = require("./utils/syncAuthorizations.js");

const port = process.env.PORT;
const origin = process.env.ORIGIN;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: origin }));

const db = require("./config/db.js");

db.then(() => {
  const router = require("./routes/Router.js");
  app.use(router);
  app.listen(port, () => {
    console.log(`App rodando na porta: ${port}`);
  });
}).catch((error) => {
  console.log("Erro ao conectar ao banco de dados: ", error);
});
