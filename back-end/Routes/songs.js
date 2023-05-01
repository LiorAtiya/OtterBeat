const router = require('express').Router()
const database = require('../database.json');

//Get all songs
router.get("/", async (req, res) => {
    try {
        res.status(200).json(database);
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;