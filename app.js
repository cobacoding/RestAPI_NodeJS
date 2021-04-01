const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const postsRoute = require('./routes/posts');

app.use(bodyParser.json());

app.use("/posts", postsRoute);

app.get('/', (req, res) => {
    res.send("hello word");
});

module.exports = app