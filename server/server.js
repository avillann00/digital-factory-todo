const express = require('express')
const connectDB = require('./config/db')

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const userRouter = require('./routes/userRoutes')
app.use('/api/users', userRouter)

app.listen(5000, () => { console.log('server started on port 5000') })
