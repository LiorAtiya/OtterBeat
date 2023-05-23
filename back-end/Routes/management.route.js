const router = require('express').Router()
const { getTop3FavoriteSongs, getTop3FavoriteArtists, getTop3SongsFromEachDecade, getTop3LongestAndShortestSongs } = require('../Controllers/management.controller')

//Get Top 3 most favorable songs
router.get("/favorable-songs", getTop3FavoriteSongs)

//Get Top 3 most favorable artists
router.get("/favorable-artists", getTop3FavoriteArtists)

//Get Top 3 most favorable songs from each decade
router.get("/favorable-songs-decade", getTop3SongsFromEachDecade)

//Get Top 3 longest and shortest songs in the system
router.get("/longest-shortest-songs", getTop3LongestAndShortestSongs)

module.exports = router;