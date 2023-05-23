const router = require('express').Router()
const { getAllArtists, getSongsOfArtist } = require('../Controllers/songs.controller')

router.get("/get-artists", getAllArtists)
router.get("/get-songs-of-artist/:id", getSongsOfArtist)

module.exports = router;