const redis = require('redis');
const logger = require('../logger')

//Connect to local/Docker Redis
const client = redis.createClient({ url: process.env.REDIS_HOST });

client.connect()

client.on('error', function (error) {
    logger.error('Error encountered: ', error)
});

client.on('connect', async function (error) {
    logger.info('Redis Connection Established')
})

const Redis = {
    getFavoriteSongsOfUser: async function (userID) {

        const result = await client.get(userID + '');
        logger.info('Get favorite songs of user from redis was successful')

        return result;
    },
    setFavoriteSongsOfUser: async function (userID, songs) {

        await client.set(userID, JSON.stringify(songs));
        logger.info('Set favorite songs of user in redis was successful')

    },
}

module.exports = Redis;