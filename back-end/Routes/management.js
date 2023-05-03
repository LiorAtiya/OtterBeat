const router = require('express').Router()
const database = require('../database.json');

//Get Top 3 most favorable songs
router.get("/favorable-songs", async (req, res) => {
    try {
        res.status(200).json("");
    } catch (err) {
        res.status(500).json(err)
    }
})

//Get Top 3 most favorable artists
router.get("/favorable-artists", async (req, res) => {
    try {
        res.status(200).json("");
    } catch (err) {
        res.status(500).json(err)
    }
})

//Get Top 3 most favorable songs from each decade
router.get("/favorable-songs-decade", async (req, res) => {
    try {
        res.status(200).json("");
    } catch (err) {
        res.status(500).json(err)
    }
})

//Get Top 3 longest and shortest songs in the system
router.get("/longest-shortest-songs", async (req, res) => {
    try {
        let allSongs = []
        //Concat name of artist with name of song & convert duration song to number
        database.map(album => {
            album.songs.forEach((song) => {
                const newObj = { ...song };
                newObj.title = album.artist + ' - ' + song.title 
                newObj.duration = Number(song.duration.replace(/:/g, "."));
                allSongs.push(newObj)
            });
        })
        // database.forEach(artist => allSongs.push(...artist.songs));

        allSongs.sort((a, b) => {
            return a.duration - b.duration;
        });

        const firstThreeSongs = allSongs.slice(0, 3);
        const lastThreeSongs = allSongs.slice(-3);

        const longest_shortest = firstThreeSongs.concat(lastThreeSongs)
        // console.log(allSongs)

        res.status(200).json(longest_shortest);
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router;