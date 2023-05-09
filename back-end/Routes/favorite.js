const router = require('express').Router()
const Postgresql = require("../Models/postgreSQL");
const { checkPremium } = require('../Middleware/Premium')
const { authenticateToken } = require('../Middleware/Auth')
const Redis = require('../Models/redis')
const logger = require('../logger')

//Get Favorite songs of user
router.get("/all-song/:id", async (req, res) => {
    try {
        const resultRedis = await Redis.getFavoriteSongsOfUser(req.params.id)
        if (resultRedis) {
            // console.log("\u001b[35m" + "Get Favorite songs of user (Redis)" + "\u001b[0m");
            logger.info("Get Favorite songs of user (Redis)")
            return res.status(200).json(JSON.parse(resultRedis));
        }

        const favoriteSongs = await Postgresql.getFavoriteSongsOfUser(req.params.id)
        await Redis.setFavoriteSongsOfUser(req.params.id, favoriteSongs)
        // console.log("\u001b[35m" + "Get Favorite songs of user (PostgreSQL)" + "\u001b[0m");
        logger.info("Get Favorite songs of user (PostgreSQL)")
        return res.status(200).json(favoriteSongs);

    } catch (err) {
        logger.error(err);
        return res.sendStatus(500)
    }
})

//Get specific favorite song 
router.get("/specific-song", async (req, res) => {
    try {
        const exist = await Postgresql.checkExistInFavoriteSongs(req.query.userID, req.query.songID);
        // console.log("\u001b[35m" + "Get specific favorite song" + "\u001b[0m");
        logger.info("Get specific favorite song")

        res.status(200).json(exist);
    } catch (err) {
        logger.error(err)
        res.status(500).json(err)
    }
})

//Add new song to favorite list of user
router.put("/add", checkPremium, async (req, res) => {
    try {
        await Postgresql.AddFavoriteSong(req.body.userID, req.body.songID);
        const favoriteSongs = await Postgresql.getFavoriteSongsOfUser(req.body.userID)
        await Redis.setFavoriteSongsOfUser(req.body.userID + "", favoriteSongs)

        // console.log("\u001b[35m" + "Added new song to favorite list of user" + "\u001b[0m");
        logger.info("Added new song to favorite list of user")

        res.status(200).json('Add new song to favorite list of user');
    } catch (err) {
        logger.error(err)
        res.status(500).json(err)
    }
})

//Remove song from favorite list of user
router.delete("/remove", async (req, res) => {
    try {
        await Postgresql.RemoveFavoriteSong(req.body.userID, req.body.songID);
        const favoriteSongs = await Postgresql.getFavoriteSongsOfUser(req.body.userID)
        await Redis.setFavoriteSongsOfUser(req.body.userID + "", favoriteSongs)

        // console.log("\u001b[35m" + "Removed song from favorite list of user" + "\u001b[0m");
        logger.info("Removed song from favorite list of user")

        res.status(200).json('Removed song from favorite list of user');
    } catch (err) {
        logger.error(err)
        res.status(500).json(err)
    }
})

module.exports = router;