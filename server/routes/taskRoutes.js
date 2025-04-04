const express = require('express')
const { getTasks, addTask, editTask, deleteTask } = require('../controllers/taskController')
const { authenticateToken } = require('../controllers/jwt')

const router = express.Router()

router.get('/', authenticateToken, getTasks)

router.post('/add', authenticateToken, addTask)

router.post('/edit/:id', authenticateToken, editTask)

router.delete('/delete/:id', authenticateToken, deleteTask)

module.exports = router
