const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const massive = require('massive');
require('dotenv').config();

const controller = require('./server/controller');

const app = express();

app.use(cors());
app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING)
    .then(db => {
        app.set("db", db);
        console.log(`Connected to database`);
    });

app.post("/api/auth/register", controller.register);

app.post("/api/auth/login", controller.login);

app.post("/api/post/:userid", controller.createPost);

app.get("/api/posts/:userid", controller.searchPosts);

app.get("/api/post/:postid", controller.getPost);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Starting server on port ${port}`)
});