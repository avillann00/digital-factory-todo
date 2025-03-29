const Task = require('../models/tasks')
const User = require('../models/users')

const getTasks = async (req, res) => {
  if(!req.session.user){
    return res.status(401).json({ message: 'Unauthorized' })
  }
  
  // const tasks = await Task.find({ user: req.session.user.id }).populate('user', 'username')
  const tasks = await User.findById(req.session.user.id).populate('tasks')

  res.json(tasks)
}

module.exports = getTasks 
