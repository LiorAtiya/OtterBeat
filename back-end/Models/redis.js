const { redisConnect } = require('./connections')
const logger = require('../Utils/logs/logger')


const Redis = {
    getFavoriteSongsOfUser: async function (userID) {

        const result = await redisConnect.get(userID + '');
        logger.info('Get favorite songs of user from redis was successful')

        return result;
    },
    setFavoriteSongsOfUser: async function (userID, songs) {

        await redisConnect.set(userID, JSON.stringify(songs));
        logger.info('Set favorite songs of user in redis was successful')

    },
}

module.exports = Redis;