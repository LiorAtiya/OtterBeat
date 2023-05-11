const { Pool } = require('pg');

//Connect to local postgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'otterbeat',
    password: '4007',
    port: 5432,
});

// //Connect to Docker postgreSQL
// const pool = new Pool({
//     user: 'docker',
//     host: 'db',
//     database: 'otterbeat',
//     password: '4007',
//     port: 4321,
// });

pool.connect()
    .then(() => console.log('PostgreSQL Connection Established'))
    .catch(err => console.error('Error connecting to PostgreSQL database: ', err.stack))


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
    },
    checkIsPremiumOfUser: async function (userID) {
        try {
            const res = await pool.query(`SELECT is_premium FROM users
                                            WHERE id = ${userID} AND is_premium = true`);

            return res.rows;
        } catch (err) {
            throw Error;
        }
    },
    getTop3FavoriteSongs: async function () {
        try {
            const res = await pool.query(`SELECT songs.*, COUNT(*) AS count
                                            FROM favorite_songs
                                            JOIN songs ON favorite_songs.song_id = songs.id
                                            GROUP BY favorite_songs.song_id, songs.id
                                            ORDER BY count DESC
                                            LIMIT 3;`);

            return res.rows;
        } catch (err) {
            throw Error;
        }
    },
    getTop3Artists: async function () {
        try {
            const res = await pool.query(``);
            return res.rows;
        } catch (err) {
            throw Error;
        }
    },
    getTop3SongsDecade: async function () {
        try {
            const res = await pool.query(``);
            return res.rows;
        } catch (err) {
            throw Error;
        }
    },
    getTop3LongestShortestSongs: async function () {
        try {
            const res = await pool.query(``);

            return res.rows;
        } catch (err) {
            throw Error;
        }
    },
    existEmail: async function (email) {
        try {
            const res = await pool.query(`SELECT * FROM users WHERE email = '${email}'`);

            return res.rows[0];
        } catch (err) {
            console.log(err)
            // throw Error;
        }
    },
    register: async function (name, email, encrypedPassword, is_premium) {
        try {
            const lastID = await pool.query(`SELECT * FROM users ORDER BY id DESC LIMIT 1`);
        
            const res = await pool.query(`INSERT INTO users (id, name, email, password, is_premium) 
                                        VALUES (${lastID.rows[0].id + 1}, '${name}','${email}', '${encrypedPassword}', ${is_premium})`);

            return res.rows[0];
        } catch (err) {
            console.log(err)
        }
    },
}

module.exports = Postgresql;