const { postgresConnect } = require('./connections')
const logger = require('../Utils/logs/logger')

const Postgresql = {
    getArtists: async function () {
        const res = await postgresConnect.query('SELECT * FROM artists');
        return res.rows;
    },
    getSongsOfArtist: async function (artistId) {

        const res = await postgresConnect.query(`SELECT s.*, a.name AS artist_name
                                        FROM songs s
                                        JOIN artists a ON s.artist_id = a.id
                                        WHERE s.artist_id = $1;`, [artistId]);

        logger.info('Get songs of artist from postgreSQL was successful')

        return res.rows;

    },
    AddFavoriteSong: async function (userID, songID) {

        const res = await postgresConnect.query(`INSERT INTO favorite_songs (user_id, song_id) VALUES ($1, $2)`, [userID, songID]);
        logger.info('Added to favorite songs was successful')

        return res.rows;

    },
    RemoveFavoriteSong: async function (userID, songID) {

        const res = await postgresConnect.query(`DELETE FROM favorite_songs WHERE user_id = $1 AND song_id = $2`, [userID, songID]);
        return res.rows;

    },
    getFavoriteSongsOfUser: async function (userID) {

        const res = await postgresConnect.query(`SELECT fs.user_id, s.*, a.name AS artist_name
                                            FROM favorite_songs fs
                                            JOIN songs s ON fs.song_id = s.id
                                            JOIN artists a ON s.artist_id = a.id
                                            WHERE fs.user_id = $1;`, [userID]);
        return res.rows;

    },
    checkExistInFavoriteSongs: async function (userID, songID) {

        const res = await postgresConnect.query(`SELECT * FROM favorite_songs
                                            WHERE user_id = $1 AND song_id = $2`, [userID, songID]);

        return res.rows;
    },
    checkIsPremiumOfUser: async function (userID) {

        const res = await postgresConnect.query(`SELECT is_premium FROM users
                                            WHERE id = $1 AND is_premium = true`, [userID]);
        return res.rows;

    },
    getTop3FavoriteSongs: async function () {

        const res = await postgresConnect.query(`SELECT s.title AS song_title, a.name AS artist_name, COUNT(*) AS song_count
                                        FROM favorite_songs fs
                                        JOIN songs s ON fs.song_id = s.id
                                        JOIN artists a ON s.artist_id = a.id
                                        GROUP BY fs.song_id, s.title, a.name
                                        ORDER BY song_count DESC
                                        LIMIT 3;`);

        return res.rows;

    },
    getTop3Artists: async function () {

        const res = await postgresConnect.query(`SELECT a.id, a.name, COUNT(*) AS favorite_count
                                            FROM artists a
                                            JOIN songs s ON a.id = s.artist_id
                                            JOIN favorite_songs f ON s.id = f.song_id
                                            GROUP BY a.id, a.name
                                            ORDER BY favorite_count DESC
                                            LIMIT 3;`);
        return res.rows;

    },
    getTop3SongsDecade: async function () {

        const res = await postgresConnect.query(`SELECT 
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

    },
    getTop3LongestShortestSongs: async function () {

        const shortest = await postgresConnect.query(`SELECT * FROM songs ORDER BY duration LIMIT 3;`);
        const longest = await postgresConnect.query(`SELECT * FROM songs ORDER BY duration DESC LIMIT 3;`);
        const mergedArray = [...shortest.rows, ...longest.rows.reverse()];
        return mergedArray;

    },
    existEmail: async function (email) {

        const res = await postgresConnect.query(`SELECT * FROM users WHERE email = $1`, [email]);

        return res.rows[0];

    },
    register: async function (name, email, encrypedPassword, is_premium) {

        const lastID = await postgresConnect.query(`SELECT * FROM users ORDER BY id DESC LIMIT 1`);
        const res = await postgresConnect.query(`INSERT INTO users (id, name, email, password, is_premium) 
                                        VALUES (${lastID.rowCount === 0 ? 0 : (lastID.rows[0].id + 1)}, $1, $2, $3, $4)
                                        RETURNING *;`
            , [name, email, encrypedPassword, is_premium]);

        return res.rows[0];

    },
}

module.exports = Postgresql;