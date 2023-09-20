const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const Postgresql = require('../Models/postgreSQL');
const logger = require('../Utils/logs/logger')

const register = async (req, res) => {

    try {
        const { name, email, is_premium, password } = req.body;

        //Encrypt password
        const encrypedPassword = await bcrypt.hash(password + '', 10);

        //checks if the user already exist in database
        const user = await Postgresql.existEmail(email)

        if (user) {
            return res.sendStatus(403);
        }
        //create new user
        await Postgresql.register(name, email, encrypedPassword, is_premium);
        logger.info("New User Registered")

        return res.sendStatus(200)

    } catch (error) {
        logger.error(error)
        return res.sendStatus(500)
    }
}

const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        //checks if the user exist in database
        const user = await Postgresql.existEmail(email)

        if (!user) {
            logger.error("Email Not Found")
            return res.sendStatus(403);
        }

        // //Checks if the password match to encrypt password
        if (await bcrypt.compare(password + '', user.password)) {

            const accessToken = jwt.sign({ user: user }, process.env.ACCESS_TOKEN_SECRET);
            logger.info("Login was successful")
            return res.status(200).json({ accessToken: accessToken })
        }

        logger.error("Invalid Password")
        return res.sendStatus(403)

    } catch (err) {
        logger.error(err)
        return res.sendStatus(500)
    }
}

const getInfoUser = async (req, res) => {

    try {
        const { password, ...userDetails } = req.user;
        logger.info(userDetails)
        return res.status(200).json(userDetails)

    } catch (err) {
        logger.error(err)
        return res.sendStatus(500)
    }
}

module.exports = { register, login, getInfoUser }