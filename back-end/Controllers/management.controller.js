const Postgresql = require("../Models/postgreSQL");
const logger = require('../logger')

const getTop3FavoriteSongs = async (req, res) => {
    try {
        const top3FavoriteSongs = await Postgresql.getTop3FavoriteSongs()
        logger.info("Get Top 3 most favorable songs")

        return res.status(200).json(top3FavoriteSongs);
    } catch (err) {
        logger.error(err.stack)
        return res.status(500)
    }
}

const getTop3FavoriteArtists = async (req, res) => {
    try {
        const top3FavoriteArtists = await Postgresql.getTop3Artists()
        logger.info("Get Top 3 most favorable artists")

        return res.status(200).json(top3FavoriteArtists);
    } catch (err) {
        logger.error(err.stack)
        return res.status(500)
    }
}

const getTop3SongsFromEachDecade = async (req, res) => {
    try {
        const top3SongsDecade = await Postgresql.getTop3SongsDecade()
        logger.info("Get Top 3 most favorable songs from each decade")

        return res.status(200).json(top3SongsDecade);
    } catch (err) {
        logger.error(err.stack)
        return res.status(500)
    }
}

const getTop3LongestAndShortestSongs = async (req, res) => {
    try {
        const top3LongestAndShortest = await Postgresql.getTop3LongestShortestSongs()
        logger.info("Get Top 3 longest and shortest songs in the system")

        return res.status(200).json(top3LongestAndShortest);
    } catch (err) {
        logger.error(err.stack)
        return res.status(500)
    }
}


module.exports = { getTop3FavoriteSongs, getTop3FavoriteArtists, getTop3SongsFromEachDecade, getTop3LongestAndShortestSongs }