const Postgresql = require("../Models/postgreSQL");
const logger = require('../Utils/logs/logger')

const getAllArtists = async (req, res) => {
    try {
        const result = await Postgresql.getArtists()
        logger.info("Get artists list")

        return res.status(200).json(result);
    } catch (err) {
        logger.error(err.stack)
        return res.status(500)
    }
}

const getSongsOfArtist = async (req, res) => {
    try {
        const result = await Postgresql.getSongsOfArtist(req.params.id)
        if(result.length === 0) {
            logger.info(`Artist id: ${req.params.id} does not exist`)
            return res.sendStatus(401)
        }

        logger.info(`Get songs list of artist id ${req.params.id}`)

        return res.status(200).json(result);
    } catch (err) {
        logger.error(err.stack)
        return res.status(500)
    }
}

module.exports = { getAllArtists, getSongsOfArtist }