const redis = require('redis');

//Connect to local Redis
const client = redis.createClient();

// //Connect to Docker Redis
// const client = redis.createClient({
//     host: 'redis',
//     port: 6379,
// });

client.connect()

client.on('error', function (error) {
    console.error('Error encountered: ', error);
});

client.on('connect', async function (error) {
    console.log('Redis Connection Established');
})

const Redis = {
    getFavoriteSongsOfUser: async function (userID) {
        try {
            // Set the Redis key 'myKey' with the value of the object
            const result = await client.get(userID);
            return result;

        } catch (err) {
            console.log(err)
        }
    },
    setFavoriteSongsOfUser: async function (userID, songs) {
        try {
            // Set the Redis key 'userID' with the value of the object
            await client.set(userID, JSON.stringify(songs));
        } catch (err) {
            console.log(err)
        }
    },
}

module.exports = Redis;