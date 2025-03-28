const bcrypt = require('bcryptjs')
const User = require('../models/users')

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

    req.session.user = { id: user._id, username: user.username, email: user.email }
    res.json({ message: 'Login successful', user: req.session.user })
  } catch (e) {
    console.log('error logging in user: ', e)
  }
}

const logoutUser = async (req, res) => {
  req.session.destroy(() => {
    res.json({ message: 'Logged out' })
  })
}

module.exports = { registerUser, loginUser, logoutUser }
