const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser')
const cors = require("cors");

const songsRoute = require('./Routes/songs')
const favoriteRoute = require('./Routes/favorite')

const app = express();

//Middleware
app.use(express.json())
app.use(cors());
app.use(bodyParser.json())

//Routes
app.use('/api/songs', songsRoute);
app.use('/api/favorite', favoriteRoute);

//Home page
app.get('/', (req, res) => {
    res.send('Hello From server of OtterBeat')
})

//Connection to server
const port = 3010;
app.listen(port, () => {
    console.log("Server Started with http://localhost:" + port + "/");
})