const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost/todo')
    console.log('connnected to db')
  } catch (e) {
    console.log('connection failed: ', e)
  }
}

module.exports = connectDB
