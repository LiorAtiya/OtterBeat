const router = require('express').Router()
const {register, login, getInfoUser } = require('../Controllers/auth.controller');

const { authenticateToken } = require('../Middleware/Auth')

router.post('/register', register)
router.post('/login', login)
router.get('/info-user', authenticateToken, getInfoUser)

module.exports = router;