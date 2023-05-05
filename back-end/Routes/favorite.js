const router = require('express').Router()
const Postgresql = require("../Models/postgreSQL");
// const database = require('../database.json');
// let id_list = []

//Get Favorite songs of user
router.get("/all-song/:id", async (req, res) => {
    try {
        const favoriteSongs = await Postgresql.getFavoriteSongsOfUser(req.params.id)
        console.log("\u001b[35m" + "Get Favorite songs of user" + "\u001b[0m");
        res.status(200).json(favoriteSongs);
    } catch (err) {
        res.status(500).json(err)
    }
})

//Get specific favorite song 
router.get("/specific-song", async (req, res) => {
    try {
        const exist = await Postgresql.checkExistInFavoriteSongs(req.query.userID, req.query.songID);
        console.log("\u001b[35m" + "Get specific favorite song" + "\u001b[0m");
        res.status(200).json(exist);
    } catch (err) {
        res.status(400).json(err)
    }
})

//Add new song to favorite list of user
router.put("/add", async (req, res) => {
    try {
        const result = await Postgresql.AddFavoriteSong(req.body.userID, req.body.songID);
        console.log("\u001b[35m" + "Add new song to favorite list of user" + "\u001b[0m");
        res.status(200).json('Add new song to favorite list of user');
    } catch (err) {
        res.status(500).json(err)
    }
})

//Remove song from favorite list of user
router.delete("/remove", async (req, res) => {
    try {
        const result = await Postgresql.RemoveFavoriteSong(req.body.userID, req.body.songID)
        console.log("\u001b[35m" + "Removed song from favorite list of user" + "\u001b[0m");
        res.status(200).json('Removed song from favorite list of user');
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;