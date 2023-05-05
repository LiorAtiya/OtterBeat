const { Pool } = require('pg');

//Connect to local postgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'otterbeat',
    password: '4007',
    port: 5432,
});

const Postgresql = {
    getArtists: async function () {
        try {
            const res = await pool.query('SELECT * FROM artists');
            return res.rows;
        } catch (err) {
            throw Error;
        }
    },
    getSongsOfArtist: async function (artistID) {
        try {
            const res = await pool.query(`SELECT * FROM songs WHERE artist_id = ${artistID}`);
            return res.rows;
        } catch (err) {
            throw Error;
        }
    },
    AddFavoriteSong: async function (userID, songID) {
        try {
            const res = await pool.query(`INSERT INTO favorite_songs (user_id, song_id) VALUES (${userID}, ${songID})`);
            return res.rows;
        } catch (err) {
            throw Error;
        }
    },
    RemoveFavoriteSong: async function (userID, songID) {
        try {
            const res = await pool.query(`DELETE FROM favorite_songs WHERE user_id = ${userID} AND song_id = ${songID}`);
            return res.rows;
        } catch (err) {
            throw Error;
        }
    },
    getFavoriteSongsOfUser: async function (userID) {
        try {
            const res = await pool.query(`SELECT songs.*
                                            FROM favorite_songs
                                            JOIN songs ON favorite_songs.song_id = songs.id
                                            WHERE favorite_songs.user_id = ${userID}`);
            return res.rows;
        } catch (err) {
            throw Error;
        }
    },
    checkExistInFavoriteSongs: async function (userID, songID) {
        try {
            const res = await pool.query(`SELECT * FROM favorite_songs
                                            WHERE user_id = ${userID} AND song_id = ${songID}`);
                                            
            return res.rows;
        } catch (err) {
            throw Error;
        }
    }
}

module.exports = Postgresql;