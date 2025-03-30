const express = require('express')
const { getTasks, addTask, editTask, deleteTask } = require('../controllers/taskController')

const router = express.Router()

router.get('/', getTasks)

router.post('/add', addTask)

router.post('/edit/:id', editTask)

router.delete('/delete/:id', deleteTask)

module.exports = router
