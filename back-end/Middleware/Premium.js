const Postgresql = require("../Models/postgreSQL");
const logger = require('../Utils/logs/logger')

async function checkPremium(req, res, next) {
    try {
       
        const isPremium = await Postgresql.checkIsPremiumOfUser(req.user.id)
        const countSongs = await Postgresql.getFavoriteSongsOfUser(req.user.id);

        if (isPremium.length === 0 && countSongs.length > 4) {
            logger.info("Limit to add new song")
            return res.status(200).json('LIMITED');
        }

        next();

    } catch (err) {
        logger.error(err);
        return res.sendStatus(500).json(err)
    }
}

module.exports = { checkPremium };