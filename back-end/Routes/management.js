const router = require('express').Router()
const Postgresql = require("../Models/postgreSQL");
const logger = require('../logger')

//Get Top 3 most favorable songs
router.get("/favorable-songs", async (req, res) => {
    try {
        const top3FavoriteSongs = await Postgresql.getTop3FavoriteSongs()
        logger.info("Get Top 3 most favorable songs")

        return res.status(200).json(top3FavoriteSongs);
    } catch (err) {
        logger.error(err)
        return res.status(500).json(err)
    }
})

//Get Top 3 most favorable artists
router.get("/favorable-artists", async (req, res) => {
    try {
        const top3FavoriteArtists = await Postgresql.getTop3Artists()
        logger.info("Get Top 3 most favorable artists")

        return res.status(200).json(top3FavoriteArtists);
    } catch (err) {
        logger.error(err)
        return res.status(500).json(err)
    }
})

//Get Top 3 most favorable songs from each decade
router.get("/favorable-songs-decade", async (req, res) => {
    try {
        const top3SongsDecade = await Postgresql.getTop3SongsDecade()
        logger.info("Get Top 3 most favorable songs from each decade")

        return res.status(200).json(top3SongsDecade);
    } catch (err) {
        logger.error(err)
        return res.status(500).json(err)
    }
})

//Get Top 3 longest and shortest songs in the system
router.get("/longest-shortest-songs", async (req, res) => {
    try {
        const top3LongestAndShortest = await Postgresql.getTop3LongestShortestSongs()
        logger.info("Get Top 3 longest and shortest songs in the system")

        return res.status(200).json(top3LongestAndShortest);
    } catch (err) {
        logger.error(err)
        return res.status(400).json(err)
    }
})

module.exports = router;