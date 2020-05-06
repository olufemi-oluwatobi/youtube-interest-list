require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./src/api/routes.v1");

const port = 8000;
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.static("public"));
app.set("json spaces", 4);
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
routes(app);

app.listen(port, () => console.log(`app is running on port ${port} `));
