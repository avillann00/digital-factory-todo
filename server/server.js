const express = require('express')
const connectDB = require('./config/db')
const session = require('express-session')
const MongoStore = require('connect-mongo')
require('dotenv').config()
const cors = require('cors')

connectDB()

const app = express()

app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI
    }),
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24
    }
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const userRouter = require('./routes/userRoutes')
app.use('/api/users', userRouter)

const taskRouter = require('./routes/taskRoutes')
app.use('/api/tasks', taskRouter)

app.listen(5000, () => { console.log('server started on port 5000') })
