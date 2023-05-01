const router = require('express').Router()
const database = require('../database.json');

let id_list = []

//Get Favorite songs
router.get("/", async (req, res) => {
    try {
        let favoriteSongs = []
        database.forEach(artist => {
            favoriteSongs.push(...artist.songs.filter(song => id_list.includes(song.id)))
        });
        res.status(200).json(favoriteSongs);
    } catch (err) {
        res.status(500).json(err)
    }
})

//Get specific favorite song 
router.get("/specific-song/:id", async (req, res) => {
    try {
        res.status(200).json(id_list.includes(req.params.id));
    } catch (err) {
        res.status(500).json(err)
    }
})

//Add new song to favorite list
router.put("/", async (req, res) => {
    try {
        id_list.push(req.body.id);
        res.status(200).json('Added');
    } catch (err) {
        res.status(500).json(err)
    }
})

//Remove song from favorite list
router.delete("/", async (req, res) => {
    try {
        id_list.pop(req.body.id);
        res.status(200).json('Removed');;
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;