const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const favicon = require('serve-favicon')
const path = require('path')

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  //   windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1, // limit each IP to 100 requests per windowMs
  message: 'Too many accounts created from this IP, please try again after a minute'
})

const app = express()

app.use(bodyParser.json())
// Middlewares headers
// This disables the `referrerPolicy` middleware but keeps the rest.
app.use(
  helmet({
    referrerPolicy: false
  })
)
app.use(cors())
app.use(limiter) //  apply to all requests

// Serve Favicon
app.use(favicon(path.join(__dirname, '/public/images', ('favicon.ico'))))

const postsRoute = require('./routes/posts')
const userRoute = require('./routes/user')
const commentsRoute = require('./routes/comments')
const imageRoute = require('./routes/images')

app.use('/posts', postsRoute)
app.use('/user', userRoute)
app.use('/comments', commentsRoute)
app.use('/images', imageRoute)
// get images
app.use('/uploads', express.static('uploads'))

app.get('/', (req, res) => {
  res.send('hello word')
})

module.exports = app
