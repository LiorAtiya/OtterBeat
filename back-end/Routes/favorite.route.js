const router = require('express').Router()
const { checkPremium } = require('../Middleware/Premium')
const { authenticateToken } = require('../Middleware/Auth')
const { getFavoriteSongsOfUser, getSpecificSongFromFavoriteList, addNewSong, removeSong } = require('../Controllers/favorite.controller')

//Check token
router.use(authenticateToken)

router.get("/all-song", getFavoriteSongsOfUser)
router.get("/specific-song", getSpecificSongFromFavoriteList)
router.put("/add", checkPremium, addNewSong)
router.delete("/remove", removeSong)

module.exports = router;