const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
require('dotenv').config();

const controller = require('./server/controller');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 172800000}
}));

massive(process.env.CONNECTION_STRING)
    .then(db => {
        app.set("db", db);
        console.log(`Connected to database`);
    });

app.post("/api/auth/register", controller.register);

app.post("/api/auth/login", controller.login);

app.post("/api/auth/logout", controller.logout);

app.post("/api/post/", controller.createPost);

app.get("/api/posts/", controller.searchPosts);

app.get("/api/post/:postid", controller.getPost);

app.get("/api/auth/me", controller.currentUser);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Starting server on port ${port}`)
});