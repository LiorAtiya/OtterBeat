const router = require('express').Router()
const Postgresql = require("../Models/postgreSQL");
const logger = require('../logger')

//Get all artists
router.get("/get-artists", async (req, res) => {
    try {
        const result = await Postgresql.getArtists()
        logger.info("Get artists list")

        res.status(200).json(result);
    } catch (err) {
        logger.error(err)
        res.status(500).json(err)
    }
})

//Get songs of specific artist
router.get("/get-songs-of-artist/:id", async (req, res) => {
    try {
        const result = await Postgresql.getSongsOfArtist(req.params.id)
        logger.info("Get songs list of artist")

        res.status(200).json(result);
    } catch (err) {
        logger.error(err)
        res.status(400).json(err)
    }
})

module.exports = router;