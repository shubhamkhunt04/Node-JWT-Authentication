require("dotenv").config(); // Sets up dotenv as soon as our application starts

const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const router = express.Router();

const environment = process.env.NODE_ENV; // development
const stage = require("./config")[environment];

const connUri = process.env.MONGO_LOCAL_CONN_URL;
const connect = mongoose.connect(connUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connect.then(
  (db) => {
    console.log("Connected correctly to server");
  },
  (err) => {
    console.log(err);
  }
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

if (environment !== "production") {
  app.use(logger("dev"));
}

const routes = require("./routes/index.js");

app.use("/api/v1", routes(router));

app.use("/api/v1", (req, res, next) => {
  res.send("Hello");
  next();
});

app.listen(`${stage.port}`, () => {
  console.log(`Server now listening at localhost:${stage.port}`);
});

module.exports = app;
