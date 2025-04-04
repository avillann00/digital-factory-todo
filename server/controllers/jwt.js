const jwt = require('jsonwebtoken')
require('dotenv').config()

const generateToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' })
}

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
  if(!token){
    return res.status(403).json({ message: 'Unauthorized' })
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' })
    req.user = user
    next()
  })
}

module.exports = { generateToken, authenticateToken }

