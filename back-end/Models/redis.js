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
        try {
            // Set the Redis key 'myKey' with the value of the object
            console.log("userID ",userID + '')
            const result = await client.get(userID + '');
            logger.info('Get favorite songs of user from redis was successful')
            
            return result;

        } catch (err) {
            logger.error(err);
            throw err
        }
    },
    setFavoriteSongsOfUser: async function (userID, songs) {
        try {
            // Set the Redis key 'userID' with the value of the object
            await client.set(userID, JSON.stringify(songs));
            logger.info('Set favorite songs of user in redis was successful')

        } catch (err) {
            logger.error(err);
            throw err
        }
    },
}

module.exports = Redis;