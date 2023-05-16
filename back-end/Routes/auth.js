const router = require('express').Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const Postgresql = require('../Models/postgreSQL');

const { authenticateToken } = require('../Middleware/Auth')

//Register new user
router.post('/register', async (req, res) => {

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

        res.status(200).json('New User Registered')
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

//Login user
router.post('/login', async (req, res) => {

    try {

        const { email, password } = req.body;

        console.log(password)
        
        //checks if the user exist in database
        const user = await Postgresql.existEmail(email)
        console.log(user)
        if (!user) {
            return res.status(200).json("Email Not Found");
        }

        // //Checks if the password match to encrypt password
        // if (password + '' === user.password) {
        if (await bcrypt.compare(password + '', user.password)) {

            const accessToken = jwt.sign({ user: user }, process.env.ACCESS_TOKEN_SECRET);
            return res.status(200).json({ accessToken: accessToken })
        }

        return res.status(200).json("Invalid Password")

    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
})

//Login user
router.get('/info-user', authenticateToken, async (req, res) => {

    try {
        const { password, ...userDetails } = req.user.user;
        console.log(userDetails)
        return res.status(200).json(userDetails)

    } catch (err) {
        return res.status(500).send(err)
    }
})

module.exports = router;