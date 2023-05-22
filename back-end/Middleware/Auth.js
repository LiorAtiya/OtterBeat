const jwt = require("jsonwebtoken")
const logger = require('../logger')

async function authenticateToken(req, res, next) {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(` `)[1]

        if (!token) {
            logger.error("Invalid Token");
            return res.status(401).json(err)
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
            if (err) {
                logger.error(err);
                return res.status(403).json(err)
            }

            logger.info("Token Verefied")
            req.user = data.user;
            next();
        })

    } catch (err) {
        logger.error(err);
        return res.status(500).json(err)
    }
}

module.exports = { authenticateToken };