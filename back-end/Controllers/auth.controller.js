const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const Postgresql = require('../Models/postgreSQL');
const logger = require('../logger')

const register = async (req, res) => {

    try {
        const { name, email, is_premium, password } = req.body;

        //Encrypt password
        const encrypedPassword = await bcrypt.hash(password + '', 10);

        //checks if the user already exist in database
        const user = await Postgresql.existEmail(email)

        if (user) {
            return res.status(200).json("Exist email");
        }
        //create new user
        await Postgresql.register(name, email, encrypedPassword, is_premium);
        logger.info("New User Registered")

        res.status(200).json('New User Registered')
    } catch (error) {
        logger.error(error)
        res.status(500).send(error)
    }
}

const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        //checks if the user exist in database
        const user = await Postgresql.existEmail(email)

        if (!user) {
            logger.error("Email Not Found")
            return res.status(200).json("Email Not Found");
        }

        // //Checks if the password match to encrypt password
        if (await bcrypt.compare(password + '', user.password)) {

            const accessToken = jwt.sign({ user: user }, process.env.ACCESS_TOKEN_SECRET);
            logger.info("Login was successful")
            return res.status(200).json({ accessToken: accessToken })
        }

        return res.status(200).json("Invalid Password")

    } catch (err) {
        logger.error(err)
        return res.status(500).send(err)
    }
}

const getInfoUser = async (req, res) => {

    try {
        const { password, ...userDetails } = req.user;
        logger.info(userDetails)
        return res.status(200).json(userDetails)

    } catch (err) {
        logger.error(err)
        return res.status(500).send(err)
    }
}

module.exports = { register, login, getInfoUser }