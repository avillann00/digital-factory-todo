const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  completeBy: {
    type: Date, 
    required: true
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now()
  },
  updatedAt: {
    type: Date,
    default: () => Date.now()
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
})

module.exports = mongoose.model('Task', taskSchema)
