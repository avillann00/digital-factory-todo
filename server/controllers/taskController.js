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

const addTask = async (req, res) => {
  if(!req.session.user){
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try{
    const { title, content, completeBy } = req.body
    
    const task = await Task.create({
      title,
      content,
      completeBy,
      user: req.session.user.id
    })

    await User.findByIdAndUpdate(req.session.user.id, {
      $push: { tasks: task._id }
    })

    await task.save()

    res.status(201).json({ message: 'Task successfully created', task: task })
  }
  catch (e) {
    console.log('error creating task: ', e)
  }
}

const editTask = async (req, res) => {
  if(!req.session.user){
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try{
    const { id } = req.params
    const { title, content, completeBy, updatedDate } = req.body

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, user: req.session.user.id },
      { title, content, completeBy, updatedAt: updatedDate },
      { new: true, runValidators: true }
    )

    if(!updatedTask){
      return res.status(404).json({ message: 'Task couldnt be found or updated' })
    }

    res.json({ message: 'Task successfully updated', task: updatedTask })
  }
  catch (e) {
    console.log('error editing task: ', e)
  }
}

const deleteTask = async (req, res) => {
  if(!req.session.user){
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try{
    const { id } = req.params

    const deletedTask = await Task.findOneAndDelete({ _id: id, user: req.session.user.id })

    if(!deletedTask){
      return res.status(404).json({ message: 'Task not found or authorized' })
    }

    await User.updateOne(
      { _id: req.session.user.id },  
      { $pull: { tasks: id } }  
    )

    res.json({ message: 'Task successfully deleted' })
  }
  catch (e) {
    console.log('error deleting task: ', e)
  }
}

module.exports = { getTasks, addTask, editTask, deleteTask }
