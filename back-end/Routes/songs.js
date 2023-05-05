const router = require('express').Router()
const Postgresql = require("../Models/postgreSQL");

//Get all artists
router.get("/get-artists", async (req, res) => {
    try {
        const result = await Postgresql.getArtists()
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json(err)
    }
})

//Get songs of specific artist
router.get("/get-songs-of-artist/:id", async (req, res) => {
    try {
        const result = await Postgresql.getSongsOfArtist(req.params.id)
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router;