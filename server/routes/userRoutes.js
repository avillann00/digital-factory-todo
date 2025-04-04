const express = require('express')
const { registerUser, loginUser, logoutUser } = require('../controllers/userController')
const { authenticateToken } = require('../controllers/jwt')

const router = express.Router()

router.post('/login', loginUser)

router.post('/register', registerUser)

router.post('/logout', authenticateToken, logoutUser)

module.exports = router
