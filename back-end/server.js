const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const cors = require("cors");

const songsRoute = require('./Routes/songs')
const favoriteRoute = require('./Routes/favorite')
const managementRoute = require('./Routes/management')
const authRoute = require('./Routes/auth')

const app = express();

//Middleware
app.use(express.json())
app.use(cors());

//Routes
app.use('/api/songs', songsRoute);
app.use('/api/favorite', favoriteRoute);
app.use('/api/management', managementRoute);
app.use('/api/auth', authRoute);

//Home page
app.get('/', (req, res) => {
    res.status(200).send('Hello From server of OtterBeat')
})

//Connection to server
const port = 3010;
app.listen(port, () => {
    console.log("Server Started with http://localhost:" + port + "/");
})

module.exports = app;