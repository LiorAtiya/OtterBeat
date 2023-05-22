const router = require('express').Router()
const Postgresql = require("../Models/postgreSQL");
const { checkPremium } = require('../Middleware/Premium')
const { authenticateToken } = require('../Middleware/Auth')
const Redis = require('../Models/redis')
const logger = require('../logger')

//Check login
router.use(authenticateToken)

//Get Favorite songs of user
router.get("/all-song", async (req, res) => {
    try {
        const resultRedis = await Redis.getFavoriteSongsOfUser(req.user.id)
        if (resultRedis) {
            logger.info("Get Favorite songs of user (Redis)")
            return res.status(200).json(JSON.parse(resultRedis));
        }

        const favoriteSongs = await Postgresql.getFavoriteSongsOfUser(req.user.id)
        await Redis.setFavoriteSongsOfUser(req.user.id + '', favoriteSongs)

        logger.info("Get Favorite songs of user (PostgreSQL)")
        return res.status(200).json(favoriteSongs);

    } catch (err) {
        logger.error(err);
        return res.sendStatus(500).json(err)
    }
})

//Get specific favorite song 
router.get("/specific-song", async (req, res) => {
    try {
        
        const exist = await Postgresql.checkExistInFavoriteSongs(req.user.id, req.query.songID);

        logger.info("Get specific favorite song")

        return res.status(200).json(exist);
    } catch (err) {
        logger.error(err)
        return res.status(500).json(err)
    }
})

//Add new song to favorite list of user
router.put("/add", checkPremium, async (req, res) => {
    try {
        await Postgresql.AddFavoriteSong(req.user.id, req.body.songID);
        const favoriteSongs = await Postgresql.getFavoriteSongsOfUser(req.user.id)
        await Redis.setFavoriteSongsOfUser(req.user.id + "", favoriteSongs)

        logger.info("Added new song to favorite list of user")

        return res.status(200).json('Add new song to favorite list of user');
    } catch (err) {
        logger.error(err)
        return res.status(500).json(err)
    }
})

//Remove song from favorite list of user
router.delete("/remove", async (req, res) => {
    try {
        await Postgresql.RemoveFavoriteSong(req.user.id, req.body.songID);
        const favoriteSongs = await Postgresql.getFavoriteSongsOfUser(req.user.id)
        await Redis.setFavoriteSongsOfUser(req.user.id + "", favoriteSongs)

        logger.info("Removed song from favorite list of user")

        return res.status(200).json('Removed song from favorite list of user');
    } catch (err) {
        logger.error(err)
        return res.status(500).json(err)
    }
})

module.exports = router;