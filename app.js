const express = require('express');

const app = express();

const postsRoute = require('./routes/posts');
app.use("/posts", postsRoute);

// app.get('/', (req, res) => {
//     res.send("hello word");
// });

module.exports = app