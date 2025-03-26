const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true
  },
  updatedAt: {
    type: Date,
    default: () => Date.now()
  },
  tasks: [mongoose.SchemaTypes.ObjectId]
})

module.exports = userSchema
