const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const postsRoute = require('./routes/posts')
const userRoute = require('./routes/user')
const commentsRoute = require('./routes/comments')
const imageRoute = require('./routes/images')

app.use(bodyParser.json())

app.use('/posts', postsRoute)
app.use('/user', userRoute)
app.use('/comments', commentsRoute)
app.use('/images', imageRoute)
// get images
app.use('/uploads', express.static('uploads'))

// app.get('/', (req, res) => {
//     res.send("hello word");
// });

module.exports = app
