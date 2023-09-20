const { Pool } = require("pg");
const redis = require("redis");
const logger = require("../Utils/logs/logger");

// //Connect to local postgreSQL
// const postgresConnect = new Pool({
//     user: process.env.LOCAL_USER,
//     host: process.env.LOCAL_HOST,
//     database: process.env.LOCAL_DB,
//     password: process.env.LOCAL_PASSWORD,
//     port: process.env.LOCAL_PORT,
// });

// //Connect to Docker postgreSQL
// const postgresConnect = new Pool({
//   user: "docker",
//   host: "db",
//   database: "otterbeat",
//   password: "4007",
//   port: 5432,
// });

//Connect to Render postgreSQL
const postgresConnect = new Pool({
  connectionString: process.env.RENDER_URL,
  ssl: {
    rejectUnauthorized: false, // Only set this to false if you're using self-signed SSL certificates
  },
});

// //Connect to Railway postgreSQL
// const postgresConnect = new Pool({
//     user: 'postgres',
//     host: 'containers-us-west-189.railway.app',
//     database: 'railway',
//     password: 'vsBU0tQ72CazVp2D4mQv',
//     port: 5962,
// });

postgresConnect
  .connect()
  .then(() => logger.info("PostgreSQL Connection Established"))
  .catch((err) =>
    logger.error("Error connecting to PostgreSQL database: ", err.stack)
  );

// -----------------------------------------------------

//Connect to local/Docker Redis
const redisConnect = redis.createClient({ url: process.env.REDIS_HOST });

redisConnect.connect();

redisConnect.on("error", function (error) {
  logger.error("Error encountered: ", error);
});

redisConnect.on("connect", async function (error) {
  logger.info("Redis Connection Established");
});

module.exports = { postgresConnect, redisConnect };
