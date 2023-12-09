const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')

const mongoUrl = 'mongodb+srv://root:pw@qc4sgk8.coolify.home.test/bloglist?tls=false&authSource=admin'
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app