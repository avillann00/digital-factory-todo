const express = require('express')
const connectDB = require('./config/db')
require('dotenv').config()
const cors = require('cors')

connectDB()

const app = express()

app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const userRouter = require('./routes/userRoutes')
app.use('/api/users', userRouter)

const taskRouter = require('./routes/taskRoutes')
app.use('/api/tasks', taskRouter)

app.listen(5000, () => { console.log('server started on port 5000') })
