const { Pool } = require('pg');
const logger = require('../logger')

// //Connect to local postgreSQL
// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'otterbeat',
//     password: '4007',
//     port: 5432,
// });

//Connect to Docker postgreSQL
const pool = new Pool({
    user: 'docker',
    host: 'db',
    database: 'otterbeat',
    password: '4007',
    port: 5432,
});

// //Connect to Railway postgreSQL
// const pool = new Pool({
//     user: 'postgres',
//     host: 'containers-us-west-189.railway.app',
//     database: 'railway',
//     password: 'vsBU0tQ72CazVp2D4mQv',
//     port: 5962,
// });

pool.connect()
    .then(() => logger.info('PostgreSQL Connection Established'))
    .catch(err => logger.error('Error connecting to PostgreSQL database: ', err.stack))


const Postgresql = {
    getArtists: async function () {
        try {
            const res = await pool.query('SELECT * FROM artists');

            return res.rows;
        } catch (err) {
            logger.error(err);
        }
    },
    getSongsOfArtist: async function (artistID) {
        try {
            const res = await pool.query(`SELECT * FROM songs WHERE artist_id = ${artistID}`);
            logger.info('Get songs of artist from postgreSQL was successful')

            return res.rows;
        } catch (err) {
            logger.error(err);
        }
    },
    AddFavoriteSong: async function (userID, songID) {
        try {
            const res = await pool.query(`INSERT INTO favorite_songs (user_id, song_id) VALUES (${userID}, ${songID})`);
            logger.info('Added to favorite songs was successful')

            return res.rows;
        } catch (err) {
            logger.error(err);
        }
    },
    RemoveFavoriteSong: async function (userID, songID) {
        try {
            const res = await pool.query(`DELETE FROM favorite_songs WHERE user_id = ${userID} AND song_id = ${songID}`);
            
            return res.rows;
        } catch (err) {
            logger.error(err);
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
            logger.error(err);
        }
    },
    checkExistInFavoriteSongs: async function (userID, songID) {
        try {
            const res = await pool.query(`SELECT * FROM favorite_songs
                                            WHERE user_id = ${userID} AND song_id = ${songID}`);

            return res.rows;
        } catch (err) {
            logger.error(err);
        }
    },
    checkIsPremiumOfUser: async function (userID) {
        try {
            const res = await pool.query(`SELECT is_premium FROM users
                                            WHERE id = ${userID} AND is_premium = true`);

            return res.rows;
        } catch (err) {
            logger.error(err);
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
            logger.error(err);
        }
    },
    getTop3Artists: async function () {
        try {
            const res = await pool.query(`SELECT a.id, a.name, COUNT(*) AS favorite_count
                                            FROM artists a
                                            JOIN songs s ON a.id = s.artist_id
                                            JOIN favorite_songs f ON s.id = f.song_id
                                            GROUP BY a.id, a.name
                                            ORDER BY favorite_count DESC
                                            LIMIT 3;`);
            return res.rows;
        } catch (err) {
            logger.error(err);
        }
    },
    getTop3SongsDecade: async function () {
        try {
            const res = await pool.query(`SELECT 
                                            CAST((release_year / 10) * 10 AS INT) AS decade,
                                            COUNT(*) AS song_count
                                        FROM 
                                            songs
                                        GROUP BY 
                                            CAST((release_year / 10) * 10 AS INT)
                                        ORDER BY 
                                            song_count DESC
                                        LIMIT 3;`);
            return res.rows;
        } catch (err) {
            logger.error(err);
        }
    },
    getTop3LongestShortestSongs: async function () {
        try {
            const shortest = await pool.query(`SELECT * FROM songs ORDER BY duration LIMIT 3;`);
            const longest = await pool.query(`SELECT * FROM songs ORDER BY duration DESC LIMIT 3;`);
            const mergedArray = [...shortest.rows, ...longest.rows.reverse()];
            return mergedArray;
        } catch (err) {
            logger.error(err);
        }
    },
    existEmail: async function (email) {
        try {
            const res = await pool.query(`SELECT * FROM users WHERE email = '${email}'`);

            return res.rows[0];
        } catch (err) {
            logger.error(err);
        }
    },
    register: async function (name, email, encrypedPassword, is_premium) {
        try {
            const lastID = await pool.query(`SELECT * FROM users ORDER BY id DESC LIMIT 1`);
            console.log('lastID ', lastID.rowCount)
            const res = await pool.query(`INSERT INTO users (id, name, email, password, is_premium) 
                                        VALUES (${lastID.rowCount === 0 ? 0 : (lastID.rows[0].id + 1)}, '${name}','${email}', '${encrypedPassword}', ${is_premium})`);

            return res.rows[0];
        } catch (err) {
            logger.error(err);
        }
    },
}

module.exports = Postgresql;