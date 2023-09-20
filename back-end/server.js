const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const createTables = require("./Models/createTables");

const songsRoute = require("./Routes/songs.route");
const favoriteRoute = require("./Routes/favorite.route");
const managementRoute = require("./Routes/management.route");
const authRoute = require("./Routes/auth.route");

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/songs", songsRoute);
app.use("/api/favorite", favoriteRoute);
app.use("/api/management", managementRoute);
app.use("/api/auth", authRoute);

app.get("/create", (req, res) => {
  createTables();
  return res.status(200).send("Tables created");
});

//Connection to server
const port = process.env.PORT || 5015;
app.listen(port, () => {
  console.log("Server Started with http://localhost:" + port + "/");
});

module.exports = app;
