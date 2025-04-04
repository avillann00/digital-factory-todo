const bcrypt = require('bcryptjs')
const User = require('../models/users')
const { generateToken } = require('../controllers/jwt')

const registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body
    const existing = await User.findOne({ $or: [{email}, {username}] })
    if(existing){
      return res.status(400).json({ message: 'Email or username already exists' })
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      email,
      username, 
      password: hashedPassword
    })

    await user.save()
    
    res.status(201).json({ message: 'User successfully registered', user: user})
  } catch (e) {
    console.log('error registering user: ', e)
  }
}

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username })

    if(!user){
      return res.status(400).json({ message: 'Invalid username or password' })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = generateToken(user)
    res.cookie('token', token, { httpOnly: true, secure: false })

    res.json({ message: 'Login successful', token })
  } catch (e) {
    console.log('error logging in user: ', e)
  }
}

const logoutUser = async (req, res) => {
  res.clearCookie('token', { httpOnly: true, secure: false })
  res.json({ message: 'Logged out successfully' })
}

module.exports = { registerUser, loginUser, logoutUser }
